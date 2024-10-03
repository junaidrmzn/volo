import { useMutation, useQueryClient } from "react-query";
import { SaveSelectedCsflSites } from "./models";
import { useSaveCsflSites } from "./useSaveCsflSites";

type UseSaveCsflSitesOptions = {
    routeOptionId: string | number;
    routeId: string | number;
};

export const useSaveCsflSitesQuery = (options: UseSaveCsflSitesOptions) => {
    const { routeOptionId, routeId } = options;

    const queryClient = useQueryClient();
    const mutationKey = ["routes", { routeId }, "save-selected-csfl-sites"];

    const { sendRequest } = useSaveCsflSites({ routeId });

    const mutation = useMutation(
        mutationKey,
        (selectedCsflSites: SaveSelectedCsflSites) => sendRequest({ data: selectedCsflSites }),
        {
            onMutate: (body) => body,
            onSettled: async () => {
                await queryClient.invalidateQueries(["routes", { routeId }]);
                if (routeOptionId) await queryClient.invalidateQueries(["routeOptions", { routeOptionId }, "routes"]);
            },
        }
    );
    return {
        ...mutation,
        saveSelectedCsflSites: mutation.mutate,
    };
};
