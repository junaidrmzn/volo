import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { LocalFeatureFlagsProvider } from "@voloiq/feature-flags";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { renderHook } from "@voloiq/testing";
import { anyCrewMember } from "./anyCrewMember";
import { useGetAllCrewMembers } from "./useGetAllCrewMembers";

const { eachLike, iso8601DateTimeWithMillis, string, uuid } = Matchers;

pactWith({ consumer: "voloiq-ui", provider: "voloiq-logbook-api" }, (provider) => {
    describe("The CrewMember API is called and", () => {
        it(" returns a list of crewMembers", async () => {
            const date = "2022-04-19T13:45:51.209700+00:00";
            await provider.addInteraction({
                state: "there are crewMember",
                uponReceiving: "a request to crewMember",
                withRequest: {
                    path: "/crew-members",
                    method: "GET",
                    query: {
                        limit: "100",
                        orderBy: "firstName:asc",
                    },
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: {
                        data: eachLike({
                            id: uuid("d2913ca2-b915-4877-8865-460a8c855533"),
                            createTime: iso8601DateTimeWithMillis(date),
                            updateTime: iso8601DateTimeWithMillis(date),
                            email: string("Simon.Bayer@mail.com"),
                            firstName: string("Simon"),
                            lastName: string("Bayer"),
                        }),
                    },
                },
            });

            const { result, waitFor } = renderHook(() => useGetAllCrewMembers(), {
                wrapper: (props) => {
                    const { children } = props;
                    return (
                        <I18nProvider>
                            <LocalAuthenticationProvider>
                                <LocalFeatureFlagsProvider>
                                    <ServiceProvider baseUrl={provider.mockService.baseUrl}>{children}</ServiceProvider>
                                </LocalFeatureFlagsProvider>
                            </LocalAuthenticationProvider>
                        </I18nProvider>
                    );
                },
            });

            await waitFor(() => {
                expect(result.current.crewMembers.length).toBeGreaterThan(0);
            });

            expect(result.current.crewMembers[0]).toEqual(
                anyCrewMember({
                    updateTime: date,
                    createTime: date,
                    id: "d2913ca2-b915-4877-8865-460a8c855533",
                    email: "Simon.Bayer@mail.com",
                    firstName: "Simon",
                    lastName: "Bayer",
                })
            );
        });
    });
});
