import { Header, HeaderLayout, SideMenuLayout, useDisclosure } from "@volocopter/design-library-react";
import type { Resource } from "@voloiq/auth";
import type { AxiosPromise, Error, ServiceState } from "@voloiq/service";
import { useIdSelectionContext } from "../../hooks";
import { ServiceStateBoundary } from "../ServiceStateBoundary";
import { OverviewDeleteModal } from "./OverviewDeleteModal";
import type { OverviewHeaderControlProps } from "./OverviewHeaderControl";
import { OverviewHeaderControl } from "./OverviewHeaderControl";

export type OverviewLayoutPageContentProps = {
    heading: string;
    subheading: string;
    state: ServiceState;
    error?: Error;
    onDelete?(id: string | number): AxiosPromise;
    refetch: () => void;
    deleteModalType: number;
    entityName: Resource;
    entityId?: string;
    handleStatusNotification?: boolean;
    isSortingEnabled?: boolean;
    isFilteringEnabled?: boolean;
} & OverviewHeaderControlProps;

export const OverviewLayoutPageContent: FCC<OverviewLayoutPageContentProps> = (props) => {
    const {
        heading,
        subheading,
        state,
        error,
        children,
        onDelete,
        refetch,
        deleteModalType,
        entityName,
        entityId,
        handleStatusNotification,
        isSortingEnabled = false,
        isFilteringEnabled = false,
    } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { selectedId } = useIdSelectionContext();

    return (
        <SideMenuLayout.Content>
            <HeaderLayout>
                <HeaderLayout.Header>
                    <Header.Title parentTitle={heading} title={subheading} />
                    <Header.Controls>
                        <OverviewHeaderControl
                            hideDeleteButton={!onDelete}
                            onDelete={onOpen}
                            resourceName={entityName}
                            isSortingEnabled={isSortingEnabled}
                            isFilteringEnabled={isFilteringEnabled}
                        />
                    </Header.Controls>
                </HeaderLayout.Header>
                <HeaderLayout.Content>
                    <ServiceStateBoundary state={state} error={error}>
                        {children}
                    </ServiceStateBoundary>
                    {onDelete && (
                        <OverviewDeleteModal
                            id={selectedId || "-1"}
                            deleteFunction={onDelete}
                            entityName={entityName}
                            entityId={entityId}
                            handleStatusNotification={handleStatusNotification}
                            onClose={onClose}
                            isOpen={isOpen}
                            refetch={refetch}
                            type={deleteModalType}
                        />
                    )}
                </HeaderLayout.Content>
            </HeaderLayout>
        </SideMenuLayout.Content>
    );
};
