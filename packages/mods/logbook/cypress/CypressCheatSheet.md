# Cypress Cheat Sheet

> All character appearing in this work are fictitious. Any resemblance to real persons, living or dead, is purely coincidental.



##Regex Text Matcher
Use regex instead of plain text. Regex allows you to search for **case insensitive** text.


### Flags
```tsx
cy.findByText("No entries found")  // <- case sensitive
cy.findByText(/no entries found/i) // <- case insensitive
```
|   | Expression Flags |
|---|------------------|
| g | global           |
| i | case insensitive |
| m | multiline        |
| s | single line      |
| u | unicode          |
| y | sticky           |


### Search limited match
With `^` and `$` you can mark the start and end of your string
```tsx
<Box>
    <Button>Save</Button>     - we want only this, not booth
    <Button>Save all</Button>
</Box>

cy.findAllByRole("button", {name: /save/i}) // <- get booth
cy.findByRole("button", {name: /save/i})    // <- error: found two matches
cy.findByRole("button", {name: /^save$/i})  // <- get only the "Save" button
```

### Variables
How to use a variable
```tsx
cy.findByText(new RegExp(textVariable, "i"))
cy.findByText(new RegExp(`^${textVariable}$`, "i"))
```


## Handle elements


### Chain searches
To search inside another element like searching for a listItem inside a list, does not require `within` like in jest.

**Jest**
```tsx
const logEntryList = screen.getByRole("list", {
        name: "resource list",
    });
await within(logEntryList).findAllByRole("listitem");
```
**Cypress**
```tsx
cy.findByRole("list", {name: "resource list",}).findAllByRole("listitem").first().findByText("test") // and so on ...;
```


### Reuse element
If you want to execute multiple action on one element, like a card of a card list, you have to us `as()` and refer to the tag.

**This does not work**
```tsx
const firstElement = cy.findAllByRole("listitem").first();
firstElement.findByText("a text").should("be.visible");
firstElement.findByText("a different text").should("be.visible");
```

**This is the correct was**
```tsx
cy.findAllByRole("listitem").first().as("entry1");
cy.get("@entry1").findByText("a text").should("be.visible");
cy.get("@entry1").findByText("a different text").should("be.visible");
```


### Wrap elements to continue executing commands (example: each list element )
In this case we used `cy.wrap()` to execute commands on each element for a list. We wanted to remove every entry, so we pressed the remove button for each list item.

In this case .each() returns a `JQuery<HTMLElement` and we use `cy.wrap()` to get a ` Chainable<JQuery<HTMLElement>>`.
```tsx
 LogCreationFileSelectPage.addedFilesListItems().each((element, index) =>
    cy
        .wrap(element)
        .as(`element${index}`)
        .findByRole("button", { name: /remove file entry/i })
        .click()
);

cy.get("@element1").should("not.exist");
```

