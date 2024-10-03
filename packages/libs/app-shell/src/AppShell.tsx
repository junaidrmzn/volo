import { dateTimeInputStyles } from "@volocopter/date-time-input-react";
import { ThemeProvider } from "@volocopter/design-library-react";
import { filterStyles } from "@volocopter/filter-react";
import { stepsStyles } from "@volocopter/steps-react";
import { tagSelectStyles } from "@volocopter/tag-select-react";
import { truncatedListStyles } from "@volocopter/truncated-list-react";
import type { AuthenticationProviderProps, LocalAuthenticationProviderProps } from "@voloiq/auth";
import { AuthenticationProvider, LocalAuthenticationProvider } from "@voloiq/auth";
import { TimeZoneProvider } from "@voloiq/date-time";
import type { FeatureFlagSettings, LocalFeatureFlagsProviderProps } from "@voloiq/feature-flags";
import { FeatureFlagsProvider, LocalFeatureFlagsProvider } from "@voloiq/feature-flags";
import { I18nProvider } from "@voloiq/i18n";
import { NotificationProvider } from "@voloiq/notification-provider";
import { BrowserRouter, ParametersCacheProvider } from "@voloiq/routing";
import { ConditionalWrapper, isProduction } from "@voloiq/utils";
import type { AppShellProps } from "./AppShell.types";
import { DateTimeInputLocaleProvider } from "./DateTimeInputLocaleProvider";

/**
 * Wrapper component providing i18n, routing, theming, feature flags and authorization capabilities.
 */
export const AppShell: FCC<AppShellProps> = (props) => {
    const {
        children,
        localFeatureFlagsConfiguration,
        localAuthorizationConfiguration,
        withAuth = false,
        withFeatureFlags = false,
        withTheme = false,
        withRouter = false,
        withParametersCache = false,
        withI18n = false,
        authConfiguration,
        featureFlagSettings,
        timeZone,
        withNotifications = false,
    } = props;

    return (
        <ConditionalWrapper<Omit<AuthenticationProviderProps, "children">>
            Wrapper={AuthenticationProvider}
            wrapperProps={{ authConfiguration: authConfiguration! }}
            condition={withAuth && isProduction}
        >
            <ConditionalWrapper<Omit<LocalAuthenticationProviderProps, "children">>
                Wrapper={LocalAuthenticationProvider}
                wrapperProps={{ permissions: localAuthorizationConfiguration }}
                condition={withAuth && !isProduction}
            >
                <ConditionalWrapper
                    Wrapper={ThemeProvider}
                    wrapperProps={{
                        overrides: [
                            dateTimeInputStyles,
                            stepsStyles,
                            tagSelectStyles,
                            truncatedListStyles,
                            filterStyles,
                        ],
                    }}
                    condition={withTheme}
                >
                    <ConditionalWrapper Wrapper={BrowserRouter} condition={withRouter}>
                        <ConditionalWrapper Wrapper={NotificationProvider} condition={withNotifications}>
                            <ConditionalWrapper Wrapper={ParametersCacheProvider} condition={withParametersCache}>
                                <ConditionalWrapper Wrapper={I18nProvider} condition={withI18n}>
                                    <ConditionalWrapper Wrapper={DateTimeInputLocaleProvider} condition={withI18n}>
                                        <ConditionalWrapper<FeatureFlagSettings>
                                            Wrapper={FeatureFlagsProvider}
                                            wrapperProps={featureFlagSettings}
                                            condition={withFeatureFlags && isProduction}
                                        >
                                            <ConditionalWrapper<Omit<LocalFeatureFlagsProviderProps, "children">>
                                                Wrapper={LocalFeatureFlagsProvider}
                                                wrapperProps={{
                                                    configurationOverride: localFeatureFlagsConfiguration,
                                                }}
                                                condition={withFeatureFlags && !isProduction}
                                            >
                                                <TimeZoneProvider timeZone={timeZone}>{children}</TimeZoneProvider>
                                            </ConditionalWrapper>
                                        </ConditionalWrapper>
                                    </ConditionalWrapper>
                                </ConditionalWrapper>
                            </ConditionalWrapper>
                        </ConditionalWrapper>
                    </ConditionalWrapper>
                </ConditionalWrapper>
            </ConditionalWrapper>
        </ConditionalWrapper>
    );
};
