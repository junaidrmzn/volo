# Testing

We use [Jest](https://jestjs.io/) for unit and integration tests. We use [Cypress](https://www.cypress.io/) for end-to-end (E2E) tests.  
The test files should be as close as possible to the code being tested, with the file name convention `<moduleName>.test.tsx`.  
Tests should follow the [Arrange, Act, Assert (AAA)](https://testing-library.com/docs/react-testing-library/example-intro/#arrange) pattern:

<details>
<summary>AAA Example</summary>

```js
test("it displays the name prop in an alert when clicking the button", () => {
    // Arrange
    jest.spyOn(window, "alert").mockImplementation(() => {});
    render(<Greetings name="John" />);

    // Act
    const button = screen.getByText("Greet John", { selector: "button" }) as HTMLButtonElement;
    userEvent.click(button);

    // Assert
    expect(window.alert).toBeCalledWith("Hello John!");
});
```

</details>

## Commands

### From the root level

`yarn test`: runs the tests of all packages with Jest (no E2E)

### From the package level

`yarn test`: runs the tests of the package with Jest (no E2E)
`yarn test:debug`: executes Jest with node in debug mode so that it can be debugged with a client like Chrome or VSCode (add the `debugger` keyword in your test before running this command)

## Unit tests

Unit tests should cover shared components and functions that are used in multiple places (e.g. shared library). They should not be used to test features: use integration tests for this purpose.

## Integration tests

Integration tests cover multiple parts of an application at once. These tests should be the preferred ones: they cover a much wider area than the unit tests and are closer to the functional requirements.

## Pact tests

### Flight Test Definition

For Pact tests, please follow the naming convention `voloiq.<module-name>.<service-name>` for consumer/provider services.
Make sure they are defined in `packages/mods/flight-test-definition/libs/api/config/pactConfig.ts` and export from there.

```

```
