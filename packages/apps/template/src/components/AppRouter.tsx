import { Route, Routes } from "@voloiq/routing";
import { Home } from "../pages";
import { MainLayout } from "./layout/MainLayout";

export const AppRouter = () => (
    <Routes>
        <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
        </Route>
    </Routes>
);
