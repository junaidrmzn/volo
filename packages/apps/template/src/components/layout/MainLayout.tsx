import { Outlet } from "@voloiq/routing";

export const MainLayout = () => (
    <>
        <div>div before Outlet is added in MainLayout.tsx</div>
        <Outlet />
        <div>div after Outlet is added in MainLayout.tsx</div>
    </>
);
