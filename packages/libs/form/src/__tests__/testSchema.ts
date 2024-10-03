import { createFormControl } from "../form-control/FormControl";
import {
    InferType,
    attachment,
    boolean,
    coordinate,
    date,
    multiselect,
    number,
    object,
    select,
    string,
    unit,
} from "../yup";
import { textarea } from "../yup/textarea";

const onChangeBaseValue = jest.fn();
export const testSchema = object({
    firstName: string().required().label("First Name"),
    lastName: string().label("Last Name"),
    age: number().min(0).required().label("Age"),
    temperature: unit({
        baseUnit: "°C",
        unitType: "temperature",
        defaultBaseValue: "1",
        onChangeBaseValue,
    })
        .required()
        .label("Temperature"),
    gender: select<string>({
        placeholder: "Please choose",
        options: [
            { value: "male", label: "male" },
            { value: "female", label: "female" },
        ],
        errorMessage: "Please choose a valid option",
    })
        .required()
        .label("Gender"),
    hobbies: multiselect({
        placeholder: "Please choose",
        options: [
            { value: "Tennis", label: "Tennis" },
            { value: "Football", label: "Football" },
            { value: "Sleeping", label: "Sleeping" },
            { value: "Eating", label: "Eating" },
        ],
        errorMessage: "Please choose a valid option",
    }).label("Hobbies"),
    isVegetarian: boolean().label("Vegetarian"),
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
    dateOfBirth: date({ withUtcTime: true }).required().label("Date of Birth"),
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
});
type Schema = typeof testSchema;

export const initialValues: InferType<Schema> = {
    firstName: "John",
    lastName: "Doe",
    age: 25,
    gender: { value: "male" },
    hobbies: [{ value: "Sleeping" }, { value: "Eating" }],
    isVegetarian: false,
    attachments: [],
    notes: "Pretty windy today",
    dateOfBirth: new Date(Date.UTC(new Date().getUTCFullYear(), 1, 1)),
    temperature: 1,
    coordinates: "41.40338, 2.17403",
};

export const FormControl = createFormControl<Schema>();
