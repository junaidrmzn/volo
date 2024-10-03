import { useCreateService } from "../../useCreateService";
import { useDeleteService } from "../../useDeleteService";
import { useGetAllService } from "../../useGetAllService";
import { useGetService } from "../../useGetService";
import { usePatchService } from "../../usePatchService";
import { useUpdateService } from "../../useUpdateService";
import type { Resource, ResourceCreate, ResourceUpdate } from "./Resource";

export const useGetResource = (resourceId: string) => useGetService<Resource>({ route: "/resources", resourceId });

export const useGetAllResources = () => useGetAllService<Resource>({ route: "/resources" });

export const usePatchResource = (resourceId: string) =>
    usePatchService<ResourceCreate, Resource>({ route: "/resources", resourceId });

export const useCreateResource = () => useCreateService<ResourceCreate, Resource>({ route: "/resources" });

export const useUpdateResource = () => useUpdateService<ResourceUpdate, Resource>({ route: "/resources" });

export const useDeleteResource = () => useDeleteService({ route: "/resources" });
