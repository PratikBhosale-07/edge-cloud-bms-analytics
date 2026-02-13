EV-Battery-Health-Indigenous/
├── 📄 README.md                    # Main landing page 
├── 📁 docs/                        # All documents
│   ├── scooter-rig-overview.pdf    # Scooter + BMS + test setup photos
│   ├── hardware-approach.pdf       # Full hardware doc
│   ├── software-approach.pdf       # Full software doc
│   └── architecture-diagram.pdf    # main diagram
├── 📁 hardware/                    # Hardware proof
│   ├── photos/
│   │   ├── team-with-scooter-setup.jpg
│   │   ├── bms-app-connected.jpg  
│   │   └── battery-cells.jpg
│   ├── scooter-datasheet.pdf       # Full scooter info
│   ├── vsdsquadron-tヘjas32-datasheet.pdf
│   └── wiring-schematic.pdf        # CAN connections
├── 📁 dataset/                     # 16-cell data 
│   ├── raw-can-logs/               #  CAN captures
│   ├── processed-16cell-csv/       # Decoded cell voltages
│   └── sample-session.json         # Example MQTT payload
├── 📁 firmware/                    # THEJAS32 code
│   ├── can-decode.c
│   ├── feature-extraction.c
│   └── mqtt-client.c
├── 📁 dashboard/                   # Web frontend
│   ├── index.html
│   ├── dashboard.js                # Charts + plots
│   └── style.css
├── 📁 cloud-backend/               # Server code
│   ├── mqtt-subscriber.py
│   ├── data-processor.py
│   └── api-server.py
└── 📁 demo/                        # Video + GIFs
    ├── demo-video.mp4             # Live scooter demo
    └── live-dashboard.gif         # Running dashboard
