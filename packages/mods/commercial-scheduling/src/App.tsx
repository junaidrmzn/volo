import { QueryClientProvider } from "@voloiq/commercial-scheduling-components";
import { Navigate, Outlet, Route, Routes } from "@voloiq/routing";
import { ServiceProvider } from "@voloiq/service";
import { ConnectionOverview } from "./features/connection/ConnectionOverview";
import { PlanOverview } from "./features/plan/PlanOverview";
import { PlanDetail } from "./features/plan/detail/PlanDetail";
import { PromotionItem } from "./features/promotion-item/PromotionItem";
import { Promotion } from "./features/promotion/Promotion";

export const App = () => {
    const commercialLoggingOptions = {
        teamName: "commercialScheduling",
        serviceName: "commercialScheduleFrontend",
    };
    return (
        <QueryClientProvider>
            <ServiceProvider baseUrl={`${BACKEND_BASE_URL}`} logging={commercialLoggingOptions} withAuth>
                <Routes>
                    <Route path="plan" element={<Outlet />}>
                        <Route index element={<Navigate to="overview" />} />
                        <Route path="overview/*" element={<PlanOverview />} />
                        <Route path="overview/:planId" element={<PlanDetail />} />
                    </Route>
                    <Route path="promotion" element={<Outlet />}>
                        <Route index element={<Navigate to="overview" />} />
                        <Route path="overview/*" element={<Promotion />} />
                        <Route path="overview/:promotionId" element={<PromotionItem />} />
                    </Route>
                    <Route path="connection" element={<Outlet />}>
                        <Route index element={<Navigate to="overview" />} />
                        <Route path="overview/*" element={<ConnectionOverview />} />
                    </Route>
                    <Route path="*" element={<Navigate to="plan" replace />} />
                </Routes>
            </ServiceProvider>
        </QueryClientProvider>
    );
};
