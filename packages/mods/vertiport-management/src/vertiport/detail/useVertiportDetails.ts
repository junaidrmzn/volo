import { useGetVertiport } from "../../api-hooks/useVertiportService";

export const useVertiportDetails = (vertiportId: string) => {
    const { data: vertiport, state: vertiportGetState } = useGetVertiport(vertiportId);

    const vertiportInitialValues = {
        ...vertiport,
        validFrom: vertiport?.validFrom ? new Date(vertiport?.validFrom) : undefined,
        validTo: vertiport?.validTo ? new Date(vertiport?.validTo) : undefined,
        publicFrom: vertiport?.publicFrom ? new Date(vertiport?.publicFrom) : undefined,
        publicTo: vertiport?.publicTo ? new Date(vertiport?.publicTo) : undefined,
        iataCode: vertiport?.iataCode || undefined,
        icaoCode: vertiport?.icaoCode ? vertiport?.icaoCode : undefined,
        code: vertiport?.code,
        shortName: vertiport?.shortName ?? undefined,
        longitude: vertiport?.location.longitude ?? undefined,
        latitude: vertiport?.location.latitude ?? undefined,
        regionId: vertiport?.region.id ? { label: vertiport?.region.name, value: vertiport?.region.id } : undefined,
        fatos: vertiport?.operation?.fatos ?? undefined,
        stands: vertiport?.operation?.stands ?? undefined,
        preBatterySwap: vertiport?.operation?.MinGroundTimePre?.batterySwap
            ? Number.parseFloat((vertiport?.operation?.MinGroundTimePre?.batterySwap / 60).toFixed(2))
            : undefined,
        prePassengerHandling: vertiport?.operation?.MinGroundTimePre?.passengerHandling
            ? Number.parseFloat((vertiport?.operation?.MinGroundTimePre?.passengerHandling / 60).toFixed(2))
            : undefined,
        prePilotBriefing: vertiport?.operation?.MinGroundTimePre?.pilotBriefing
            ? Number.parseFloat((vertiport?.operation?.MinGroundTimePre?.pilotBriefing / 60).toFixed(2))
            : undefined,
        preVtolHandling: vertiport?.operation?.MinGroundTimePre?.vtolHandling
            ? Number.parseFloat((vertiport?.operation?.MinGroundTimePre?.vtolHandling / 60).toFixed(2))
            : undefined,
        postBatterySwap: vertiport?.operation?.MinGroundTimePost?.batterySwap
            ? Number.parseFloat((vertiport?.operation?.MinGroundTimePost?.batterySwap / 60).toFixed(2))
            : undefined,
        postPassengerHandling: vertiport?.operation?.MinGroundTimePost?.passengerHandling
            ? Number.parseFloat((vertiport?.operation?.MinGroundTimePost?.passengerHandling / 60).toFixed(2))
            : undefined,
        postPilotBriefing: vertiport?.operation?.MinGroundTimePost?.pilotBriefing
            ? Number.parseFloat((vertiport?.operation?.MinGroundTimePost?.pilotBriefing / 60).toFixed(2))
            : undefined,
        postVtolHandling: vertiport?.operation?.MinGroundTimePost?.vtolHandling
            ? Number.parseFloat((vertiport?.operation?.MinGroundTimePost?.vtolHandling / 60).toFixed(2))
            : undefined,
        fatoBlockingTimePre: vertiport?.operation?.fatoBlockingTimePre
            ? Number.parseFloat((vertiport?.operation?.fatoBlockingTimePre / 60).toFixed(2))
            : undefined,
        fatoBlockingTimePost: vertiport?.operation?.fatoBlockingTimePost
            ? Number.parseFloat((vertiport?.operation?.fatoBlockingTimePost / 60).toFixed(2))
            : undefined,
        additionalFiles: vertiport?.operation?.additionalFiles?.map((file) => ({ label: file.key, value: file.url })),
        serviceHours: "",
        country: vertiport?.address?.country ?? undefined,
        state: vertiport?.address?.state ?? undefined,
        city: vertiport?.address?.city ?? undefined,
        zipCode: vertiport?.address?.zipCode ?? undefined,
        addressLine1: vertiport?.address?.addressLine1 ?? undefined,
        addressLine2: vertiport?.address?.addressLine2 ?? undefined,
        names: vertiport?.names?.map((name) => ({ label: name.key, value: name.value })),
        images: vertiport?.images?.map((image) => ({ label: image.key, value: image.value })),
        services: vertiport?.services?.map((vertiportService) => ({
            label: vertiportService.serviceKey,
            value: vertiportService.serviceKey,
        })),
    };

    return { vertiport, vertiportInitialValues, vertiportGetState };
};
