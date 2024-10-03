import { WorkOrders } from "../../../work-orders/WorkOrders";

type WorkOrdersTabProps = {
    aircraftId: string;
};

export const WorkOrdersTab = (props: WorkOrdersTabProps) => {
    return <WorkOrders {...props} />;
};
