import { useEffectOnce } from "react-use";

export const useFinalStep = (handleFinalStep: () => void) => {
    useEffectOnce(handleFinalStep);
};
