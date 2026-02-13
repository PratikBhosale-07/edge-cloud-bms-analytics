#include "bms_system.h"

void run_edge_analytics() {
    // 1. Calculate Voltage Spread (Vmax - Vmin)
    uint16_t v_max = 0, v_min = 5000;
    for(int i=0; i<16; i++) {
        if(ev_stats.v_cell[i] > v_max) v_max = ev_stats.v_cell[i];
        if(ev_stats.v_cell[i] < v_min) v_min = ev_stats.v_cell[i];
    }
    ev_stats.v_spread_mv = v_max - v_min;

    // 2. Estimate Stress Score
    // Simple heuristic: High current + High Temp = High Stress
    ev_stats.stress_score = (abs(ev_stats.pack_current) / 10) + (ev_stats.temp_avg);
    
    // 3. Health Index Logic
    if(ev_stats.v_spread_mv > 100) ev_stats.health_index = 70; // Degradation warning
    else ev_stats.health_index = 95; // Healthy
}
