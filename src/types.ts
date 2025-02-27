export interface SystemError {
  id: string;
  system: string;
  component: string;
  description: string;
  severity: 'Critical' | 'Warning' | 'Info';
  date?: string;
  reportedAt: string;
  affectedSystems: string[];
}

export interface Mission {
  id: string;
  name: string;
  title: string;
  date: string;
  duration: number;
  startTime?: string;
  endTime?: string;
  status: string;
  priority?: string;
  aircraftId: string;
  description?: string;
  stages: MissionStage[];
  currentStage?: string;
}

export interface CurrentRepair {
  id: string;
  aircraftId: string;
  startDate?: string;
  startTime: string;
  estimatedCompletion?: string;
  estimatedCompletionTime: string;
  technicianIds?: string[];
  status: string;
  stage?: string;
  description: string;
  requiredParts?: string[];
  notes?: string;
  assignedTechnicians?: any[];
  partsRequired?: { id: string; quantity: number; name?: string }[];
}

export interface Aircraft {
  id: string;
  tailNumber: string;
  model: string;
  status: string;
  location: string;
  locationLat: number;
  locationLng: number;
  lastMaintenance: string;
  lastMaintenanceDate?: string;
  nextScheduledMaintenance: string;
  missionCapable: boolean;
  errors: SystemError[];
  missions: Mission[];
  currentRepair?: CurrentRepair | null;
  flightHours?: number;
  flightHoursUntilMaintenance?: number;
  age?: number;
  repairs: Repair[];
  currentMission?: Mission | null;
}

export interface Technician {
  id: string;
  name: string;
  specialization?: string;
  rank?: string;
  availability?: 'Available' | 'On Duty' | 'Off Duty';
  currentTask?: string;
  available?: boolean;
  specialties?: string[];
  currentAssignment?: string;
}

export interface Part {
  id: string;
  name: string;
  stockLevel?: number;
  reorderLevel?: number;
  leadTime?: number;
  onOrder?: number;
  category?: string;
  partNumber?: string;
  inventory?: number;
  estimatedArrival?: string;
  quantity?: number;
}

export interface Weather {
  current: {
    temp: number;
    conditions: string;
    windSpeed: number;
    windDirection: string;
    visibility: number;
  };
  forecast: Array<{
    day: string;
    high: number;
    low: number;
    conditions: string;
    precipitation: number;
  }>;
  warnings: Array<{
    type: string;
    severity: 'Low' | 'Medium' | 'High';
    description: string;
  }>;
}

export interface MaintenanceStatus {
  id: string;
  status: string;
}

export interface Repair extends CurrentRepair {
  notes?: string;
  partsRequired: { id: string; quantity: number; name?: string }[];
  assignedTechnicians: any[];
  relatedErrorId?: string;
}

export interface WeatherCondition {
  conditions: string;
  temperature: number;
  windSpeed: number;
  windDirection?: string;
  humidity?: number;
  visibility?: number;
  ceiling?: number;
  updatedAt?: string;
  forecast?: {
    time: string;
    conditions: string;
    temperature: number;
    windSpeed: number;
    precipitation?: number;
  }[];
}

export interface Waypoint {
  lat: number;
  lng: number;
  altitude: number;
  order: number;
}

export interface MissionStage {
  id: string;
  name: string;
  waypoints: Waypoint[];
  status: 'Completed' | 'In Progress' | 'Pending';
  estimatedDuration: number;
}

// Add these new types for Flight Test Management
export interface TestPoint {
  id: string;
  name: string;
  description: string;
  status: 'Planned' | 'In Progress' | 'Completed' | 'Aborted';
  priority: 'High' | 'Medium' | 'Low';
  requirements: {
    weather: string;
    fuel: string;
    altitude: string;
    speed: string;
  };
  dependencies: string[];
  successCriteria: string[];
  risks: string[];
}

export interface MissionCard {
  id: string;
  title: string;
  testPoints: TestPoint[];
  aircraft: string;
  crew: {
    testPilot: string;
    flightEngineer: string;
    safetyOfficer: string;
  };
  date: Date;
  status: 'Planned' | 'Ready' | 'In Progress' | 'Completed' | 'Cancelled';
  weather: {
    required: string;
    actual: string;
  };
  briefingTime: string;
  takeoffTime: string;
}

export interface TestResource {
  id: string;
  type: 'Aircraft' | 'Equipment' | 'Personnel' | 'Facility';
  name: string;
  status: 'Available' | 'In Use' | 'Maintenance' | 'Unavailable';
  nextAvailable?: Date;
  qualifications?: string[];
  certifications?: string[];
}

export interface InstrumentationConfig {
  id: string;
  aircraftId: string;
  sensors: {
    id: string;
    type: string;
    location: string;
    calibrationDate: Date;
    nextCalibration: Date;
    status: 'Operational' | 'Needs Calibration' | 'Faulty';
  }[];
  dataRecorders: {
    id: string;
    type: string;
    status: 'Operational' | 'Fault';
    storageRemaining: number;
  }[];
  telemetry: {
    status: 'Online' | 'Offline';
    bandwidth: number;
    encryption: string;
  };
}

// Add TestEvent interface
export interface TestEvent {
  id: string;
  title: string;
  missionCard: string;
  date: Date;
  startTime: string;
  duration: number; // in hours
  resources: string[];
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  weather: {
    required: string;
    forecast: string;
  };
  briefingTime: string;
  testTeam: string[];
} 