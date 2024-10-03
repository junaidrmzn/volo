import { stringify } from "qs";
import { useCallback } from "react";

export const paramsSerializer = (params: object) => stringify(params);

export const useParamsSerializer = () => useCallback(paramsSerializer, []);
