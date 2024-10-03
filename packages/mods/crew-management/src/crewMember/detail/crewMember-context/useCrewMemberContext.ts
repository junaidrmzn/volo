import { useContext } from "react";
import { CrewMemberContext } from "./CrewMemberContext";

export const useCrewMemberContext = () => {
    const logContext = useContext(CrewMemberContext);

    if (!logContext) {
        throw new Error("useCrewMemberContext must be used within CrewMemberContext.Provider");
    }

    return logContext;
};
