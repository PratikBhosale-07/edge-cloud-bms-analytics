# Indigenous Edge-First RUL Estimation for 16S Li-ion Packs
**Powering the Future of E-Mobility with Indigenous RISC-V Compute**

## 🚀 Project Overview
This project addresses the "black-box" nature of imported EV battery controllers by providing a transparent, software-defined predictive health system. Leveraging the **VSDSquadron ULTRA (THEJAS32 RISC-V)**, we perform real-time, deterministic feature extraction from a **Daly 16S60V60A BMS** to forecast Remaining Useful Life (RUL) and State of Health (SoH).

## 🛠️ Hardware Architecture
Our system acts as a **Passive Observation Layer**, ensuring zero interference with the vehicle's drivetrain.

- **Testbed:** Devise Electronics 2-Wheeler Rig (Simple E-Pluto 7G).
- **Edge Node:** VSDSquadron ULTRA powered by C-DAC’s indigenous THEJAS32 RISC-V processor.
- **BMS:** Daly 16S60V60A (Hardware: BMS-ST103-309E).
- **Interface:** Isolated CAN-to-UART/SPI bridge using **SN65HVD230** for 2.5kV galvanic isolation.

## 🧠 Edge Intelligence logic
Unlike standard pass-through systems, our firmware extracts high-value physical health indicators locally:

1. **Deterministic Polling:** 500ms jitter-free sampling via hardware timer interrupts.
2. **Voltage Spread ($V_{spread}$):** Real-time monitoring of $V_{max} - V_{min}$ across 16 strings to detect early-stage imbalance.
3. **Internal Resistance Proxy:** Calculated using Ohmic drop analysis ($\Delta V / \Delta I$) during acceleration transients.
4. **Thermal Gradient Tracking:** Monitoring temperature differences between core and surface cells to predict thermal stress.

## 📂 Repository Structure
```text
EV-Battery-Health-Indigenous/
├── 📁 hardware/            # Isolated CAN schematics and photos
├── 📁 dataset/             # Raw 16-cell CAN logs and processed CSVs
├── 📁 firmware/            # THEJAS32 C code (CAN Decode & ML Inference)
├── 📁 dashboard/           # Real-time WebSocket-based health visualization
└── 📁 demo/                # Live video of the E-Pluto 7G rig in operation
