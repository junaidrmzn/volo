import type { Equipment } from "@voloiq/vertiport-management-api/v1";

export const createEquipmentInterceptor = (vertiportId: string) =>
    cy.intercept("POST", `http://api.cypress.voloiq.io/vertiport-management/v1/vertiports/${vertiportId}/inventory`, {
        statusCode: 201,
    });

export const getAllEquipmentsInterceptor = (vertiportId: string, equipments: Equipment[]) =>
    cy.intercept("GET", `http://api.cypress.voloiq.io/vertiport-management/v1/vertiports/${vertiportId}/inventory?*`, {
        statusCode: 200,
        body: {
            data: equipments,
        },
    });

export const updateEquipmentInterceptor = (vertiportId: string, equipmentId: string) =>
    cy.intercept(
        "PATCH",
        `http://api.cypress.voloiq.io/vertiport-management/v1/vertiports/${vertiportId}/inventory/${equipmentId}`,
        {
            statusCode: 200,
        }
    );
