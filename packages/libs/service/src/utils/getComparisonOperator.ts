import {
    BooleanOperatorType,
    NumberOperatorType,
    SelectMultipleOperatorType,
    SelectOperatorType,
    TextOperatorType,
} from "@volocopter/filter-react";

export const textOperators: { [key in TextOperatorType]: string } = {
    equal: "EQ",
    notEqual: "NE",
    contains: "LIKE",
    notContains: "NOT_LIKE",
};

export const selectMultipleOperators: { [key in SelectMultipleOperatorType]: string } = {
    equal: "IN",
    notEqual: "NOT_IN",
};

export const selectOperators: { [key in SelectOperatorType]: string } = {
    equal: "EQ",
    notEqual: "NE",
};

export const booleanOperators: { [key in BooleanOperatorType]: string } = {
    equal: "EQ",
    notEqual: "NE",
};

export const numberOerators: { [key in NumberOperatorType]: string } = {
    equal: "EQ",
    notEqual: "NE",
};
