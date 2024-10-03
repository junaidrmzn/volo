export type WeatherSymbol =
    | "CLEAR_SKY"
    | "LIGHT_CLOUDS"
    | "CLOUDY"
    | "LIGHT_FOG"
    | "DENSE_FOG"
    | "PARTLY_CLOUDY"
    | "RAINY"
    | "RAINY_AND_SNOWY_SLEET"
    | "PARTIAL_RAIN_SHOWER"
    | "PARTIAL_SNOW_SHOWER"
    | "PARTIAL_SLEET_SHOWER"
    | "SNOWY"
    | "SAND_STORM"
    | "THUNDERSTORM"
    | "DRIZZLE"
    | "FREEZING_RAIN"
    | "UNKNOWN";

export type WeatherSeverity = "GOOD" | "WARNING" | "ALERT" | "UNKNOWN";

export type Weather = {
    /** Date Time of weather forecast. */
    weatherForecastDate: string;
    weatherSymbol: WeatherSymbol;
    /** Visibility in meters. */
    visibilityM: number;
    /** Date Time of sunrise. */
    sunriseDateTime: string;
    /** Date Time of sunset. */
    sunsetDateTime: string;
    /** Cloud base above ground level in meters. */
    cloudBaseAglM: number;
    /** Ceiling height above ground level in meters. */
    ceilingHeightAglM: number;
    /** Temperature at 2 meters in celsius. */
    temperature2mC: number;
    /** Temperature at 100 meters in celsius. */
    temperature100mC: number;
    /** Temperature at 250 meters in celsius. */
    temperature250mC: number;
    /** Dew point at 2 meters in celsius. */
    dewPoint2mC: number;
    /** Dew point at 100 meters in celsius. */
    dewPoint100mC: number;
    /** Dew point at 250 meters in celsius. */
    dewPoint250mC: number;
    /** Wind speed at 10 m in knots. */
    windSpeed10mKn: number;
    /** Wind speed at 100 m in knots. */
    windSpeed100mKn: number;
    /** Wind speed at 250 m in knots. */
    windSpeed250mKn: number;
    /** Wind direction at 10 m in degrees. */
    windDirection10mDeg: number;
    /** Wind direction at 100 m in degrees. */
    windDirection100mDeg: number;
    /** Wind direction at 250 m in degrees. */
    windDirection250mDeg: number;
    /** Wind gusts at 10 m during 1 hour in knots. */
    windGusts10m1hKn: number;
    /** Wind gusts at 100 m during 1 hour in knots. */
    windGusts100m1hKn: number;
    /** Wind gusts at 250 m during 1 hour in knots. */
    windGusts250m1hKn: number;
    /** Relative humidity at 2 meters in percent. */
    relativeHumidity2mP: number;
    /** Precipitation during 1 hour in millimeters. */
    precipitation1hMm: number;
    metar: string;
    weatherSeverity: WeatherSeverity;
};
