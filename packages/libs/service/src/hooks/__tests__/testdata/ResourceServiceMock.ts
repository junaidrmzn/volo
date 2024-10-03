import { factory, primaryKey } from "@mswjs/data";
import { response as mswResponse, rest } from "msw";
import { setupServer } from "msw/node";
import { isPartialResource, isResource } from "./Resource";

let lastKey = 1;
const { resource: database } = factory({
    resource: {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        id: primaryKey(() => `${lastKey++}` as string),
        location: () => "Bruchsal",
        age: () => Math.round(Math.random() * 100),
        width: () => Math.round(Math.random() * 1000),
        height: () => Math.round(Math.random() * 1000),
        length: () => Math.round(Math.random() * 1000),
    },
});

const databaseOperations = {
    add: database.create,
    clear: () => database.deleteMany({ where: { id: { notEquals: "0" } } }),
    get: database.getAll,
};

const resourceHandlers = [
    rest.get("https://api.voloiq.com/resources/:resourceId", (request, response, context_) => {
        const { resourceId } = request.params;
        if (!resourceId || typeof resourceId !== "string") {
            return response(context_.status(400));
        }
        return response(
            context_.status(200),
            context_.json({
                data: database.findFirst({ where: { id: { equals: resourceId } } }),
                pagination: { total: 1, limit: 20, offset: 0 },
            })
        );
    }),
    rest.get("https://api.voloiq.com/resources", (_request, response, context_) =>
        response(
            context_.status(200),
            context_.json({
                data: database.getAll(),
                pagination: { total: 1, limit: 20, offset: 0 },
            })
        )
    ),
    rest.post("https://api.voloiq.com/resources", (request, response, context_) => {
        const { body: resource } = request;
        if (!isResource(resource)) {
            return response(context_.status(400));
        }
        const newResource = database.create(resource);
        return response(
            context_.status(201),
            context_.json({
                data: newResource,
                pagination: { total: 1, limit: 20, offset: 0 },
            })
        );
    }),
    rest.put("https://api.voloiq.com/resources/:resourceId", (request, response, context_) => {
        const { body: resourceUpdates, params } = request;
        const { resourceId } = params;
        if (!resourceId || typeof resourceId !== "string") {
            return response(context_.status(400));
        }
        if (!isPartialResource(resourceUpdates)) {
            return response(context_.status(400));
        }

        const updatedResource = database.update({
            where: { id: { equals: resourceId } },
            data: resourceUpdates,
        });
        return response(
            context_.status(201),
            context_.json({
                data: updatedResource,
                pagination: { total: 1, limit: 20, offset: 0 },
            })
        );
    }),
    rest.patch("https://api.voloiq.com/resources/:resourceId", (request, response, context_) => {
        const { body: resourceUpdates, params } = request;
        const { resourceId } = params;
        if (!resourceId || typeof resourceId !== "string") {
            return response(context_.status(400));
        }
        if (!isPartialResource(resourceUpdates)) {
            return response(context_.status(400));
        }

        const updatedResource = database.update({
            where: { id: { equals: resourceId } },
            data: resourceUpdates,
        });
        return response(
            context_.status(201),
            context_.json({
                data: updatedResource,
                pagination: { total: 1, limit: 20, offset: 0 },
            })
        );
    }),
    rest.delete("https://api.voloiq.com/resources/:resourceId", (request, response, context_) => {
        const { params } = request;
        const { resourceId } = params;
        if (typeof resourceId !== "string") {
            return mswResponse(context_.status(400));
        }
        database.delete({
            where: { id: { equals: resourceId } },
        });
        return response(context_.status(204));
    }),
];

export const setupResourceServiceMock = () => {
    const { listen, resetHandlers, close, use } = setupServer(...resourceHandlers);
    return { listen: () => listen(), resetHandlers, close, database: databaseOperations, use };
};
