import { DateRangePickerLocaleProvider } from "@voloiq/date-time-input";
import { createCompoundComponent } from "@voloiq/utils";
import type { TimeSchedulerWithoutProvidersProps } from "./TimeSchedulerWithoutProviders";
import { TimeSchedulerWithoutProviders } from "./TimeSchedulerWithoutProviders";
import { SchedulerRowHeightProvider } from "./scheduler-row-height/SchedulerRowHeightProvider";
import { ScrollProvider } from "./scroll/context/ScrollProvider";
import type { TimeSchedulerConfigContextType } from "./time-scheduler-config/TimeSchedulerConfigContext";
import { TimeSchedulerConfigProvider } from "./time-scheduler-config/TimeSchedulerConfigProvider";
import { TimeSchedulerStateProvider } from "./time-scheduler-state/TimeSchedulerStateProvider";
import type { TranslationsProviderProps } from "./translations/TranslationsProvider";
import { TranslationsProvider } from "./translations/TranslationsProvider";
import { UseZoomUpdateProps } from "./zoom/useZoomUpdate";

export const { CompoundComponent: TimeSchedulerRow, getCompoundComponent: getTimeSchedulerRows } =
    createCompoundComponent();

export type TimeSchedulerTranslations = TranslationsProviderProps["translations"];
export type TimeSchedulerProps = Pick<TimeSchedulerWithoutProvidersProps, "onRangeUpdate"> &
    Pick<UseZoomUpdateProps, "OnZoomUpdate"> &
    TranslationsProviderProps & {
        config: TimeSchedulerConfigContextType;
        timelineStartDate?: Date;
    };
export const TimeScheduler: FCC<TimeSchedulerProps> = (props) => {
    const { children, onRangeUpdate, translations, config, timelineStartDate, OnZoomUpdate } = props;
    const timeSchedulerRows = getTimeSchedulerRows(children);
    return (
        <TranslationsProvider translations={translations}>
            <DateRangePickerLocaleProvider>
                <TimeSchedulerConfigProvider {...config}>
                    <TimeSchedulerStateProvider>
                        <SchedulerRowHeightProvider>
                            <ScrollProvider>
                                <TimeSchedulerWithoutProviders
                                    timelineStartDate={timelineStartDate}
                                    onRangeUpdate={onRangeUpdate}
                                    OnZoomUpdate={OnZoomUpdate}
                                    timeSchedulerRows={timeSchedulerRows}
                                />
                            </ScrollProvider>
                        </SchedulerRowHeightProvider>
                    </TimeSchedulerStateProvider>
                </TimeSchedulerConfigProvider>
            </DateRangePickerLocaleProvider>
        </TranslationsProvider>
    );
};
