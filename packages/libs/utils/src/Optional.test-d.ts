import { expectAssignable, expectNotAssignable } from "tsd-lite";
import type { Optional } from "./Optional";

const testSubject = {
    hairColor: "green",
    numberOfLegs: 8,
    alive: true,
};
type TestSubject = typeof testSubject;

const baldTestSubject = {
    numberOfLegs: 2,
    alive: true,
};

type TestSubjectWithOptionalHair = Optional<TestSubject, "hairColor">;

expectAssignable<TestSubjectWithOptionalHair>(testSubject);
expectAssignable<TestSubjectWithOptionalHair>(baldTestSubject);
expectNotAssignable<TestSubject>(baldTestSubject);
