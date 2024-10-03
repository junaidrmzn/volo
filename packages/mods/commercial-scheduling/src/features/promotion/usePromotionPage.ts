import { useNavigate } from "@voloiq/routing";

export const usePromotionPage = () => {
    const navigate = useNavigate();

    const removeQueryParams = () => {
        navigate("");
    };

    return { removeQueryParams };
};
