import type { Meta, StoryFn } from "@storybook/react";
import { Box, VStack } from "@volocopter/design-library-react";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import type { DateTimeInputProps } from "./DateTimeInput";
import { DateTimeInput } from "./DateTimeInput";
import { DateTimeInputLocaleProvider } from "./DateTimeInputLocaleContext";

const meta: Meta = {
    title: "Date Time Input/Date Time Input",
    component: DateTimeInput,
    decorators: [
        (story: Function) => (
            <Box maxW="560px" mx="auto" mt="40px">
                {story()}
            </Box>
        ),
    ],
};

export default meta;

type LanguageSwitchProps = {
    title: string;
    selectedOption: string;
    setSelectedOptions: Dispatch<SetStateAction<string>>;
};

const LanguageSwitch = (props: LanguageSwitchProps) => {
    const { title, selectedOption, setSelectedOptions } = props;
    return (
        <select onChange={(event) => setSelectedOptions(event.target.value)} value={selectedOption} title={title}>
            <option value="en">English</option>
            <option value="de">Deutsch</option>
        </select>
    );
};

export const Basic: StoryFn<DateTimeInputProps> = (props) => {
    const [selectedOption, setSelectedOptions] = useState("en");

    return (
        <VStack>
            <LanguageSwitch
                selectedOption={selectedOption}
                setSelectedOptions={setSelectedOptions}
                title="Language Switch Example"
            />
            <DateTimeInputLocaleProvider currentLanguage={selectedOption}>
                <DateTimeInput
                    placeholder="This input has variant outline"
                    variant="outline"
                    key="outline"
                    {...props}
                />
            </DateTimeInputLocaleProvider>
        </VStack>
    );
};
