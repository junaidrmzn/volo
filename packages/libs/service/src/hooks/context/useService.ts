import { useContext } from "react";
import { ServiceContext } from "./ServiceContext";

export const useService = () => {
    const service = useContext(ServiceContext);

    if (service === undefined) {
        throw new Error("Service hooks must be used within ServiceProvider");
    }

    return service;
};
