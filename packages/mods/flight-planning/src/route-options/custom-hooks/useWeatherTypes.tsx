import { useState } from "react";
import { WeatherTypes } from "@voloiq/flight-planning-api/v1";

export const useWeatherTypes = () => {
    const [scenario, setScenario] = useState<WeatherTypes>();
    return { scenario, setScenario };
};
