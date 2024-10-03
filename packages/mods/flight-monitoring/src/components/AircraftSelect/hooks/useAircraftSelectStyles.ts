import { useColorModeValue } from "@volocopter/design-library-react";
import type { StylesConfig } from "react-select";

type AircraftSelectOptionType = { value: string | null; label: string };

export const useAircraftSelectStyles = () => {
    // TODO: Move AircraftSelect to DesignLibrary to prevent using design tokens
    const mainColor = useColorModeValue("#00143C", "white");
    const backgroundColor = useColorModeValue("white", "#00143C");
    const selectStyles: StylesConfig<AircraftSelectOptionType> = {
        option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? backgroundColor : mainColor,
            backgroundColor: state.isSelected ? mainColor : backgroundColor,
            padding: 6,
        }),
        control: (provided) => ({
            ...provided,
            backgroundColor,
            borderColor: backgroundColor,
            fontWeight: "bold",
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor,
            border: "0px",
        }),
        singleValue: (provided) => {
            return { ...provided, color: mainColor, backgroundColor };
        },
    };

    return { selectStyles };
};
