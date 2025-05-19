export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type Location = {
  id: string;
  name: string;
  distance: string;
  walkTime?: string;
  coordinates: Coordinates;
  category: LocationCategory;
  address: string;
  phone?: string;
  website?: string;
  openingHours?: string;
};

export type LocationCategory =
  | "Schools"
  | "Banks"
  | "Hospitals"
  | "Stores"
  | "Airports";

export type CategoryData = Record<LocationCategory, Location[]>;

export type MapViewType = "Map" | "Satellite";

export type LocationError = {
  code: string;
  message: string;
};

export type LocationState = {
  data: CategoryData | null;
  loading: boolean;
  error: LocationError | null;
  userLocation: Coordinates | null;
};
