import { useEffect } from "react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { useLocation, useNavigate } from "@voloiq/routing";

export type Redirects = { from: string | RegExp; to: string }[];
export type UseReroutingOptions = {
    redirects: Redirects;
};

export const useRerouting = (options: UseReroutingOptions) => {
    const { redirects } = options;
    const { pathname } = useLocation();
    const navigateTo = useNavigate();
    const { isFeatureFlagEnabled } = useFeatureFlags();

    useEffect(() => {
        for (const redirect of redirects) {
            const { from, to } = redirect;
            const redirectedPathname = pathname.replace(from, to);
            const isRedirectNecessary = redirectedPathname !== pathname;
            if (isRedirectNecessary && isFeatureFlagEnabled("vte-1596")) {
                navigateTo(redirectedPathname, { replace: true });
            }
        }
    }, [pathname, navigateTo, redirects, isFeatureFlagEnabled]);
};
