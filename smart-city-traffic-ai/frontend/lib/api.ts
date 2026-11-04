export interface TrafficInputData {
  vehicle_count: number;
  average_speed: number;
  heavy_vehicle_count: number;
  motorcycle_count: number;
  public_transport_count: number;
  traffic_density: number;
  queue_length: number;
  average_wait_time: number;
  hour: number;
  is_weekend: number;
  is_holiday: number;
  rush_hour: number;
  temperature: number;
  rainfall_mm: number;
  visibility_km: number;
  air_quality_index: number;
  parking_occupancy: number;
  construction_activity: number;
  accident_reported: number;
  traffic_camera_count: number;
  signal_cycle_seconds: number;
  green_light_duration: number;
  emergency_vehicle_detected: number;
}

export interface FeatureImportanceItem {
  feature: string;
  importance: number;
  percentage: number;
}

export interface LinearRegressionResult {
  trafficFlowRate: number;
  mae?: number;
  mse?: number;
  rmse?: number;
  r2?: number;
  status?: string;
}

export interface ClassificationResult {
  congestionLevel: "Low" | "Moderate" | "High" | "Severe" | string;
  confidence: number;
  probabilities?: Record<string, number>;
  accuracy?: number;
  status?: string;
  maxDepth?: number;
  nEstimators?: number;
  featureImportance?: FeatureImportanceItem[];
}

export interface FinalVerdict {
  level: "Low" | "Moderate" | "High" | "Severe" | string;
  confidence: number;
  recommendations: string[];
}

export interface PredictionResponse {
  success: boolean;
  linearRegression: LinearRegressionResult;
  logisticRegression: ClassificationResult;
  decisionTree: ClassificationResult;
  randomForest: ClassificationResult;
  finalVerdict: FinalVerdict;
  error?: string;
}

// Section 31 Demo Data
export const DEMO_TRAFFIC_DATA: TrafficInputData = {
  vehicle_count: 850,
  average_speed: 25,
  heavy_vehicle_count: 40,
  motorcycle_count: 80,
  public_transport_count: 30,
  traffic_density: 140,
  queue_length: 100,
  average_wait_time: 15,
  hour: 8,
  is_weekend: 0,
  is_holiday: 0,
  rush_hour: 1,
  temperature: 25,
  rainfall_mm: 0,
  visibility_km: 9,
  air_quality_index: 70,
  parking_occupancy: 60,
  construction_activity: 0,
  accident_reported: 0,
  traffic_camera_count: 1,
  signal_cycle_seconds: 120,
  green_light_duration: 80,
  emergency_vehicle_detected: 0,
};

// Presets for Scenario Selector
export const VEHICLE_PRESETS: Record<"sports" | "truck" | "mixed", Partial<TrafficInputData>> = {
  sports: {
    vehicle_count: 650,
    average_speed: 68,
    heavy_vehicle_count: 5,
    motorcycle_count: 110,
    public_transport_count: 10,
    traffic_density: 75,
    queue_length: 25,
    average_wait_time: 5,
    rush_hour: 0,
    green_light_duration: 90,
  },
  truck: {
    vehicle_count: 980,
    average_speed: 18,
    heavy_vehicle_count: 140,
    motorcycle_count: 30,
    public_transport_count: 55,
    traffic_density: 185,
    queue_length: 180,
    average_wait_time: 28,
    rush_hour: 1,
    green_light_duration: 65,
  },
  mixed: {
    vehicle_count: 850,
    average_speed: 25,
    heavy_vehicle_count: 40,
    motorcycle_count: 80,
    public_transport_count: 30,
    traffic_density: 140,
    queue_length: 100,
    average_wait_time: 15,
    rush_hour: 1,
    green_light_duration: 80,
  },
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function checkBackendHealth(): Promise<{ online: boolean; message: string }> {
  try {
    const res = await fetch(`${API_BASE}/health`, {
      method: "GET",
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      return { online: true, message: data.service || "Online" };
    }
    return { online: false, message: "Backend returned non-200" };
  } catch {
    return { online: false, message: "Connection refused" };
  }
}

export async function predictTraffic(data: TrafficInputData): Promise<PredictionResponse> {
  const response = await fetch(`${API_BASE}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    let errorMsg = "Unable to connect to AI backend. Please make sure the Node.js server is running.";
    try {
      const errData = await response.json();
      if (errData && errData.error) {
        errorMsg = errData.error;
      }
    } catch {
      // fallback
    }
    throw new Error(errorMsg);
  }

  return response.json();
}

