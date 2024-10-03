import type { Meta } from "@storybook/react";
import { Button } from "@volocopter/design-library-react";
import type { InferType } from "yup";
import { FormProvider } from "../form-context/FormProvider";
import { createFormControl } from "../form-control/FormControl";
import { FormGroup } from "../form-group/FormGroup";
import {
    attachment,
    boolean,
    coordinate,
    date,
    multiselect,
    number,
    object,
    radioGroup,
    select,
    string,
    textarea,
    unit,
} from "../yup";
import { textEditor } from "../yup/textEditor";

const meta: Meta = {
    title: "Form/Form",
};
export default meta;

const schema = object({
    firstName: string().required().label("First Name"),
    lastName: string().label("Last Name"),
    age: number().min(0).required().label("Age"),
    gender: select<"male" | "female" | "other">({
        placeholder: "Please choose",
        options: [
            { value: "male", label: "male" },
            { value: "female", label: "female" },
            { value: "other", label: "other" },
        ],
        errorMessage: "Please choose a valid option",
    }).label("Gender"),
    hobbies: multiselect({
        placeholder: "Please choose",
        options: [
            { value: "Tennis", label: "Tennis" },
            { value: "Football", label: "Football" },
            { value: "Golf", label: "Golf" },
            { value: "Gaming", label: "Gaming" },
            { value: "Sleeping", label: "Sleeping" },
            { value: "Eating", label: "Eating" },
        ],
        errorMessage: "Please choose a valid option",
    }).label("Hobbies"),
    isVegetarian: boolean().label("Vegetarian"),
    eatsHalal: boolean().label("Halāl"),
    attachments: attachment({
        deleteAriaLabel: "Delete",
        selectFilesLabel: "Select files",
        dropFilesLabel: "Drop files here",
        orLabel: "or",
        allowMultiple: true,
    })
        .required()
        .min(1, "Please select at least one attachment")
        .label("Attachments"),
    notes: textarea({
        placeholder: "Enter flight notes...",
    })
        .required()
        .label("Notes"),
    weight: unit({
        unitType: "weight",
        displayUnit: "kg",
        baseUnit: "kg",
        defaultBaseValue: "1",
        onChangeBaseValue: () => {},
    })
        .required()
        .label("Weight"),
    dateOfBirth: date().required().label("Date of Birth"),
    description: textEditor({
        placeholder: "hey",
        createImageSource: () => Promise.resolve("imageUrl"),
    }).label("Description"),
    coordinates: coordinate({
        coordinateInfoLabels: {
            latitudeLabel: "Latitude",
            longitudeLabel: "Longitude",
            cancelButtonLabel: "Cancel",
            applyButtonLabel: "Apply",
            iconButtonLabel: "coordinate",
        },
        placeholder: "Coordinate",
    })
        .required()
        .label("Coordinates"),
    hairColor: radioGroup({
        options: [
            {
                label: "Red",
                value: "red",
            },
            {
                label: "Blue",
                value: "blue",
            },
            {
                label: "Green",
                value: "green",
            },
        ],
        errorMessage: "Something went wrong",
        defaultValue: "red",
    }).label("Hair Color"),
});

type Schema = typeof schema;
const initialValues: InferType<Schema> = {
    firstName: "John",
    lastName: "Doe",
    age: 25,
    hobbies: [{ value: "Sleeping" }, { value: "Eating" }],
    gender: { value: "male" },
    isVegetarian: false,
    eatsHalal: false,
    attachments: [
        new File(["hello"], "hello.png", { type: "image/png" }),
        new File(["test"], "test.png", { type: "image/png" }),
    ],
    notes: "Pretty windy today",
    weight: 1.24,
    dateOfBirth: new Date("1997-11-01"),
    description: JSON.stringify({
        type: "doc",
        content: [
            {
                type: "paragraph",
                content: [
                    {
                        type: "text",
                        text: "Hey this is a text from the textEditor",
                    },
                ],
            },
        ],
    }),
    coordinates: "41.40338, 2.17403",
    hairColor: "blue",
};

