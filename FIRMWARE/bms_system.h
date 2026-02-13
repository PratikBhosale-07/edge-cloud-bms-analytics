#ifndef BMS_SYSTEM_H
#define BMS_SYSTEM_H

#include <stdint.h>

// Global System Data Structure
typedef struct {
    // Raw Telemetry (from can-decode.c)
    uint16_t v_cell[16];
    uint16_t pack_voltage;
    int16_t  pack_current;
    int16_t  temp_avg;
    
    // Edge Features (from feature-extraction.c)
    uint16_t v_spread_mv;
    float    r_internal_mohm;
    float    thermal_gradient;
    
    // Health Status (Final Output)
    uint8_t  health_index;
    uint8_t  stress_score;
} BMS_System_t;

extern BMS_System_t ev_stats; // Shared global variable

#endif
