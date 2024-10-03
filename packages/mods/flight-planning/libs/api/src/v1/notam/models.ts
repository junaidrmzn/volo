export type Notam = {
    type: string;
    features: Feature[];
};

export type Feature = {
    type: FeatureType;
    geometry: FeatureGeometry;
    properties: Properties;
};

type FeatureGeometry = {
    type: FeatureGeometryType;
    geometries: GeometryElement[];
};

type GeometryElement = {
    type: GeometryType;
    coordinates: number[] | number[][][];
    lowerLimit?: LowerLimit;
    upperLimit?: UpperLimit;
};

type LowerLimit = {
    reference: string;
};

type GeometryType = "Polygon" | "Point";

type UpperLimit = {
    reference?: string;
    uom?: string;
    value?: number;
};

type FeatureGeometryType = "GeometryCollection";

type Properties = {
    lon: number;
    lat: number;
    text: string;
    type: string;
    year: number;
    qcode: string;
    scope: string;
    issued?: string;
    number: number;
    radius: number;
    series: string;
    purpose: string;
    traffic: string;
    location?: string;
    metadata: Metadata;
    schedule?: string;
    maximumFL: number;
    minimumFL: number;
    routeOptionId: number;
    schedules?: Schedule[];
    affectedFIR: string;
    countryCode: string;
    effectiveEnd?: string;
    publisherNOF: string;
    relationship?: Relationship;
    translations?: Translation[];
    effectiveStart: string;
    affectedAerodrome?: string;
    affectedEntities?: AffectedEntity[];
    externalId: string;
    createdAt: string;
};

type AffectedEntity = {
    type: string;
    closure: string;
};

type Metadata = {
    geometrySources: string[];
    lastUpdateTimestamp: string;
};

type Relationship = {
    reference?: Reference;
    affectedFIR?: AffectedFIRClass;
};

type AffectedFIRClass = {
    id: string;
    href: string;
};

type Reference = {
    year: number;
    number: number;
    series: string;
};

type Schedule = {
    endTime: string;
    frequency: string;
    startTime: string;
};

type Translation = {
    type: string;
    formattedText: string;
};

type FeatureType = "Feature";
