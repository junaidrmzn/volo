import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";

export const usePrintPdf = (flightNumber: string) => {
    const printableRef = useRef<HTMLDivElement | null>(null);

    const handlePrint = async () => {
        const content = printableRef.current;
        if (content) {
            const pages = content.querySelectorAll(".page");
            // eslint-disable-next-line new-cap
            const pdf = new jsPDF({});
            const canvasesPromises = [];
            for (const page of pages) {
                canvasesPromises.push(
                    html2canvas(page as HTMLElement, { scale: 1.2, useCORS: true, allowTaint: true })
                );
            }
            const canvases = await Promise.all(canvasesPromises);
            for (const [index, canvas] of canvases.entries()) {
                if (canvas) {
                    const imgData = canvas.toDataURL("image/png");
                    const imgProps = pdf.getImageProperties(imgData);
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

                    if (index > 0) {
                        pdf.addPage();
                    }
                    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
                }
            }
            pdf.save(`OFP - ${flightNumber}.pdf`);
        }
    };

    return { printableRef, handlePrint };
};
