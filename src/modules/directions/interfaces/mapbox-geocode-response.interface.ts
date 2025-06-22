export interface MapboxFeature {
    place_type: string[];
    text: string;
}

export interface MapboxGeocodeResponse {
    features: MapboxFeature[];
}
