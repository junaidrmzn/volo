import { FormControl, FormLabel, Select } from "@volocopter/design-library-react";

type AltitudeReferenceSelectFieldProps = {
    setIsRefAltitudeSelected: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AltitudeReferenceSelectField = (props: AltitudeReferenceSelectFieldProps) => {
    const { setIsRefAltitudeSelected } = props;
    return (
        <FormControl>
            <FormLabel>Altitude Reference:</FormLabel>
            <Select
                options={[
                    {
                        label: "AMSL",
                        value: "AMSL",
                    },
                    {
                        label: "AGL",
                        value: "AGL",
                    },
                ]}
                defaultValue={{
                    label: "AMSL",
                    value: "AMSL",
                }}
                onChange={(newValue) => setIsRefAltitudeSelected(newValue?.value === "AGL")}
            />
        </FormControl>
    );
};
