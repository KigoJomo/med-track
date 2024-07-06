# MedTrack

MedTrack is a blockchain-based medication tracking system designed to ensure the authenticity and integrity of medications as they move through the supply chain, from manufacturers to hospitals and pharmacies.

## Table of Contents

- [MedTrack](#medtrack)
  - [Table of Contents](#table-of-contents)
  - [Project Structure](#project-structure)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Application](#running-the-application)
  - [Available Scripts](#available-scripts)
  - [License](#license)

## Project Structure

The project is structured as follows:

``` bash
src/
|-- components/
|   |-- BatchInfo.js
|   |-- CreateShipment.js
|   |-- Dashboard.js
|   |-- Elements.js
|   |-- Layout.js
|   |-- Login.js
|   |-- TrackShipment.js
|   |-- VerifyMedication.js
|
|-- index.js
|-- index.css
```

## Features

- **Dashboard:** Details of recent shipments and their status.
- **Batch Information:** Display detailed information about medication batches.
- **Create Shipment:** Interface for creating new shipments.
- **Track Shipment:** Real-time tracking of medication shipments.
- **Verify Medication:** Verify the authenticity of medications using blockchain.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/KigoJomo/med-track.git
    ```

2. Navigate to the project directory:

    ```bash
    cd med-track
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

### Running the Application

1. Start the development server:

    ```bash
    npm start
    ```

2. Open your browser and navigate to:

    <http://localhost:3000>

## Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in development mode.
- `npm build`: Builds the app for production.
- `npm test`: Launches the test runner.

## License

This project is licensed under the MIT License.
