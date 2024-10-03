import { useLocation } from "@voloiq/routing";

export const useIsMenuEntryActive = () => {
    const { pathname } = useLocation();
    const isActive = (to: string) => new RegExp(`${to}(/|$)`).test(pathname);

    return { isActive };
};
