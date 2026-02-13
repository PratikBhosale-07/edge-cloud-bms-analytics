#include <stdio.h>
#include "thejas32_hal.h" // HAL for THEJAS32 RISC-V Peripherals
#include "mcp2515_defs.h" // Register definitions for MCP2515

// Configuration Constants
#define CAN_BAUD_250K 0x03    // 250kbps @ 16MHz Crystal
#define SAMPLING_INTERVAL 500 // 500ms deterministic polling

// Global struct to store processed telemetry
typedef struct {
    uint16_t v_cell[16];
    int16_t  pack_current;
    uint16_t pack_voltage;
    int16_t  temp_avg;
} BMS_Data_t;

BMS_Data_t live_data;

/**
 * @brief Initialize MCP2515 in Listen-Only Mode for Passive Observation
 */
void can_init_passive() {
    spi_init(SPI_CHANNEL_2, 10000000); // 10MHz SPI Clock
    
    mcp2515_reset();
    
    // Set Baud Rate to 250kbps
    mcp2515_write_reg(CNF1, CAN_BAUD_250K);
    mcp2515_write_reg(CNF2, 0xB1);
    mcp2515_write_reg(CNF3, 0x02);
    
    // Set Listen-Only Mode to ensure no interference with Scooter Rig
    mcp2515_write_reg(CANCTRL, 0x14); 
    
    printf("THEJAS32: CAN Observer Initialized (250kbps)\n");
}

/**
 * @brief Decode specific Daly BMS Frames
 * ID 0x91: Max/Min Cell Voltages & SoC
 */
void decode_daly_frame(uint32_t id, uint8_t *data) {
    switch(id) {
        case 0x91:
            live_data.pack_voltage = (data[0] << 8 | data[1]) / 10;
            printf("Pack Voltage: %u V\n", live_data.pack_voltage);
            break;
            
        case 0x92: // Temperature Data
            live_data.temp_avg = data[0] - 40; // Offset as per Daly Protocol
            printf("Temp: %d C\n", live_data.temp_avg);
            break;
            
        case 0x94: // Status & Cycle Count
            uint16_t cycles = (data[0] << 8 | data[1]);
            printf("Cycles: %u\n", cycles);
            break;
            
        default:
            // Handle cell voltage frames (0x95, 0x96 etc. for 16S)
            break;
    }
}

int main() {
    hal_init(); // Initialize THEJAS32 System
    can_init_passive();
    
    uint32_t can_id;
    uint8_t can_data[8];
    uint8_t len;

    while(1) {
        // Deterministic Polling Loop
        if (mcp2515_read_rx_status() & 0xC0) { // Check if Rx buffer has data
            mcp2515_read_can_msg(&can_id, &len, can_data);
            decode_daly_frame(can_id, can_data);
        }
        
        delay_ms(SAMPLING_INTERVAL); // Maintain 500ms sync
    }
    
    return 0;
}
