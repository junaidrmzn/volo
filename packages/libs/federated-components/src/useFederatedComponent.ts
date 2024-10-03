import type { ComponentType } from "react";
import { lazy, useEffect, useState } from "react";
import { loadComponent } from "./loadComponent";
import { useDynamicScript } from "./useDynamicScript";
import { useLogBuildVersion } from "./useLogBuildVersion";

export type UseFederatedComponentOptions = {
    baseUrl: string;
    module: string;
    scope: string;
    componentPath: string;
    componentName: string;
};

// This hook is inspired by the dynamic-remotes example in the module-federation repository
// https://github.com/module-federation/module-federation-examples/blob/master/advanced-api/dynamic-remotes/app1/src/App.js
export const useFederatedComponent = (options: UseFederatedComponentOptions) => {
    const { baseUrl, module, scope, componentPath, componentName } = options;
    const key = `${baseUrl}-${module}-${scope}-${componentPath}`;
    const [FederatedComponent, setFederatedComponent] = useState<ComponentType | null>(null);
    const { ready, errorLoading } = useDynamicScript(`${baseUrl}/${module}/remoteEntry.js`);
    useLogBuildVersion({ module });

    useEffect(() => {
        if (FederatedComponent) {
            setFederatedComponent(null);
        }
        // This must only be updated if the key changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    useEffect(() => {
        if (ready && !FederatedComponent) {
            const LazyLoadedFederatedComponent = lazy(loadComponent({ scope, componentPath, componentName }));
            setFederatedComponent(LazyLoadedFederatedComponent);
        }
    }, [FederatedComponent, ready, scope, componentPath, componentName]);

    return { errorLoading, FederatedComponent };
};
