import { mapWithCorridorLayer } from "./mapWithCorridorLayer";
import { mapWithoutCorridor } from "./mapWithoutCorridorLayer";

export const mapImagesObject: { [key: string]: string } = {
    withCorridor: mapWithCorridorLayer,
    withoutCorridor: mapWithoutCorridor,
};
