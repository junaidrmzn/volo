export type SelectEvent<Resource> = {
    type: "SELECT";
    selectedResourceId: string;
    resource?: Resource;
};
