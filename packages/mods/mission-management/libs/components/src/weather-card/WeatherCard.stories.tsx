import type { Meta, StoryFn } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import type { WeatherCardProps } from "./WeatherCard";
import { WeatherCard } from "./WeatherCard";

const meta: Meta = {
    title: "Network Scheduling/Components/Weather Card",
    component: WeatherCard,
    parameters: { actions: { argTypesRegex: "^on.*" } },
    args: {},
    decorators: [
        (Story) => (
            <I18nProvider>
                <Story />
            </I18nProvider>
        ),
    ],
};
export default meta;

export const TakeOff: StoryFn<WeatherCardProps> = (props) => <WeatherCard {...props} />;
TakeOff.args = {
    estimatedDateTime: "2022-11-06T17:39:41.000Z",
    vertiportCode: "XVE",
    weatherInfoType: "take-off",
    weather: {
        weatherForecastDate: "2022-11-06T17:39:41.000Z",
        weatherSymbol: "CLOUDY",
        visibilityM: 12,
        sunriseDateTime: "2022-11-06T05:39:41.000Z",
        sunsetDateTime: "2022-11-06T17:39:41.000Z",
        cloudBaseAglM: 10,
        ceilingHeightAglM: 32,
        temperature2mC: 20,
        temperature100mC: 25,
        temperature250mC: 30,
        dewPoint2mC: 30,
        dewPoint100mC: 3,
        dewPoint250mC: 10,
        windSpeed10mKn: 30,
        windSpeed100mKn: 10,
        windSpeed250mKn: 3,
        windDirection10mDeg: 23,
        windDirection100mDeg: 30,
        windDirection250mDeg: 20,
        windGusts10m1hKn: 30,
        windGusts100m1hKn: 40,
        windGusts250m1hKn: 30,
        relativeHumidity2mP: 10,
        precipitation1hMm: 20,
        metar: "20",
        weatherSeverity: "GOOD",
    },
};

export const InFlight: StoryFn<WeatherCardProps> = (props) => <WeatherCard {...props} />;
InFlight.args = {
    weatherInfoType: "in-flight",
    weather: {
        weatherForecastDate: "2022-11-06T17:39:41.000Z",
        weatherSymbol: "CLOUDY",
        visibilityM: 12,
        sunriseDateTime: "2022-11-06T05:39:41.000Z",
        sunsetDateTime: "2022-11-06T17:39:41.000Z",
        cloudBaseAglM: 10,
        ceilingHeightAglM: 32,
        temperature2mC: 20,
        temperature100mC: 25,
        temperature250mC: 30,
        dewPoint2mC: 30,
        dewPoint100mC: 3,
        dewPoint250mC: 10,
        windSpeed10mKn: 30,
        windSpeed100mKn: 10,
        windSpeed250mKn: 3,
        windDirection10mDeg: 23,
        windDirection100mDeg: 30,
        windDirection250mDeg: 20,
        windGusts10m1hKn: 30,
        windGusts100m1hKn: 40,
        windGusts250m1hKn: 30,
        relativeHumidity2mP: 10,
        precipitation1hMm: 20,
        metar: "20",
        weatherSeverity: "ALERT",
    },
};

export const Landing: StoryFn<WeatherCardProps> = (props) => <WeatherCard {...props} />;
Landing.args = {
    estimatedDateTime: "2022-11-06T18:00:41.000Z",
    vertiportCode: "XVE",
    weatherInfoType: "landing",
    weather: {
        weatherForecastDate: "2022-11-06T17:39:41.000Z",
        weatherSymbol: "CLOUDY",
        visibilityM: 12,
        sunriseDateTime: "2022-11-06T05:39:41.000Z",
        sunsetDateTime: "2022-11-06T17:39:41.000Z",
        cloudBaseAglM: 10,
        ceilingHeightAglM: 32,
        temperature2mC: 20,
        temperature100mC: 25,
        temperature250mC: 30,
        dewPoint2mC: 30,
        dewPoint100mC: 3,
        dewPoint250mC: 10,
        windSpeed10mKn: 30,
        windSpeed100mKn: 10,
        windSpeed250mKn: 3,
        windDirection10mDeg: 23,
        windDirection100mDeg: 30,
        windDirection250mDeg: 20,
        windGusts10m1hKn: 30,
        windGusts100m1hKn: 40,
        windGusts250m1hKn: 30,
        relativeHumidity2mP: 10,
        precipitation1hMm: 20,
        metar: "20",
        weatherSeverity: "WARNING",
    },
};
