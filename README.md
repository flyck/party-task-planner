# Party Task Planner

## New Technologies

In this app I want to try a bunch of new things:
- [x] Vercel for frontend hosting
- [x] v0 for AI-supported UI design
- [x] Automated releases with github actions
- [x] Appsync javascript resolvers
- [x] Appsync subscriptions for real-time updates everywhere
- [x] Playwright frontend tests
- [ ] HTMX instead of react & appsync

## DX Notes

- Even though I can get nice types, the whole thing should be much easier
- Isnt there a service out there which I can just give my graphql schema and it will provision the
  api? the cdk setup including CI/CD seems kind of big for a relatively simple thing
- Trying a bunch of new technologies while trying to be fast at the same time is
  contradictory. For speed it might be better to use a known tool to reduce complexity instead of
  getting familiar with many new things

## CI/CD

Vercel provides CI/CD jobs out of the box. Played around with overriding the jobs
(https://vercel.com/guides/how-can-i-use-github-actions-with-vercel) before finding out these jobs
can be customized in the vercel project settings (not a file in this repo).

## Playwright Tests

E2E tests.

Easily record tests ([docs](https://playwright.dev/docs/codegen#emulation)):
```
npx playwright codegen --viewport-size=800,600 http://localhost:3000
```

## SSR

Because I am using localstorage to store the username, nextjs goes crazy:
https://nextjs.org/docs/messages/react-hydration-error

Should I use more SSR for my app?

## GraphQL Schema

- Would be nice to have an auto-increment id for the participants
- Is it annoying that the participants have the partyId as the PK? Maybe in some hypothetical
  support cases, but there could be work-arounds for these

## AppSync Subscriptions

- To use it with apollo a certain package is needed
  - This package has a pending issue for which there is a patch
    - Could also be solved by [delaying the init](https://github.com/awslabs/aws-mobile-appsync-sdk-js/issues/491#issuecomment-671469907)
  - This package has a missing dependency on "uuid", which is why I added it as a frontend project
    dependency: [hint](https://github.com/awslabs/aws-mobile-appsync-sdk-js/issues/695)

## DynamoDB

Might be cool to have the IDs include their keytype (i.e. party#123123 instead of just 123123)
like prescribed
[here](https://aws.amazon.com/blogs/database/effective-data-sorting-with-amazon-dynamodb/). Will
have to be hidden in the URL though because this id would be kind of ugly to have in the url.

## Single Page Application

Should this app be a single page application? Probably yes, but it doesnt seem straightforward
with Next.js ([blog](https://colinhacks.com/essays/building-a-spa-with-nextjs)). Sharing data
between states could make it so I fetch all party data once, and then only rely on subscriptions
for subsequent data updates. A potentially bigger bundle sice with the SPA is counterweighed by
optimal network requests for the application data.
