import { BaseResource } from "../state-machine/BaseResource";
import { BulkEditModal, ResourceBulkEditProps } from "./BulkEditModal";

export const ResourceBulkEdit = <Resource extends BaseResource>(props: ResourceBulkEditProps<Resource>) => {
    return <BulkEditModal {...props} />;
};
