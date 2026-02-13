#include "thejas32_hal.h"
#include "bms_system.h"

BMS_System_t ev_stats; // Define the shared memory

int main() {
    system_init(); // Initialize THEJAS32 100MHz Clock
    can_init_passive(); // From your can-decode.c

    while(1) {
        // Step 1: Get Raw Data (CAN Decoder)
        update_can_data(); 

        // Step 2: Process Data (Edge AI)
        run_edge_analytics(); 

        // Step 3: Send Data (Cloud Telemetry)
        publish_telemetry(); 

        // Maintain the 500ms deterministic loop
        delay_ms(500); 
    }
}
