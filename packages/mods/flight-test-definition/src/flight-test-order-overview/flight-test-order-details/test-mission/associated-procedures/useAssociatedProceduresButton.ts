const handleProcedureDetailClick = (ftdId: string, procedureId: string) => {
    const url = `https://app.dev.voloiq.io/flight-test-definition/overview/${ftdId}/procedures/${procedureId}`;
    window.open(url, "_blank", "noopener noreferrer");
};

export const useAssociatedProceduresButton = () => {
    return {
        handleProcedureDetailClick,
    };
};
