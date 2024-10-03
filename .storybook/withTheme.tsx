import { useColorMode } from "@chakra-ui/react";
import { Story, StoryContext } from "@storybook/react";
import { dateTimeInputStyles } from "@volocopter/date-time-input-react";
import { ThemeProvider } from "@volocopter/design-library-react";
import { filterStyles } from "@volocopter/filter-react";
import { truncatedListStyles } from "@volocopter/truncated-list-react";
import { useEffect } from "react";

type ColorModeWrapperProps = {
    colorMode?: "light" | "dark";
};
const ColorModeWrapper: FCC<ColorModeWrapperProps> = (props) => {
    const { colorMode, children } = props;
    const { setColorMode } = useColorMode();
    useEffect(() => setColorMode(colorMode ? colorMode : "light"), [colorMode]);
    return <>{children}</>;
};

export const withTheme = (Story: Story, context: StoryContext) => (
    <ThemeProvider overrides={[dateTimeInputStyles, truncatedListStyles, filterStyles]}>
        <ColorModeWrapper colorMode={context.globals.colorMode}>
            <Story />
        </ColorModeWrapper>
    </ThemeProvider>
);
