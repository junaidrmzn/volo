import { useState } from "react";

export const useEsuSelection = (esuList: string[]) => {
    let filteredEsuList: string[] = [];
    filteredEsuList = esuList.flatMap((esu) => esu.split(", ")).filter((esu) => esu !== "NULL");
    const [selectedEsu, setSelectedEsu] = useState(filteredEsuList[0]);
    return { filteredEsuList, selectedEsu, setSelectedEsu };
};
