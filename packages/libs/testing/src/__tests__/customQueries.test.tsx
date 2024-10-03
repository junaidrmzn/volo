import { screen } from "@testing-library/react";
import { FormControl, FormLabel, Select } from "@volocopter/design-library-react";
import { getSelectedOptions } from "../customQueries";
import { customRender } from "../customRender";

const options = [
    { value: "option1", label: "option1" },
    { value: "option2", label: "option2" },
    { value: "option3", label: "option3" },
];

test("getSelectedOptions can find value form single select", () => {
    customRender(
        <FormControl>
            <FormLabel>selectLabel</FormLabel>
            <Select options={options} value={options[0]} name="testSelect" />
        </FormControl>
    );

    const selectInput = screen.getByLabelText("selectLabel");
    const selectedOptions = getSelectedOptions(selectInput);

    expect(selectedOptions).toStrictEqual(["option1"]);
});

test("getSelectedOptions can find values form multi select", () => {
    customRender(
        <FormControl>
            <FormLabel>selectLabel</FormLabel>
            <Select
                isMulti
                options={options}
                value={options.filter((option) => option.label !== "option1")}
                name="testSelect"
            />
        </FormControl>
    );

    const selectInput = screen.getByLabelText("selectLabel");
    const selectedOptions = getSelectedOptions(selectInput);

    expect(selectedOptions).toStrictEqual(["option2", "option3"]);
});

test("getSelectedOptions returns a empty list if nothing is selected", () => {
    customRender(
        <FormControl>
            <FormLabel>selectLabel</FormLabel>
            <Select isMulti options={options} name="testSelect" />
        </FormControl>
    );

    const selectInput = screen.getByLabelText("selectLabel");
    const selectedOptions = getSelectedOptions(selectInput);

    expect(selectedOptions).toStrictEqual([]);
});
