export interface WizardLocation {
  address: string;
  city: string;
  state: string;
  coordinates: {
    lat: string;
    lng: string;
  };
  landmark: string;
}

export interface WizardForm {
  category: string;
  location: WizardLocation;
  title: string;
  description: string;
  priority: string;
  severity: number;
  impact: string;
  detectedDate: string;
  detectedTime: string;
  anonymous: boolean;
  areaAffected: string;
  photos: string[];
}

export interface CategoryTile {
  key: string;
  label: string;
  icon: string;
  description: string;
  gradient: string;
}
