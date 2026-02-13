## 📂 Repository Structure

```text
EV-Battery-Health-Indigenous/
├── 📄 README.md                    # Project Vision & Standout Features
├── 📁 docs/                        # Technical Documentation
│   ├── scooter-rig-overview.pdf    # Lab setup: E-Pluto 7G + Daly BMS
│   ├── hardware-approach.pdf       # Passive CAN-to-UART/SPI implementation
│   ├── software-approach.pdf       # Feature extraction & RUL logic
│   └── architecture-diagram.pdf    # Mandatory System Block Diagram
├── 📁 hardware/                    # Hardware Implementation Proof
│   ├── photos/                     # Proof of institutional validation
│   │   ├── team-with-scooter-setup.jpg
│   │   ├── bms-app-connected.jpg  
│   │   └── battery-cells.jpg
|   |   └── battery-CAN-connection.jpg
│   ├── vsdsquadron-thejas32-ds.pdf # RISC-V Compute specs
│   └── wiring-schematic.pdf        # Isolated CAN (SN65HVD230) circuitry
|   ----battery-BMS-CAN-connection.jpeg
├── 📁 dataset/                     # Empirical Telemetry (The "Gold" Data)
│   ├── raw-can-logs/               # Hex frames from the 250kbps BMS stream
│   ├── processed-16cell-csv/       # Decoded Voltage, Current, Temp time-series
│   └── sample-session.json         # Structured MQTT payload for Cloud ML
├── 📁 firmware/                    # RISC-V Native C Code (THEJAS32)
|   |---Header_File.h
│   ├── can-decode.c                # Deterministic 500ms frame parser
│   ├── feature-extraction.c        # Edge AI: V_spread, R_int, Thermal Gradients
│   └── mqtt-client.c               # WiFi-based telemetry forwarding
├── 📁 dashboard/                   # Edge-to-Cloud Visualization
│   ├── index.html                  # Responsive Health Dashboard
│   ├── dashboard.js                # Real-time charting (Plotly.js/Chart.js)
│   └── style.css                   # Custom UI styling
├── 📁 cloud-backend/               # Analytics & Storage
│   ├── mqtt-subscriber.py          # Data ingestion from VSDSquadron
│   ├── data-processor.py           # Long-term degradation trend analysis
│   └── api-server.py               # Serving predictions to the Frontend


<img src="https://github.com/user-attachments/assets/4d4a9ee0-a1c6-4b94-b639-cd92f3c7d7b2" width="400" alt="Battery BMS Connection">
