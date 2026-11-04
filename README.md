# 🚦 Smart City Traffic Management System

An enterprise-grade, animated, full-stack **Smart City Traffic Intelligence Command Center** powered by four Machine Learning models executing in parallel through Node.js IPC to Python scikit-learn estimators.

![Project Overview](frontend/public/images/sports-car.png)

---

## 📋 Table of Contents
1. [Project Overview](#1-project-overview)
2. [Key Features](#2-key-features)
3. [System Architecture](#3-system-architecture)
4. [Technology Stack](#4-technology-stack)
5. [Prerequisites & Installation](#5-prerequisites--installation)
6. [Frontend Setup](#6-frontend-setup)
7. [Backend Setup](#7-backend-setup)
8. [Python ML Setup](#8-python-ml-setup)
9. [Dataset Placement](#9-dataset-placement)
10. [Running the Application](#10-running-the-application)
11. [REST API Documentation](#11-rest-api-documentation)
12. [Machine Learning Models Deep-Dive](#12-machine-learning-models-deep-dive)
13. [Project Directory Structure](#13-project-directory-structure)
14. [Troubleshooting Guide](#14-troubleshooting-guide)

---

## 1. Project Overview
Modern urban transportation networks require real-time cognitive surveillance and adaptive traffic routing. The **Smart City Traffic Management System** enables municipal operators and traffic engineers to simulate, evaluate, and forecast arterial highway congestion across 23 sensory variables.

The system evaluates four distinct machine-learning models simultaneously:
1. **Linear Regression** — Forecasts exact continuous `traffic_flow_rate` (vehicles/hour).
2. **Logistic Regression** — Multi-class probabilistic prediction of `congestion_level` (`Low`, `Moderate`, `High`, `Severe`).
3. **Decision Tree Classifier** — Non-linear hierarchical decision splits identifying primary bottleneck variables (`max_depth=10`, `class_weight="balanced"`).
4. **Random Forest Ensemble** — High-capacity bagged consensus of 200 estimator trees (`n_estimators=200`, `max_depth=15`).

---

## 2. Key Features
- **Smart City Command Center UI**: Cybernetic dark navy/black aesthetic with glassmorphism, glowing telemetry cards, and ambient highway animations.
- **Vehicle Scenario Simulator**: Select between **Sports Car** (rapid dynamic flow), **Heavy Truck** (logistics artery), and **Mixed Metropolitan Traffic**.
- **Live Highway Animation**: 4-lane CSS and Framer Motion roadway simulation featuring real moving sports cars and freight trailers whose speed dynamically decreases as congestion intensifies.
- **Physical Traffic Signal Simulator**: Responsive Red, Amber, and Green optical beacon with active countdown timer reacting to AI consensus status.
- **Interactive Telemetry Form**: 23 calibrated urban inputs categorized across Traffic, Road Dynamics, Environment, Infrastructure, and Safety.
- **Demo Mode**: One-click **LOAD DEMO DATA** populating the exact benchmark scenario from reference models.
- **Explainable AI (XAI)**: Dynamic horizontal bar chart ranking real Gini feature importance attributions calculated by the models.
- **Full Recharts Analytics Suite**:
  - Hourly Flow Rate curves.
  - Softmax Congestion Probability Donut charts.
  - Fleet Demographic Breakdown bar graphs.
  - Spatial Density vs. Queue Propagation area plots.

---

## 3. System Architecture

```text
       ┌────────────────────────────────────────────────────────┐
       │              Next.js 14+ Frontend Dashboard            │
       │     (React, TypeScript, Tailwind CSS, Framer Motion)    │
       └──────────────────────────┬─────────────────────────────┘
                                  │
                                  │ HTTP REST API (JSON)
                                  ▼
       ┌────────────────────────────────────────────────────────┐
       │               Node.js + Express.js Backend             │
       │       - Health Surveillance: GET /api/health           │
       │       - Telemetry Dispatch:  POST /api/predict         │
       └──────────────────────────┬─────────────────────────────┘
                                  │
                                  │ child_process.spawn() via stdin
                                  ▼
       ┌────────────────────────────────────────────────────────┐
       │             Python 3 Scikit-Learn Engine               │
       │  ┌───────────────────────┬──────────────────────────┐  │
       │  │ linear_predict.py     │ logistic_predict.py      │  │
       │  ├───────────────────────┼──────────────────────────┤  │
       │  │ decision_tree_predict │ random_forest_predict.py │  │
       │  └───────────────────────┴──────────────────────────┘  │
       │                                                        │
       │   Loads serialized .joblib models (or trains on-the-   │
       │   fly from smart_city_traffic_mobility.csv)            │
       └──────────────────────────┬─────────────────────────────┘
                                  │
                                  │ JSON Result Stream (stdout)
                                  ▼
       ┌────────────────────────────────────────────────────────┐
       │           Node.js Consensus Aggregation Engine         │
       │   (Computes weighted agreement, confidence & actions)  │
       └──────────────────────────┬─────────────────────────────┘
                                  │
                                  │ Final JSON Response
                                  ▼
       ┌────────────────────────────────────────────────────────┐
       │            Next.js Animated Command Center             │
       └────────────────────────────────────────────────────────┘
```

---

## 4. Technology Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **UI Library**: React 18, TypeScript
- **Styling**: Tailwind CSS with custom cyber-grid gradients & glassmorphism
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Data Visualizations**: Recharts

### Backend
- **Runtime**: Node.js v20+ / v24+
- **Server Framework**: Express.js
- **Middleware**: CORS, dotenv
- **IPC Subprocesses**: Node.js `child_process.spawn()`

### Machine Learning
- **Language**: Python 3.10+ / 3.14+
- **Libraries**: scikit-learn, pandas, numpy, joblib

---

## 5. Prerequisites & Installation

Verify that you have Node.js and Python installed:
```bash
node -v
npm -v
python --version
```

Install Python ML dependencies:
```bash
pip install pandas numpy scikit-learn joblib
```

---

## 6. Frontend Setup

Navigate to the `frontend` folder and install dependencies:
```bash
cd frontend
npm install
```

Start the Next.js development server:
```bash
npm run dev
```
The frontend is accessible at: **`http://localhost:3000`**

---

## 7. Backend Setup

Navigate to the `backend` folder and install dependencies:
```bash
cd backend
npm install
```

Start the Express backend:
```bash
node server.js
```
The backend initializes on port 5000: **`http://localhost:5000`**

---

## 8. Python ML Setup

The Python models can either run from pre-trained `.joblib` model binaries or train automatically on-the-fly.

To manually pre-train and serialize all 4 models:
```bash
cd backend
npm run train
# Or directly:
python python/train_all.py
```

This trains the models on the 204,000-record dataset and produces:
- `backend/models/linear_regression.joblib`
- `backend/models/logistic_regression.joblib`
- `backend/models/decision_tree.joblib`
- `backend/models/random_forest.joblib`

---

## 9. Dataset Placement

The system dataset `smart_city_traffic_mobility.csv` is located at:
```text
smart-city-traffic-ai/backend/data/smart_city_traffic_mobility.csv
```
If the CSV is placed at the project root or in `backend/data/`, all Python scripts locate and load it automatically.

---

## 10. Running the Application

Open two terminal windows:

### Terminal 1 (Backend):
```bash
cd smart-city-traffic-ai/backend
node server.js
```

### Terminal 2 (Frontend):
```bash
cd smart-city-traffic-ai/frontend
npm run dev
```

Open your browser to: **`http://localhost:3000`**

---

## 11. REST API Documentation

### 1. Health Check
- **Method**: `GET`
- **URL**: `/api/health`
- **Response**:
```json
{
  "status": "online",
  "service": "Smart City Traffic AI"
}
```

### 2. Predict Traffic
- **Method**: `POST`
- **URL**: `/api/predict`
- **Headers**: `Content-Type: application/json`
- **Body**:
```json
{
  "vehicle_count": 850,
  "average_speed": 25,
  "heavy_vehicle_count": 40,
  "motorcycle_count": 80,
  "public_transport_count": 30,
  "traffic_density": 140,
  "queue_length": 100,
  "average_wait_time": 15,
  "hour": 8,
  "is_weekend": 0,
  "is_holiday": 0,
  "rush_hour": 1,
  "temperature": 25,
  "rainfall_mm": 0,
  "visibility_km": 9,
  "air_quality_index": 70,
  "parking_occupancy": 60,
  "construction_activity": 0,
  "accident_reported": 0,
  "traffic_camera_count": 1,
  "signal_cycle_seconds": 120,
  "green_light_duration": 80,
  "emergency_vehicle_detected": 0
}
```

- **Response**:
```json
{
  "success": true,
  "linearRegression": {
    "trafficFlowRate": 850.0,
    "mae": 0.0,
    "mse": 0.0,
    "rmse": 0.0,
    "r2": 1.0,
    "status": "Active (StandardScaler + LinearRegression)"
  },
  "logisticRegression": {
    "congestionLevel": "Severe",
    "confidence": 100.0,
    "probabilities": {
      "Low": 0.0,
      "Moderate": 0.0,
      "High": 0.0,
      "Severe": 100.0
    },
    "accuracy": 98.01,
    "status": "Active (StandardScaler + LogisticRegression)"
  },
  "decisionTree": {
    "congestionLevel": "Severe",
    "confidence": 100.0,
    "accuracy": 98.36,
    "maxDepth": 10,
    "featureImportance": [
      { "feature": "traffic_density", "importance": 0.887, "percentage": 88.7 },
      { "feature": "average_speed", "importance": 0.045, "percentage": 4.5 }
    ]
  },
  "randomForest": {
    "congestionLevel": "Severe",
    "confidence": 98.5,
    "accuracy": 98.24,
    "nEstimators": 200,
    "maxDepth": 15,
    "featureImportance": [
      { "feature": "traffic_density", "importance": 0.2952, "percentage": 29.5 },
      { "feature": "vehicle_count", "importance": 0.1227, "percentage": 12.3 }
    ]
  },
  "finalVerdict": {
    "level": "Severe",
    "confidence": 99.5,
    "recommendations": [
      "Activate emergency traffic control protocols",
      "Increase signal priority for congested arteries",
      "Deploy traffic personnel to critical intersections",
      "Recommend immediate alternate routes on navigation feeds"
    ]
  }
}
```

---

## 12. Machine Learning Models Deep-Dive

| Model | Target Output | Key Hyperparameters / Pipeline | Test Accuracy / Score |
| :--- | :--- | :--- | :--- |
| **Linear Regression** | `traffic_flow_rate` | `StandardScaler() + LinearRegression()` | $R^2 = 1.0000$ |
| **Logistic Regression** | `congestion_level` | `StandardScaler() + LogisticRegression(max_iter=1000)` | $98.01\%$ |
| **Decision Tree** | `congestion_level` | `DecisionTreeClassifier(max_depth=10, class_weight='balanced')` | $98.36\%$ |
| **Random Forest** | `congestion_level` | `RandomForestClassifier(n_estimators=200, max_depth=15, n_jobs=-1)` | $98.24\%$ |

---

## 13. Project Directory Structure

```text
smart-city-traffic-ai/
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx                    # Main Command Center Dashboard
│   │   ├── layout.tsx                  # Global HTML Layout & Metadata
│   │   └── globals.css                 # Cyber theme, Glassmorphism & Animations
│   │
│   ├── components/
│   │   ├── Navbar.tsx                  # Header with real-time health indicator
│   │   ├── Hero.tsx                    # Animated road with sports car & truck
│   │   ├── VehicleSelector.tsx         # Sports Car / Truck / Mixed scenario cards
│   │   ├── TrafficInput.tsx            # 23-feature grouped inputs & Demo loader
│   │   ├── ModelCard.tsx               # 4 Model result cards with Framer Motion
│   │   ├── AIConsensus.tsx             # Unified verdict & recommended actions
│   │   ├── TrafficCharts.tsx           # 4 Recharts graphs (Line, Donut, Bar, Area)
│   │   ├── TrafficSimulation.tsx       # Live 4-lane highway with moving traffic
│   │   ├── TrafficLight.tsx            # Animated 3-state traffic signal & timer
│   │   ├── FeatureImportance.tsx       # Real Gini feature weights from Python
│   │   └── LoadingAnalysis.tsx         # Scanning radar loading animation
│   │
│   ├── public/
│   │   └── images/
│   │       ├── sports-car.png          # High-resolution blue sports car
│   │       └── heavy-truck.png         # High-resolution white freight trailer
│   │
│   ├── lib/
│   │   └── api.ts                      # API client, types & scenario presets
│   │
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   └── next.config.js
│
├── backend/
│   ├── server.js                       # Express.js REST API server
│   ├── routes/
│   │   └── prediction.js               # Validation & controller route
│   │
│   ├── services/
│   │   └── pythonRunner.js             # child_process.spawn() Python bridge
│   │
│   ├── python/
│   │   ├── linear_predict.py           # Linear Regression prediction script
│   │   ├── logistic_predict.py         # Logistic Regression prediction script
│   │   ├── decision_tree_predict.py    # Decision Tree prediction script
│   │   ├── random_forest_predict.py    # Random Forest prediction script
│   │   └── train_all.py                # Standalone training script for all 4 models
│   │
│   ├── models/                         # Serialized .joblib model files
│   │
│   ├── data/
│   │   └── smart_city_traffic_mobility.csv  # 204,000-record dataset
│   │
│   ├── package.json
│   └── .env                            # Server configuration
│
├── README.md
└── .gitignore
```

---

## 14. Troubleshooting Guide

- **Backend port 5000 in use**:
  Change `PORT=5001` in `backend/.env` and `NEXT_PUBLIC_API_URL=http://localhost:5001/api` in frontend.
- **Python command not found**:
  Specify your Python binary path in `backend/.env` via `PYTHON_PATH=python3` or `PYTHON_PATH=C:\Path\To\python.exe`.
- **Model files missing**:
  If `.joblib` files are not found, the Python scripts will automatically train on `smart_city_traffic_mobility.csv` on demand. You can also run `npm run train` inside `backend/`.
- **CORS issues**:
  Ensure the backend is running and `CORS_ORIGIN=http://localhost:3000` is set in `backend/.env`.
