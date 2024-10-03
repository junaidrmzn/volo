export type EquipmentCreate = {
    deviceId: string;
    name: string;
    validFrom: string;
    location: string;
    validTo?: string;
};

export type EquipmentAllOf = {
    id: string;
    version?: number;
};

export type EquipmentUpdate = EquipmentCreate;

export type Equipment = EquipmentCreate & EquipmentAllOf;
