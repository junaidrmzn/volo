import type { Equipment, EquipmentCreate, EquipmentUpdate } from "./apiModels";

export const anyEquipment = (overwrites?: Partial<Equipment>): Required<Equipment> => ({
    id: "ce118b6e-d8e1-11e7-9296-cec278b6b50a",
    deviceId: "e118b6e-d8e1-11e7-9296-cec278b6b50a",
    name: "equipment 1",
    location: "34, 56",
    validFrom: "2023-10-18T10:47:39.210Z",
    validTo: "2023-10-18T10:47:39.210Z",
    version: 0,
    ...overwrites,
});

export const anyEquipmentCreate = (overwrites?: Partial<EquipmentCreate>): Required<EquipmentCreate> => ({
    name: "equipment 1",
    deviceId: "e118b6e-d8e1-11e7-9296-cec278b6b50a",
    location: "34, 56",
    validFrom: "2023-10-18T10:47:39.210Z",
    validTo: "2023-10-18T10:47:39.210Z",
    ...overwrites,
});

export const anyEquipmentUpdate = (overwrites?: Partial<EquipmentUpdate>): Required<EquipmentUpdate> => ({
    name: "equipment 1",
    deviceId: "e118b6e-d8e1-11e7-9296-cec278b6b50a",
    location: "334, 56",
    validFrom: "2023-10-18T10:47:39.210Z",
    validTo: "2023-10-18T10:47:39.210Z",
    ...overwrites,
});
