import React from "react";
import type { CrewMemberContextState } from "./CrewMemberContext";
import { CrewMemberContext } from "./CrewMemberContext";

type CrewMemberContextProviderProps = {
    value: CrewMemberContextState;
};

export const CrewMemberContextProvider: FCC<CrewMemberContextProviderProps> = (props) => {
    const { children, value } = props;

    return <CrewMemberContext.Provider value={value}>{children}</CrewMemberContext.Provider>;
};
