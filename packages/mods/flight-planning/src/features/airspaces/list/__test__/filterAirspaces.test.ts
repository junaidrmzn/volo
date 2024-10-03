import type { AirspaceAllOf } from "@voloiq-typescript-api/flight-planning-types/dist";
import type { AltitudeRange, Option } from "../../types";
import { mockedAirspaceList } from "../__mocks__/airspacesList";
import { filterAirspacesByRangeAndType } from "../filterAirspaces";

describe("filterAirspaces", () => {
    it("should show all airspaces if nothing is given", () => {
        const airspaces: AirspaceAllOf = mockedAirspaceList;
        const altitudeRange: AltitudeRange = [0, 1000];
        const selectedFilters: Option[] = [];
        const filteredAirspaces = filterAirspacesByRangeAndType(altitudeRange, selectedFilters, airspaces);

        expect(filteredAirspaces.length).toEqual(4);
    });

    it("should show only CTR filtered airspaces (OR filtering)", () => {
        const airspaces: AirspaceAllOf = mockedAirspaceList;
        const altitudeRange: AltitudeRange = [0, 1000];
        const selectedFilters: Option[] = [
            {
                label: "CTR",
                value: "CTR",
                type: "type",
            },
        ];
        const filteredAirspaces = filterAirspacesByRangeAndType(altitudeRange, selectedFilters, airspaces);

        expect(filteredAirspaces.length).toEqual(2);
    });
    it("should show only CTR or TEST filtered airspaces (OR filtering)", () => {
        const airspaces: AirspaceAllOf = mockedAirspaceList;
        const altitudeRange: AltitudeRange = [0, 1000];
        const selectedFilters: Option[] = [
            {
                label: "CTR",
                value: "CTR",
                type: "type",
            },
            {
                label: "TEST",
                value: "TEST",
                type: "type",
            },
        ];
        const filteredAirspaces = filterAirspacesByRangeAndType(altitudeRange, selectedFilters, airspaces);

        expect(filteredAirspaces.length).toEqual(3);
    });
    it("should show only CTR or TEST or classification B filtered airspaces (OR filtering)", () => {
        const airspaces: AirspaceAllOf = mockedAirspaceList;
        const altitudeRange: AltitudeRange = [0, 1000];
        const selectedFilters: Option[] = [
            {
                label: "CTR",
                value: "CTR",
                type: "type",
            },
            {
                label: "TEST",
                value: "TEST",
                type: "type",
            },
            {
                label: "B",
                value: "B",
                type: "classification",
            },
        ];
        const filteredAirspaces = filterAirspacesByRangeAndType(altitudeRange, selectedFilters, airspaces);

        expect(filteredAirspaces.length).toEqual(4);
    });
    it("should show only CTR or TEST or classification B filtered airspaces that are within 0 to 100 meter (OR filtering for class and type, AND for the altitude)", () => {
        const airspaces: AirspaceAllOf = mockedAirspaceList;
        const altitudeRange: AltitudeRange = [0, 100];
        const selectedFilters: Option[] = [
            {
                label: "CTR",
                value: "CTR",
                type: "type",
            },
            {
                label: "TEST",
                value: "TEST",
                type: "type",
            },
            {
                label: "B",
                value: "B",
                type: "classification",
            },
        ];
        const filteredAirspaces = filterAirspacesByRangeAndType(altitudeRange, selectedFilters, airspaces);

        expect(filteredAirspaces.length).toEqual(3);
    });
});
