import { Header, HeaderLayout, SideMenuLayout } from "@volocopter/design-library-react";

export type OverviewContentLayoutProps = {
    heading: string;
    subtitle: string;
    state: "idle" | "loading" | "error" | "success";
};

export const OverviewContentLayout: FCC<OverviewContentLayoutProps> = (props) => {
    const { children, heading, subtitle } = props;
    return (
        <SideMenuLayout.Content>
            <HeaderLayout>
                <HeaderLayout.Header>
                    <Header.Title parentTitle={heading} title={subtitle} />
                </HeaderLayout.Header>
                <HeaderLayout.Content>{children}</HeaderLayout.Content>
            </HeaderLayout>
        </SideMenuLayout.Content>
    );
};
