import { Matchers } from "@pact-foundation/pact";
import { pactCoordinate } from "./pactCoordinate";

const { like, string, uuid, eachLike, term, integer } = Matchers;
const rfc3339TimestampMatcher = term({
    matcher: "((\\d{4}-\\d{2}-\\d{2})T(\\d{2}:\\d{2}:\\d{2}(?:\\.\\d+)?)Z)$",
    generate: "2020-11-06T16:34:41.000Z",
});

const stringPair = () =>
    like({
        key: string(),
        value: string(),
    });

export const pactRegion = () =>
    like({
        id: uuid(),
        version: integer(),
        name: string(),
        coordinates: like({
            points: eachLike(pactCoordinate()),
        }),
        center: pactCoordinate(),
        names: eachLike(stringPair()),
        createTime: rfc3339TimestampMatcher,
        updateTime: rfc3339TimestampMatcher,
        publicFrom: rfc3339TimestampMatcher,
        publicTo: rfc3339TimestampMatcher,
        validFrom: rfc3339TimestampMatcher,
        validTo: rfc3339TimestampMatcher,
    });
