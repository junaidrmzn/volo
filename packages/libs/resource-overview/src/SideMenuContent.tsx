import { Header, HeaderLayout } from "@volocopter/design-library-react";
import { ReactNode } from "react";
import { ListActionButtons } from "./ListActionButtons";
import { ListContent } from "./ListContent";
import { useGlobalState } from "./global-state/useGlobalState";
import { extractListActionButtons } from "./list-action-buttons/extractListActionButtons";
import { ListLayout } from "./list-layout/ListLayout";

export type SideMenuContentProps = {
    children: ReactNode;
    withOldFilter?: boolean;
};

export const SideMenuContent = (props: SideMenuContentProps) => {
    const { withOldFilter = false, children } = props;

    const [state] = useGlobalState();
    const {
        meta: {
            list: { getListTitle, getModuleTitle, getListTitleTag, getListDescription, usesNewNavigationConcept },
        },
    } = state;
    const listActionButtons = extractListActionButtons({
        children,
    });

    return usesNewNavigationConcept ? (
        <ListLayout title={getListTitle()} description={getListDescription?.()}>
            <ListLayout.ActionButtons>
                <ListActionButtons listActionButtons={listActionButtons} withOldFilter={withOldFilter} />
            </ListLayout.ActionButtons>
            <ListLayout.Body>
                <ListContent withOldFilter={withOldFilter}>{children}</ListContent>
            </ListLayout.Body>
        </ListLayout>
    ) : (
        <HeaderLayout>
            <HeaderLayout.Header>
                <Header.Title parentTitle={getModuleTitle?.()} title={getListTitle()} tag={getListTitleTag?.()} />
                <Header.Controls>
                    <ListActionButtons listActionButtons={listActionButtons} withOldFilter={withOldFilter} />
                </Header.Controls>
            </HeaderLayout.Header>
            <HeaderLayout.Content height="full">
                <ListContent withOldFilter={withOldFilter}>{children}</ListContent>
            </HeaderLayout.Content>
        </HeaderLayout>
    );
};
