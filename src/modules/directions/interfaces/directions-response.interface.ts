export interface DirectionsLeg {
    duration: { text: string };
    distance: { text: string };
}

export interface DirectionsRoute {
    legs: DirectionsLeg[];
}

export interface GoogleDirectionsResponse {
    routes: DirectionsRoute[];
}
