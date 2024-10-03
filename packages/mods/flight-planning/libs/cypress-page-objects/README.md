# Flight Planning Cypress Page Objects Library
This library contains the page object models for the UI elements of the flight planning app.

## What Are Page Object Models?
Page Object Model (POM) is a design pattern commonly used in test automation to enhance the maintainability and reusability of test code.
It helps in creating an object repository for web UI elements, enabling easy maintenance and reducing code duplication.
In the context of automated testing, a Page Object Model represents the web pages of an application as objects, with each page being represented as a separate class.

The key principles of the Page Object Model include:

1. Abstraction of UI Elements: UI elements such as buttons, text fields, dropdowns, and other components are abstracted into individual classes, making it easier to interact with them during test execution.

1. Improved Readability: Using descriptive names for your Page Objects and meaningful nesting allows other developer or your future self to easily navigate through tests and understand what it does. E.g., it's much easier to understand what element is clicked here `routeOptionsPage.detailsPanel.saveButton().click()` than here `cy.get("#save-btn")`.

1. Encapsulation of Page Interactions: The page classes encapsulate the methods and actions that can be performed on the associated UI elements. This allows testers to focus on the specific functionalities of each page without worrying about the underlying implementation details.

1. Enhanced Reusability: By encapsulating the UI elements and their interactions within page classes, the Page Object Model promotes code reusability. Testers can reuse the same page classes across multiple test cases, ensuring consistency and reducing redundancy in test scripts.

1. Improved Maintainability: Any changes to the UI or the application logic can be easily managed within the corresponding page classes. This makes maintenance more efficient, as modifications or updates can be made in a single location, without the need to modify multiple test scripts.

1. Readability and Scalability: The Page Object Model enhances the readability of test scripts by providing a clear and structured representation of the web pages and their interactions. Additionally, it supports the scalability of test suites, allowing testers to build and manage a comprehensive set of test cases for complex web applications.

## Folder Structure
The folder structure should be as intuitive as possible, this closely representing the UI.
On the top level, you should find the page that is represented, e.g., the route options page.
One level down, you will find the page fragments (i.e., the individual components the page is comprised of such as lists, modals, etc.).
Page fragments can be nested and include other page fragments, use healthy judgement here as to how fine granular you want to nest.
The aim should be to allow good readability in the test cases:
- Bad readability: `routeOptionsPage.saveButton()` - The button is actually in a modal and not directly visible on the UI, but just from reading the test you'd have no idea
- Good readability: `routeOptionsPage.waypointDetailsPanel.segmentEditingSection.saveButton()` - This gives the reader a good idea what element the test is addressing
