import { convertDateToApiStringFormat } from "..";

test("convert Date to Api string format", async () => {
    // new Date uses the monthIndex for setting the month so index 3 equals 4th month
    const dateApiFormat = convertDateToApiStringFormat(new Date(2021, 3, 10));
    expect(dateApiFormat).toEqual("2021-04-10");
});
