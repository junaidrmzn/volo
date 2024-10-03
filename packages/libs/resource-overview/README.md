# Resource Overview Library

The resource overview library provides a configurable `ResourceOverview` component that handles essential features when it comes to dealing with a list of resources (e.g. list of logs in the [logbook](https://app.dev.voloiq.io/logbook/overview)):
- Displaying a paginated list (with configurable list items and top right action buttons)
- Displaying a preview for each list item when it is selected (with configurable bottom action buttons)
- Enabling filtering for the list
- Enabling sorting for the list
- Adding a resource
- Editing a resource (with configurable visibility of the edit button based on the selected resource)
- Deleting a resource (with configurable visibility of the delete button based on the selected resource)

Using this library **is the recommended approach** when displaying a list of resources in a module. It allows us to have a consistent experience accross VoloIQ modules and improves the maintanability of our codebase by encouraging reusability.

# Usage

## 1. Defining the configuration
The Resource Overview library expects you to provide a configuration that describes the feature set needed by your module by using the `ResourceMachineConfigBuilder` helper class. We recommend creating a custom hook that returns the configuration for a better separation of concerns.
Create, read, update and deletion permissions for the logged in user are also expected.
Example with list, sorting, preview, and delete features:
```tsx
const useLogbookOverviewConfiguration = () => {
    const { t } = useTranslations();
    const canCreate = useIsAuthorizedTo(["create"], ["Log"]);
    const canRead = useIsAuthorizedTo(["read"], ["Log"]);
    const canUpdate = useIsAuthorizedTo(["update"], ["Log"]);
    const canDelete = useIsAuthorizedTo(["delete"], ["Log"]);

    const config = new ResourceMachineConfigBuilder({
        canCreate,
        canRead,
        canUpdate,
        canDelete,
        getResourceName: () => t("resourceLabel"),
    })
        .withList<Log>({
            fetchAllResources: fetchAllLogs,
            getListItemName: () => t("resourceLabel"),
            getListTitle: () => t("headerTitle"),
            getModuleTitle: () => t("moduleName"),
            pageSize: 10,
            getListAriaLabel: () => t("listAriaLabel"),
        })
        .withPreview<Log>({
            fetchPreviewResource: fetchLog,
            getPreviewTitle: () => t("resourceLabel"),
        })
        .withSort({
            sortingOptions: [
                {
                    id: "createTime",
                    label: t("createTime"),
                },
            ],
        })
        .withDelete<Log>({
            deleteResource: deleteLog,
            getDeleteTexts: () => ({
                confirmationModal: {
                    headerText: t("deletionModal.header"),
                    bodyText: t("deletionModal.body"),
                },
            }),
        })
        .build();

    return config;
}
```

> **ℹ️**  Each function doing an API call (e.g. `fetchAllResources`) is a Promise that returns the resource (or an array of resources) wrapped in a `ResponseEnveloppe`.

> **ℹ️**  The `canCreate`, `canRead`, `canUpdate` and `canDelete` booleans allows the resource overview library to hide at runtime specific UI elements based on the permissions of the logged in user. In this example, if the user does not have the permission to delete a `Log` resource, the delete button will be hidden.

> **ℹ️**  In order to know what each feature method (e.g. `withList`) expects as a parameter, use the auto completion of your IDE or Ctrl+Click the method name to open the source and open the parameter type definitions manually.

## 2. Providing the configuration to the Resource Overview component

Now that we defined and configured the feature set we want for our module with the `ResourceMachineConfigBuilder` helper class, we have to provide our configuration to the Resource Overview component as a prop:

```tsx
export const LogbookOverview = () => {
    const configuration = useLogbookOverviewConfiguration();

    return (
        <ResourceOverview<Log> machineConfig={configuration}>
            // ...
        </ResourceOverview>
    );
};
```

> **ℹ️**  Make sure to pass your resource type as a generic (in this example `Log`) so that the Resource Overview component can make it use of it to enforce type safety in different places.

The last thing we need to provide to the Resource Overview component is our custom implementations for the list items and the preview. For this kind of features where the content is highly specific to the consumer, you have to provide the component(s) that will be rendered inside the feature.

Example for the list feature where you have to provide the template of each list item:

```tsx
export const LogbookOverview = () => {
    const configuration = useLogbookOverviewConfiguration();

    return (
        <ResourceOverview<Log> machineConfig={configuration}>
            <ResourceOverview.ListItem>
                {(log: Log, cardListItemProps: CardListItemProps) => <CardListItem key={log.id} {...cardListItemProps}>
                    <CardListItem.Identifier>
                        <IdentifierStack
                            mainIdentifier={formatUTCDate(new Date(date))}
                            secondaryIdentifier={log.aircraft.aircraftType}
                        />
                    </CardListItem.Identifier>
                </CardListItem>}
            </ResourceOverview.ListItem>
        </ResourceOverview>
    );
};
```

> **ℹ️**  All modules should use the `CardListItem` component for the list. The Resource Overview component handles the `aria-label`, `onClick` and `isSelected` props for you via the `cardListItemProps` object.

Example for the preview feature:

```tsx
export const LogbookOverview = () => {
    const configuration = useLogbookOverviewConfiguration();
    const { t } = useTranslations();

    return (
        <ResourceOverview<Log> machineConfig={configuration}>
            // ...
            <ResourceOverview.Preview>{(log: Log) => <VStack alignItems="baseline" spacing="3">
                    <PreviewSection headerLabel={t("preview.header")}>
                        <PreviewSectionItem
                            label={t("preview.aircraftLabel")}
                            text={`${log.aircraft.productLine} - ${log.aircraft.aircraftType} - ${log.aircraft.msn}`}
                            fullWidth
                        />
                        <PreviewSectionItem
                            label={t("preview.timeOfFlightLabel")}
                            text={formatDateTimeInputDate(new Date(log.date))}
                            fullWidth
                        />
                    </PreviewSection>
                </VStack>}
            </ResourceOverview.Preview>
        </ResourceOverview>
    );
};
```

> **ℹ️**  All modules should use the `PreviewSection` and `PreviewSectionItem` components for the preview.

While these examples are perfectly valid, it is recommended to extract the custom implementation of each feature into their own files. For example, the list item should be extracted to its own `LogListItem` component and the preview should be extracted to its own `LogbookPreview` component. This separation of concerns allows for a better code clarity and extensibility.

# References

- Checkout the stories of the [ResourceOverview](./src/stories/ResourceOverview.stories.tsx) by running the `yarn storybook` command at the root of the monorepo
- Checkout the [Logbook Overview implementation](../../mods/logbook/src/log-overview/OverviewPage.tsx)
- Checkout the [Software Configurations Overview implementation](../../mods/logbook/src/software-config-overview/SoftwareConfigurationsPage.tsx)
- Checkout the [FTI Overview implementation](../../mods/flight-test-instrumentation/src/parameter-overview/OverviewPage.tsx)
