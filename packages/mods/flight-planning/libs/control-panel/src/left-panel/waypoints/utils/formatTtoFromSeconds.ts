const splitIntoMinutesAndSeconds = (targetTimeOver: string | number) => {
    const time = Number(targetTimeOver);
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return [minutes, seconds];
};

export const formatTtoFromSeconds = (targetTimeOver: string | number | undefined) => {
    if (!targetTimeOver) return "0:00";
    const [minutes, seconds = 0] = splitIntoMinutesAndSeconds(Number(targetTimeOver));
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const formatTtoFromSecondsWithLiterals = (targetTimeOver: string | number | undefined) => {
    if (!targetTimeOver) return "0m00s";
    const [minutes, seconds = 0] = splitIntoMinutesAndSeconds(Number(targetTimeOver));
    return `${minutes}m${seconds.toString().padStart(2, "0")}s`;
};
