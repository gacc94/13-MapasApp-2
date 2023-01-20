export interface PlacesResponse {
    type:        string;
    query:       string[];
    features:    Feature[];
    attribution: string;
}

export interface Feature {
    id:                   string;
    type:                 string;
    place_type:           string[];
    relevance:            number;
    properties:           Properties;
    text:                 string;
    place_name:           string;
    bbox?:                number[];
    center:               number[];
    geometry:             Geometry;
    context:              Context[];
    matching_text?:       string;
    matching_place_name?: string;
}

export interface Context {
    id:          string;
    wikidata?:   string;
    text:        string;
    short_code?: string;
}

export interface Geometry {
    type:        string;
    coordinates: number[];
}

export interface Properties {
    wikidata?:   string;
    landmark?:   boolean;
    address?:    string;
    foursquare?: string;
    category?:   string;
}
