import { Route, Routes } from "@voloiq/routing";
import { Monitoring } from "./components";

export const App = () => {
    return (
        <Routes>
            <Route index element={<Monitoring />} />
        </Routes>
    );
};