const FormControl = createFormControl<Schema>();
export const Create = () => (
    <FormProvider
        schema={schema}
        formType="create"
        onCreate={(data) => {
            alert(JSON.stringify(data));
        }}
    >
        <FormControl fieldName="coordinates" />
        <FormControl fieldName="firstName" helperText="Non-unique identifier defined by your parents" />
        <FormControl fieldName="lastName" />
        <FormControl fieldName="age" />
        <FormControl fieldName="gender" />
        <FormControl fieldName="hobbies" />
        <FormGroup groupLabel="Food preferences">
            <FormControl fieldName="isVegetarian" showLabel={false} />
            <FormControl fieldName="eatsHalal" showLabel={false} />
        </FormGroup>
        <FormControl fieldName="attachments" />
        <FormControl fieldName="notes" />
        <FormControl fieldName="weight" />
        <FormControl fieldName="dateOfBirth" />
        <FormControl fieldName="description" />
        <FormControl fieldName="hairColor" />
        <Button type="submit" variant="primary">
            Create
        </Button>
    </FormProvider>
);

export const Edit = () => (
    <FormProvider
        schema={schema}
        formType="edit"
        onEdit={(data) => alert(JSON.stringify(data))}
        initialValues={initialValues}
    >
        <FormControl fieldName="coordinates" />
        <FormControl fieldName="firstName" isNotEditable />
        <FormControl fieldName="lastName" onChange={(data) => console.log("Last name changed", data)} />
        <FormControl fieldName="age" />
        <FormControl fieldName="gender" onChange={(data) => console.log("Selection changed", data)} />
        <FormControl fieldName="hobbies" />
        <FormGroup groupLabel="Food preferences">
            <FormControl fieldName="isVegetarian" showLabel={false} />
            <FormControl fieldName="eatsHalal" showLabel={false} />
        </FormGroup>
        <FormControl fieldName="attachments" />
        <FormControl fieldName="notes" />
        <FormControl fieldName="weight" />
        <FormControl fieldName="dateOfBirth" />
        <FormControl fieldName="description" />
        <FormControl fieldName="hairColor" />
        <Button type="submit" variant="primary">
            Edit
        </Button>
    </FormProvider>
);

export const Details = () => (
    <FormProvider schema={schema} formType="details" initialValues={initialValues}>
        <FormControl fieldName="coordinates" />
        <FormControl fieldName="firstName" />
        <FormControl fieldName="lastName" />
        <FormControl fieldName="age" />
        <FormControl fieldName="gender" />
        <FormControl fieldName="hobbies" />
        <FormGroup groupLabel="Food preferences">
            <FormControl fieldName="isVegetarian" showLabel={false} />
            <FormControl fieldName="eatsHalal" showLabel={false} />
        </FormGroup>
        <FormControl fieldName="attachments" />
        <FormControl fieldName="notes" />
        <FormControl fieldName="weight" />
        <FormControl fieldName="dateOfBirth" />
        <FormControl fieldName="description" />
        <FormControl fieldName="hairColor" />
    </FormProvider>
);

export const ReadOnlyTextInput = () => (
    <FormProvider
        schema={schema}
        formType="edit"
        onEdit={(data) => alert(JSON.stringify(data))}
        initialValues={initialValues}
    >
        <FormControl fieldName="coordinates" />
        <FormControl isReadOnly fieldName="firstName" helperText="Non-unique identifier defined by your parents" />
        <FormControl isReadOnly fieldName="lastName" />
        <FormControl fieldName="age" />
        <FormControl fieldName="gender" />
        <FormControl fieldName="hobbies" />
        <FormGroup groupLabel="Food preferences">
            <FormControl fieldName="isVegetarian" showLabel={false} />
            <FormControl fieldName="eatsHalal" showLabel={false} />
        </FormGroup>
        <FormControl fieldName="attachments" />
        <FormControl fieldName="notes" />
        <FormControl fieldName="weight" />
        <FormControl fieldName="dateOfBirth" />
        <FormControl fieldName="description" />
        <Button type="submit" variant="primary">
            Create
        </Button>
    </FormProvider>
);
