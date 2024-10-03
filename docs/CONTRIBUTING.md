# Azure DevOps Policies for Pull Requests

In order for your pull request to be merged, the following conditions have to be met:

-   validation pipeline passes
-   has approval by at least one reviewer\* (note that votes are reset after each push)
-   all comments are resolved

These conditions are automatically enforced by Azure DevOps.

Please always squash your commits when merging.
This is also enforced by Azure DevOps.

## Code Ownership and Optional/Required Reviewers

Azure DevOps allows us to automatically add reviewers to pull requests.
You can view the [current policies in the repository settings](https://dev.azure.com/volocopter/voloiq/_settings/repositories?_a=policiesMid&repo=5e8881b1-af30-4dc2-8a63-f2dc976269fb&refs=refs%2Fheads%2Fmain).

A package may be owned by a team, a Community of Practice or by a group of core team members.

E.g. if you changed something in the design system library and the logbook module, the design system CoP and the teleport team are added as reviewers, and you will need the approval of one of each team.

Currently we add the code owners of specific packages as optional reviewers if the package was touched in the pull request.
The detailed policies are still in work and may be subject to change.

## Branch Naming

Please follow the following naming policy:

`[type]/[ticket-number]-[description]`

-   start with the same type as in the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#specification)
-   add the number of the ticket associated with the branch
-   provide a brief description of the branch's scope

Examples:

-   feat/VT-1-landing-page
-   docs/VT-2-pr-handling-documentation
-   fix/VT-3-hovering-button-causes-pagecrash

# Code Review Etiquette

Whether as a reviewer (the person reviewing the code) or as a reviewee (the person whose changes are being reviewed), we agree on the following:

-   we conduct code reviews on every pull request to keep code quality up and facilitate knowledge spreading.
-   we give and receive feedback respectfully. Always be kind and constructive.
-   we make code reviews a priority in our daily work. We ensure that pull requests can be completed in a timely manner. Pull requests that fix critical bugs or broken builds on main should be handled extra-quick (ideally within the day).
-   we strive to apply the [Clean Code Principles](https://gist.github.com/wojteklu/73c6914cc446146b8b533c0988cf8d29).
-   we solve issues/findings that are out of scope in a follow-up pull request. This keeps pull request scopes small. If necessary, we create a new user story and link it.

## As a Reviewee, I...

-   keep the scope of my pull requests small. This makes them easier and faster to review. A pull request should ideally take about 10-20 minutes to review and should not touch more than 2 domains (e.g. a library and a module). A user story may take multiple pull requests to resolve.
-   explain technical/architectural decisions in the pull request description to put changes into context for the reviewer.
-   mark the pull request as a draft if I know it is not merge-able, e.g. because I am not finished with the implementation or the validation fails. This shows the reviewer that I know there are open issues and that they don't have to review it yet.
-   publish my pull request only when it does not have any merge conflicts with main, has a green pipeline build, and fulfils all acceptance criteria within its scope, i.e. except for what was explicitly excluded in the PR description.
-   don't push further changes until the reviewers have set their votes (freeze the code). This lets the reviewer work through all my changes undisturbed by further pushes.

## As a Reviewer, I...

-   check at least once per day (e.g. first thing in the morning) if there are pull requests that require my attention. This keeps pull request turnaround times low.
-   offer helpful ideas to improve the code, but keep pragcellence in mind and don't be overly pedantic. Where my personal preferences are involved, I respect that the reviewee has the freedom to do things differently.
-   resolve my comments after they are addressed. This shows the reviewee that I agree with the current state.
