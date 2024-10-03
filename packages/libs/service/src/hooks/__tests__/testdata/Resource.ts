export type ResourceCreate = {
    location: string;
    age?: number;
    width: number;
    height: number;
    length: number;
};

export type ResourceUpdate = Partial<ResourceCreate>;

export type Resource = ResourceCreate & { id: string };

export const anyResource = (overwrites?: Partial<ResourceCreate>): ResourceCreate => ({
    location: "Bruchsal",
    age: Math.round(Math.random() * 100),
    width: Math.round(Math.random() * 1000),
    height: Math.round(Math.random() * 1000),
    length: Math.round(Math.random() * 1000),
    ...overwrites,
});

export const anyResourceWithId = (overwrites?: Partial<Resource>): Resource => ({
    id: Math.round(Math.random() * 1000).toString(),
    ...anyResource(),
    ...overwrites,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isResource = (potentialResource: any): potentialResource is Resource =>
    ((potentialResource !== null && typeof potentialResource === "object") ||
        typeof potentialResource === "function") &&
    typeof potentialResource.location === "string" &&
    (typeof potentialResource.age === "undefined" || typeof potentialResource.age === "number") &&
    typeof potentialResource.width === "number" &&
    typeof potentialResource.height === "number" &&
    typeof potentialResource.length === "number";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isPartialResource = (potentialResource: any): potentialResource is Resource =>
    ((potentialResource !== null && typeof potentialResource === "object") ||
        typeof potentialResource === "function") &&
    typeof (potentialResource.location === "undefined" || potentialResource.location === "string") &&
    (typeof potentialResource.age === "undefined" || typeof potentialResource.age === "number") &&
    (typeof potentialResource.width === "undefined" || typeof potentialResource.width === "number") &&
    (typeof potentialResource.height === "undefined" || typeof potentialResource.height === "number") &&
    (typeof potentialResource.length === "undefined" || typeof potentialResource.length === "number");
