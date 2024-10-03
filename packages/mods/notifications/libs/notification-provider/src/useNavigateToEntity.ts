import { useNotificationContext } from "./useNotificationContext";

export const useNavigateToEntity = () => {
    const { navigateToEntity, isNavigationPossible } = useNotificationContext();
    return { navigateToEntity, isNavigationPossible };
};
