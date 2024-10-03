import { expectType } from "tsd-lite";
import { getTypedEntries } from "./getTypedEntries";

const testSubject = {
    skinColor: "blue",
    happiness: 10,
    moustache: true,
};

type TestSubjectEntries = (["skinColor", string] | ["happiness", number] | ["moustache", boolean])[];

expectType<TestSubjectEntries>(getTypedEntries(testSubject));
