import { Matchers } from "@pact-foundation/pact";

const { like, integer } = Matchers;

export const pactCoordinate = () =>
    like({
        longitude: integer(),
        latitude: integer(),
        height: integer(),
    });
