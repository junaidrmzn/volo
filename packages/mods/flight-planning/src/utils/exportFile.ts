import type { RouteOption } from "@voloiq/flight-planning-api/v1";
import { Route } from "@voloiq/flight-planning-api/v1";

export const exportFile = (
    response: BlobPart,
    routeOrOption: Route | RouteOption,
    mimeType: string,
    fileExtension: string
) => {
    const downloadUrl = window.URL.createObjectURL(new Blob([response], { type: mimeType }));
    const downloadLink = document.createElement("a");
    downloadLink.href = downloadUrl;
    downloadLink.setAttribute("download", `${routeOrOption.name.replace(" ", "_")}${fileExtension}`);
    downloadLink.download = `${routeOrOption.name.replace(" ", "_")}${fileExtension}`;
    downloadLink.type = mimeType;
    document.body.append(downloadLink);
    downloadLink.click();
    downloadLink.remove();
    window.URL.revokeObjectURL(downloadUrl);
};
