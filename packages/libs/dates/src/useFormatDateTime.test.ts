import { renderHook } from "@voloiq/testing";
import { useFormatDateTime } from "./useFormatDateTime";

test("Returns correctly formatted date time for string input (in UTC time zone)", () => {
    const { result } = renderHook(useFormatDateTime, {
        initialProps: "UTC",
    });

    const dateString = "2022-08-09T12:46:31.901Z";

    expect(result.current.formatDateTime(dateString)).toEqual("2022-08-09 12:46");
    expect(result.current.formatDate(dateString)).toEqual("2022-08-09");
    expect(result.current.formatTime(dateString)).toEqual("12:46");
});

test("Returns correctly formatted date time for date input (in UTC time zone)", () => {
    const { result } = renderHook(useFormatDateTime, {
        initialProps: "UTC",
    });

    const date = new Date("2022-08-09T12:46:31.901Z");

    expect(result.current.formatDateTime(date)).toEqual("2022-08-09 12:46");
    expect(result.current.formatDate(date)).toEqual("2022-08-09");
    expect(result.current.formatTime(date)).toEqual("12:46");
});

test("Returns correctly formatted date time for string input (in CEST time zone)", () => {
    const { result } = renderHook(useFormatDateTime, {
        initialProps: "Europe/Berlin",
    });

    const dateString = "2022-08-09T12:46:31.901Z";
    expect(result.current.formatDateTime(dateString)).toEqual("2022-08-09 14:46");
    expect(result.current.formatDate(dateString)).toEqual("2022-08-09");
    expect(result.current.formatTime(dateString)).toEqual("14:46");
});

test("Returns correctly formatted date time for date input (in CEST time zone)", () => {
    const { result } = renderHook(useFormatDateTime, {
        initialProps: "Europe/Berlin",
    });

    const date = new Date("2022-08-09T12:46:31.901Z");

    expect(result.current.formatDateTime(date)).toEqual("2022-08-09 14:46");
    expect(result.current.formatDate(date)).toEqual("2022-08-09");
    expect(result.current.formatTime(date)).toEqual("14:46");
});

test("Returns correctly formatted date time for date input (in local time zone)", () => {
    const { result } = renderHook(useFormatDateTime, {
        initialProps: undefined,
    });

    const inputDate = new Date("2022-08-09T12:46:31.901Z").toLocaleString("en-US", { timeZone: "Europe/Berlin" });
    expect(result.current.formatDateTime(inputDate)).toEqual("2022-08-09 14:46");
    expect(result.current.formatDate(inputDate)).toEqual("2022-08-09");
    expect(result.current.formatTime(inputDate)).toEqual("14:46");
});

test("Returns correctly formatted date time for string input (in local time zone)", () => {
    const { result } = renderHook(useFormatDateTime, {
        initialProps: undefined,
    });

    const dateString = new Date("2022-08-09T12:46:31.901Z")
        .toLocaleString("en-US", { timeZone: "Europe/Berlin" })
        .toString();
    expect(result.current.formatDateTime(dateString)).toEqual("2022-08-09 14:46");
    expect(result.current.formatDate(dateString)).toEqual("2022-08-09");
    expect(result.current.formatTime(dateString)).toEqual("14:46");
});

test("Returns correctly formatted date time for date input (overwrite timezone)", () => {
    const { result } = renderHook(useFormatDateTime, {
        initialProps: "Europe/Berlin",
    });

    const timeZone = "Asia/Singapore";

    const date = new Date("2022-08-09T18:46:31.901Z");

    expect(result.current.formatDateTime(date, timeZone)).toEqual("2022-08-10 02:46");
    expect(result.current.formatDate(date, timeZone)).toEqual("2022-08-10");
    expect(result.current.formatTime(date, timeZone)).toEqual("02:46");
});

test("Change date to a specific timeZone (Asia/Singapore)", () => {
    const { result } = renderHook(useFormatDateTime, {
        initialProps: "Europe/Berlin",
    });

    const timeZone = "Asia/Singapore";

    const date = new Date("2022-08-09T18:10:20.300Z");

    expect(result.current.changeTimeZone(date, timeZone).toLocaleString("en-US")).toEqual("8/10/2022, 2:10:20 AM");
});

test("Get timezone shot name of a date for a default time zone", () => {
    const { result } = renderHook(useFormatDateTime, {
        initialProps: "Europe/Berlin",
    });

    const date = new Date("2022-08-09T18:46:31.901Z");
    expect(result.current.formatTimeZoneShortName(date)).toEqual("GMT+2");
});

test("Get timezone shot name of a date for a specific time zone", () => {
    const { result } = renderHook(useFormatDateTime, {
        initialProps: "Europe/Berlin",
    });

    const timeZone = "Asia/Singapore";

    const date = new Date("2022-08-09T18:46:31.901Z");
    expect(result.current.formatTimeZoneShortName(date, timeZone)).toEqual("GMT+8");
});
