# UnumID Core Types

This project contains all of our shared, generic Typescript types that are used through out the [UnumID](https://https://docs.unum.id/) core ecosystem. 

## Conventions

### Naming

a) Generic types such as `PresentationRequest`, as defined here, ought to be the simplest naming conventions. The generic type represents the domain type definition. If the object is used for persistence this generic type includes the persisted metadata, i.e. `uuid`, `createdAt`, and `updatedAt`. 

b) For generic types that are not directly persisted, i.e. `CredentialRequest`, the naming convention also ought to be the simplest.

c) For generic types that represent an object consisting of options for creating a persisted entity they should have succeeding `Options` naming convention. For example, `IssueCredentialOptions` or `EncryptedCredentialOptions`.

d) Types explicitly for HTTP interfaces ought have a trailing `Dto`, i.e. `PresentationRequestDto`. This is often used to better represent for the JSON serialized attributes `createdAt` and `updatedAt` from `Date` to `string`. Furthermore, if the Data Transfer Object is different between the HTTP request verbs, i.e. GET and POST, then include in the type as such, `PresentationRequestPostDto`.

e) HTTP types that encompass other DTOs, that are not just a serialization of one object, should use the naming convention "EnrichedDto". For example the `PresentationRequestEnrichedDto` encompasses the PresentationRequestDto type along with other fields supplementary to the `PresentationRequestDto` type.

f) Types that are used for cryptographic purposes should have a unsigned and signed version. However, the signed type should have the simpler naming convention, i.e. `Credential` is the signed type of `UnsignedCredential`. 

_Note: any types that undergo cryptographic operations need to be defined via Protocol Buffers in order to leverage their deterministic byte array properties. Thus should not be defined solely in this ts types project._

g) Entity types belong in the projects that interface with their data layers. For example, the PresentationRequest entity type, `PresentationRequestEntity`, should not be defined generically, but rather in the SaaS project types.

## Documentation
The `index.d.ts` file should serve as a self documenting file. Alternatively, [Typedoc](https://typedoc.org/) could be used however it would require a build step which it mostly unnecessary for this project. That said, if for any reason we would like to go with a full ts build step then Typedocs would be a great way to create external documentation that can be served via this repo's Github Pages.

## Release
Releases and publishing to NPM is automated via Github Actions CI job. In order to trigger a release one should push a git tag with a preceding `v` with semver notation, ie `v1.1.1`, to the `main` branch. This will trigger the CI job to bump the package version, make a release commit, and make a Github Release. The contents of the Github Release are autogenerated based on pull requests with commits associated with the release, so please use PRs to makes changes to `main`. The message of the git tag will be the commit message for the release so please make it meaningful. For example, `git tag v1.1.1 -m "Updated project with a new CI job" && git push origin v1.1.1 && git tag -d v1.1.1`.

NOTE: Certain special characters in the tag message such as parentheses `(` and semicolons `;`  will cause errors in the Github Actions job. Unfortunately this means that PR commit messages will usually not work. Make sure that your tag message does not contain special characters!
