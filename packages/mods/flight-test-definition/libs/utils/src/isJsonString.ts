export const isJsonString = (potentialJsonString: string = ""): potentialJsonString is string => {
    try {
        JSON.parse(potentialJsonString);
    } catch {
        return false;
    }
    return true;
};
