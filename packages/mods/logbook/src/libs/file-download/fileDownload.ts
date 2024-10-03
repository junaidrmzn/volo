export const fileDownload = (blob: Blob, fileName: string) => {
    const url =
        window.URL && window.URL.createObjectURL
            ? window.URL.createObjectURL(blob)
            : window.webkitURL.createObjectURL(blob);
    const link = document.createElement("a");
    link.style.display = "none";
    link.href = url;
    link.setAttribute("download", fileName);
    if (typeof link.download === "undefined") {
        link.setAttribute("target", "_blank");
    }
    document.body.append(link);
    link.click();

    setTimeout(() => {
        link.remove();
        window.URL.revokeObjectURL(url);
    }, 200);
};
