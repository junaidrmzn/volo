import type { Vertiport } from "@voloiq-typescript-api/vertiport-management-types";
import type { SelectOption } from "@voloiq/form";
import { useGetAllService } from "@voloiq/service";

export type VertiportInMissionCreation = Pick<Vertiport, "id" | "code" | "name" | "iataCode" | "icaoCode">;

export const useVertiportOptions = () => {
    const { data: vertiports } = useGetAllService<Vertiport>({
        route: "/v1/network-scheduling-management/vertiports",
    });

    const getVertiportLabel = (vertiport: Vertiport) => {
        return `${vertiport.name}${vertiport.iataCode ? `, ${vertiport.iataCode}` : ""}${
            vertiport.icaoCode ? `, ${vertiport.icaoCode}` : ""
        }, ${vertiport.code}`;
    };

    const vertiportOptions = (vertiportId?: string) => {
        if (vertiportId) {
            const filteredVertiport = vertiports.find((vertiport) => vertiport.id === vertiportId);
            return vertiports
                .filter((vertiport) => {
                    // VAO-2497 we do have some corrupted data on alpha and need to be able to select vertiports for a demo, so there's this weird null check for regions for now
                    return (
                        vertiport.region !== null &&
                        filteredVertiport?.region !== null &&
                        vertiport.region.id === filteredVertiport?.region.id
                    );
                })
                .map<SelectOption>((vertiport) => ({
                    value: vertiport.id,
                    label: getVertiportLabel(vertiport),
                }));
        }
        const vertiport = vertiports
            .filter((vertiport) => vertiport.code)
            .map<SelectOption>((vertiport) => ({
                value: vertiport.id,
                label: getVertiportLabel(vertiport),
            }));
        return vertiport;
    };

    return { vertiportOptions };
};
