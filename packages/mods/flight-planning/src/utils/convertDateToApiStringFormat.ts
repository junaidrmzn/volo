import { format } from "date-fns";

export const convertDateToApiStringFormat = (date: Date): string => {
    return format(date, "yyyy-MM-dd");
};
