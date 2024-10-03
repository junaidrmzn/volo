import { format } from "date-fns";

export const formatDateTimeInputDate = (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd H:mm");
    return `${formattedDate} UTC`;
};
