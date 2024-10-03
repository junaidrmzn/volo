import { expectNotType, expectType } from "tsd-lite";
import { getTypedKeys } from "./getTypedKeys";

const testSubject = {
    hairColor: "green",
    numberOfLegs: 8,
    alive: true,
};

type testSubjectKeys = keyof typeof testSubject;

// returns an array of the passed object's keys
expectType<testSubjectKeys[]>(getTypedKeys(testSubject));

// With Object.keys() we would only get strings!
expectNotType<string[]>(getTypedKeys(testSubject));
