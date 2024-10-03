export type DateAdjustment = {
    originalStartDate: Date;
    originalEndDate: Date;
    adjustedStartDate: Date;
};

export const adjustEndDateOnDateChange = (adjustment: DateAdjustment) => {
    const { originalStartDate, originalEndDate, adjustedStartDate } = adjustment;

    const timeDifference = Math.abs(originalStartDate.getTime() - originalEndDate.getTime());
    const adjustedEndDate = new Date(adjustedStartDate.getTime() + timeDifference);

    return adjustedEndDate;
};
