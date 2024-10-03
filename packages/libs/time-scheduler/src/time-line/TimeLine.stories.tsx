import type { Meta, StoryFn } from "@storybook/react";
import { match } from "ts-pattern";
import { add } from "../time-utils/add";
import type { TimeUnit } from "../time-utils/timeUnit";
import { TimeLine } from "./TimeLine";

const meta: Meta = {
    title: "Time Scheduler/Time Line",
    component: TimeLine,
};
export default meta;

const TimeLineStory = (props: { timeUnit: TimeUnit }) => {
    const { timeUnit } = props;
    const startDate = new Date("2022-04-10");
    const endDate = add(startDate, { [timeUnit]: 150 });
    const sizeOfOneMinuteInPx = match(timeUnit)
        .with("minutes", () => 50)
        .with("quarterHours", () => 50 / 15)
        .with("hours", () => 50 / 60)
        .with("days", () => 50 / 60 / 24)
        .with("months", () => 100 / 60 / 24 / 30)
        .exhaustive();
    return (
        <TimeLine
            timeUnit={timeUnit}
            startDate={startDate}
            endDate={endDate}
            sizeOfOneMinuteInPx={sizeOfOneMinuteInPx}
        />
    );
};

export const Minutes: StoryFn = () => <TimeLineStory timeUnit="minutes" />;
export const QuarterHours: StoryFn = () => <TimeLineStory timeUnit="quarterHours" />;
export const Hours: StoryFn = () => <TimeLineStory timeUnit="hours" />;
export const Days: StoryFn = () => <TimeLineStory timeUnit="days" />;
export const Months: StoryFn = () => <TimeLineStory timeUnit="months" />;
