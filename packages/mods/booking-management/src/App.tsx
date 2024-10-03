import { QueryClientProvider } from "@voloiq/booking-management-components";
import { Navigate, Outlet, Route, Routes } from "@voloiq/routing";
import { ServiceProvider } from "@voloiq/service";
import { BookingOverview } from "./booking/BookingOverview";

export const App = () => {
    const commercialLoggingOptions = {
        teamName: "commercialScheduling",
        serviceName: "bookingManagementFrontend",
    };

    return (
        <QueryClientProvider>
            <ServiceProvider baseUrl={`${BACKEND_BASE_URL}`} logging={commercialLoggingOptions} withAuth>
                <Routes>
                    <Route path="booking" element={<Outlet />}>
                        <Route index element={<Navigate to="overview" />} />
                        <Route path="overview/*" element={<BookingOverview />} />
                    </Route>
                    <Route path="*" element={<Navigate to="booking" replace />} />
                </Routes>
            </ServiceProvider>
        </QueryClientProvider>
    );
};
