export const verifyCallCount = (alias: string, expectedNumberOfCalls: number) => {
    const resolvedAlias = alias[0] === `@` ? alias : `@${alias}`;

    cy.get(`${resolvedAlias}.all`).then((calls) => {
        cy.wrap(calls.length).should(`equal`, expectedNumberOfCalls);
    });
};
