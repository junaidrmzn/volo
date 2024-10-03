import type { Meta } from "@storybook/react";
import { Box } from "@volocopter/design-library-react";
import { AppShell } from "@voloiq/app-shell";
import { authConfigurationStub } from "@voloiq/auth";
import { VoloIqNavigationBar } from "./VoloIqNavigationBar";

const meta: Meta = {
    title: "VoloIQ/Navigation Bar",
    decorators: [
        (Story) => (
            <AppShell withAuth withI18n withRouter authConfiguration={authConfigurationStub}>
                <Box height="100vh">
                    <Story />
                </Box>
            </AppShell>
        ),
    ],
    parameters: {
        layout: "fullscreen",
    },
};
export default meta;

export const Basic = () => <VoloIqNavigationBar />;