a second [example from the official docs](https://docs.cypress.io/api/commands/wrap#Conditionally-wrap-elements)
```tsx
cy.get('button').then(($button) => {
  // $button is a wrapped jQuery element
  if ($button.someMethod() === 'something') {
    // wrap this element so we can
    // use cypress commands on it
    cy.wrap($button).click()
  } else {
    // do something else
  }
})
```


### get elements by `data-testid`
```tsx
cy.get("[data-testid='export-list']")
```


### get elements by `aria-label`
```tsx
cy.get(`[aria-label="Year"]`)
```


## Should

[List of should chainer options.](https://docs.cypress.io/guides/references/assertions)


### Check arrays
The only way to check array I have found so far is this.
* Check if all expected members are included in the tested array
* Check if tested array is not longer that expected
```tsx
cy.wait("@getAllParameter")
    .its("request.body.parameterIds")
    .should("include.members", [parameter1.id, parameter2.id])
    .should("have.length", 2);



const testExport: ExportInsert = anyExportInsert({
    parameters: ["123", "345", "456", "567", "678", "789"],
});
cy.wait("@postExport")
    .its("request.body.parameters")
    .should("include.members", testExport.parameters)
    .should("have.length", testExport.parameters.length);
```

If the array contains objects to be compared, you can use `deep.include`.

```tsx
const array1 = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Bob" },
];

const array2 = [
    { id: 2, name: "Jane" },
    { id: 3, name: "Bob" },
    { id: 1, name: "John" },
];

cy.wrap(array2).should("deep.include", ...array1);
```


### Check request and response
A request, mocked or not, can be intercepted und tagged with the `as()` function.
This tag can be used to check the request with should
```tsx
cy.wait("@getAllParameter").its("response.statusCode").should("eq", 200);

cy.wait("@getAllParameter")
    .its("request.body.parameterIds")
    .should("include.members", [parameter1.id, parameter2.id])
    .should("have.length", 2);

cy.wait("@patchParameter")
    .its("request.body")
    .should("contain", anyParameterPatch({ accuracy: 32 }));
```


### Check text in element without using findByText
Just get an element and use `include.text`
```tsx
cy.findAllByRole("listitem").first().should("include.text", "Calvin Holzmayer");
```


### Check a mocked function
To check a mock, you can just get the tag and check the result
```tsx
const setExportRequestLogStub = cy.stub().as("setExportRequestLogStub");

// do something with the mock

cy.get("@setExportRequestLogStub").should("be.calledOnce");
```


#Helpful stuff


## Catch ResizeObserver error
```tsx
Cypress.on("uncaught:exception", (error) => !error.message.includes("ResizeObserver loop limit exceeded"));
```


## Use react-select
```tsx
export const Select = {
    selectByOptionName: (selectLabel: string, optionName: string) => {
        cy.findByLabelText(selectLabel).click({ force: true });
        cy.findByLabelText(selectLabel).then((selectInput) =>
            cy
                .get(`[id=${selectInput.attr("aria-owns")}]`)
                .within(() => cy.findByRole("button", { name: new RegExp(`^${optionName}$`, "i") }).click())
        );
    },
    selectByOptionIndex: (selectLabel: string, index: number) => {
        cy.findByLabelText(selectLabel).click({ force: true });
        cy.findByLabelText(selectLabel).then((selectInput) =>
            cy.get(`[id=${selectInput.attr("aria-owns")}]`).within(() => cy.findAllByRole("button").eq(index).click())
        );
    },
};
```


## Use datepicker

```tsx
import { format } from "date-fns";
import { toLocalDate } from "@voloiq/utils";

export const DateTimePicker = {
    selectDateTime: (date: Date) => {
        const finalDate = toLocalDate(date);
        cy.get(`.flatpickr-calendar.open [aria-label="Year"]`).type(format(finalDate, "y"));
        cy.get(`.flatpickr-calendar.open [aria-label="Month"]`).select(format(finalDate, "LLLL"));
        cy.get(".flatpickr-calendar.open .dayContainer").within(() =>
            cy
                .get(".flatpickr-day")
                .not(".prevMonthDay")
                .not(".nextMonthDay")
                .filter(`:contains(${format(finalDate, "d")})`)
                .first()
                .click()
        );
        cy.get(`.flatpickr-calendar.open [aria-label="Hour"]`).type(String(finalDate.getHours()).padStart(2, "0"));
        cy.get(`.flatpickr-calendar.open [aria-label="Minute"]`)
            .type(String(finalDate.getMinutes()).padStart(2, "0"))
            .type("{enter}");
    },
    selectTime: (date: Date) => {
        const finalDate = toLocalDate(date);
        cy.get(`.flatpickr-calendar.open [aria-label="Hour"]`).type(String(finalDate.getHours()).padStart(2, "0"));
        cy.get(`.flatpickr-calendar.open [aria-label="Minute"]`)
            .type(String(finalDate.getMinutes()).padStart(2, "0"))
            .type("{enter}");
    },
};
```
