import { Story } from "@storybook/react";
import React from "react";
import { DateTimeInputLocaleProvider } from "@voloiq/date-time-input";
import { I18nProvider } from "@voloiq/i18n";

export const withDateTimeInputLocale = (Story: Story) => (
    <I18nProvider>
        <DateTimeInputLocaleProvider>
            <Story />
        </DateTimeInputLocaleProvider>
    </I18nProvider>
);
