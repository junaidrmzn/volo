# Roles and authorization

## Overview

The authenticated account will have an associated _roles_ array of values informed in the oauth2 jwt token obtained in the request to the token endpoint provided by the [openid config](https://login.microsoftonline.com/3fd2cab1-f540-48f1-b76d-55f4d472c837/v2.0/.well-known/openid-configuration)

```
"roles": [
      "admin",
      "commercial-manager-sales-agent"
    ],
```

Those _roles_ are [mapped](../packages/libs/auth/src/authentication/useAuthenticationProvider.ts) to _groups_ according to the [auth config](../packages/apps/voloiq/src/components/useAuthConfiguration.ts) being applied.
In a non-local environment the _auth config_ will be the value set through the [app config](https://github.com/volocopter-internal/devops-voloiq-services-appconfig/blob/main/configuration/apps/voloiq-ui.yml#L101).

For a **local** execution, the value will be that hardcoded json in the [useAuthConfiguration](../packages/apps/voloiq/src/components/useAuthConfiguration.ts) file.

Once the _groups_ of the logged in account are known, the associations present in the [authorization file](../packages/libs/auth/src/authorization/authorization.ts) allow to know the permissions on the different resources.

In a non-local environment, the account's roles are provided in the oauth2 jwt token, that is processed by a specialized [auth provider](../packages/libs/auth/src/providers/MsalProvider.tsx).

On the contrary, for a **local** execution _roles_ are skipped and _groups_ are directly set this [mock provider](../packages/libs/auth/src/authentication/LocalAuthenticationProvider.tsx) is used to set the _group_ and resolve the corresponding permissions.
The default "Admin" value can be changed in order to check the apps's behavior when the account belongs to a more restricted group.

## Display or not display

When it comes to controls whether a component has to be displayed or not, there are already some help in place: [RequirePermissions](../packages/libs/auth/src/authorization/RequirePermissions.tsx)
An example of its usage can be found on the [navigation bar](../packages/apps/voloiq/src/components/navigation-bar/protected-menu-item/ProtectedNavigationBarMenuEntry.tsx).

Also, a direct control can be achieved by direct calls to
[useIsAuthorizedTo](packages/libs/auth/src/authorization/useIsAuthorizedTo.ts) method.
An example if such usage can be found [here](packages/mods/aircraft-management/src/aircraft/useAircraftMachineConfig.ts).

## Roles & permissions matrix

The [authorization file](../packages/libs/auth/src/authorization/authorization.ts) intends to reflect the permission that a role has as stated [here](https://confluence.volocopter.org/pages/viewpage.action?pageId=134414417).

## Request roles

In order to request roles in a given environment, instructions can be found [here](https://confluence.volocopter.org/display/VIQ/Role+Based+Access+Request+for+VoloIQ+Environments).
