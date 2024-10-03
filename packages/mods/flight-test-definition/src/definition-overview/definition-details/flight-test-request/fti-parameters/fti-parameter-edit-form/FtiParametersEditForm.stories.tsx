import type { Meta, StoryFn } from "@storybook/react";
import { Box } from "@volocopter/design-library-react";
import { I18nProvider } from "@voloiq/i18n";
import { anyFtiParameter } from "./FtiParameterCard.stories";
import type { FtiParametersEditFormProps } from "./FtiParametersEditForm";
import { FtiParametersEditForm } from "./FtiParametersEditForm";

const meta: Meta = {
    title: "Flight Test Definition/FTI Parameters Edit Form",
    component: FtiParametersEditForm,
    parameters: {
        actions: { argTypesRegex: "^on.*" },
    },
    args: {
        allFtiParameters: Array.from({ length: 10 }).map(() => anyFtiParameter()),
        selectedFtiParameters: Array.from({ length: 10 }).map(() => anyFtiParameter()),
    },
    decorators: [
        (Story) => (
            <I18nProvider>
                <Box boxSize="full" background="white">
                    <Story />
                </Box>
            </I18nProvider>
        ),
    ],
};
export default meta;

export const Basic: StoryFn<FtiParametersEditFormProps> = (props) => <FtiParametersEditForm {...props} />;
