import { pactify } from "../../pactify";
import { anyEquipment, anyEquipmentCreate, anyEquipmentUpdate } from "./anyEquipment";

export const anyPactEquipment = pactify(anyEquipment);
export const anyPactEquipmentCreate = pactify(anyEquipmentCreate);
export const anyPactEquipmentUpdate = pactify(anyEquipmentUpdate);
