export type SelectEvent = {
    type: "SELECT";
    selectedResourceId: string;
};

export type UnselectEvent = { type: "UNSELECT" };
