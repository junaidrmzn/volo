import { number as yupNumber } from "yup";

export const number = () =>
    yupNumber()
        .transform((value, originalValue) => (originalValue === "" ? undefined : value))
        .optional();
