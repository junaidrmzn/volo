const getHours = (time: number) => {
    const hours = Math.floor(time / 3600);
    return hours > 9 ? hours : `0${hours}`;
};

const getMinutes = (time: number) => {
    const minutes = Math.floor(time / 60);
    return minutes > 9 ? minutes : `0${minutes}`;
};

const getSeconds = (time: number) => {
    const seconds = Math.floor(time % 60);
    return seconds > 9 ? seconds : `0${seconds}`;
};

export const formatIsoString = (seconds: string | number | undefined) => {
    const isoStringBase = "2023-01-01T"; // needed for echarts to be a valid ISO 8601 string, see https://echarts.apache.org/en/option.html#series-line.data
    if (!seconds) return `${isoStringBase}00:00:00`;
    const time = typeof seconds === "string" ? Number(seconds) : seconds;
    return `${isoStringBase}${getHours(time)}:${getMinutes(time)}:${getSeconds(time)}`;
};
