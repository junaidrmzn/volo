import { convertCamelCaseToText } from "..";

test("correct conversion from camel case to normal text", async () => {
    const value = convertCamelCaseToText("camelCaseToText");
    expect(value).toEqual("Camel Case To Text");
});
