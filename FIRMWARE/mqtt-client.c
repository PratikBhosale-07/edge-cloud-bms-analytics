#include "bms_system.h"
#include <stdio.h>

void publish_telemetry() {
    // Format as the sample-session.json structure
    printf("{\"v_pack\":%u, \"spread\":%u, \"health\":%u, \"stress\":%u}\n", 
            ev_stats.pack_voltage, 
            ev_stats.v_spread_mv, 
            ev_stats.health_index, 
            ev_stats.stress_score);
    // In real hardware, this would be sent via the ESP32/Wi-Fi UART
}
