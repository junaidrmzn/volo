import { Navigate, Outlet, Route } from "@voloiq/routing";
import { TabNavigation } from "./TabNavigation";

type Options = {
    modulePath: string;
    moduleLabel: string;
    indexRoute?: string;
    pages: {
        path: string;
        label: string;
        element: JSX.Element;
    }[];
};
export const renderModuleRoutes = (options: Options) => {
    const { moduleLabel, modulePath, pages, indexRoute } = options;

    return (
        <Route
            path={modulePath}
            element={
                <TabNavigation
                    label={moduleLabel}
                    tabs={pages.map((page) => ({
                        label: page.label,
                        path: page.path,
                    }))}
                >
                    <Outlet />
                </TabNavigation>
            }
        >
            {indexRoute && <Route index element={<Navigate to={indexRoute} />} />}
            {pages.map((page) => (
                <Route path={`${page.path}/*`} element={page.element} key={page.path} />
            ))}
        </Route>
    );
};
