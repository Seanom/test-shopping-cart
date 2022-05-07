# Svelte shopping basket

A fun little project, creating a shopping basket.
It uses SvelteJs and data stores

# Dependancies

- node ^14.18.0
- Svelte
- Sass
- PostCSS
- Prettier
- ESlint
- Playwright

## Install dependancies

```bash
npm i
```

## Build the app & watch for changes

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Build the application and preview the compiled source

```bash
npm start
```

## Which Browsers/Devices or Virtualization services did you check the application in?

- Chrome
- Firefox
- Edge
- Safari iPhone (11) via Browserstack
- Chrome Android (Samsung Galaxy S22) via Browserstack

## Anything you want to tell us?

- Assumptions?
  - Items with a stock level of 0 are added to the cart (if they already existed).
  - It's not possible to add an item with 0 stock level to the basket.
  - If an item exists in the basket with 0 stock the buy now button is disabled.
  - Older browsers currently not supported.
  - That the cart storage should be maintained between page views.
  - The products/index.json is a list of products that could be added to the basket
  - Entering a negative number sets the quantity to 0 on blue
  - Quantity will not be more than 999 or 3 digits long
  - Assumed the quantity input uses a type of number, not text
  - Assumed hover/focus states
  - Measurements and font sizes have been estimated (Sketch does not work on Windows)
- Decisions?
  - Used SvelteJs (and Svelte Kit) instead of Vanilla JS, due to easier use of 2 way bindings
  - Created a very basic versions of the other pages to allow for navigation
  - Visiting the product page for the first time will add all products from the products/index.json file to the basket.
    - The intention of this is to check both the max and min stock levels, products should not exceed 0 if out of stock or the max amount of items
  - Added individual products to the products page to allow addition of products
  - Added a message bag to indicate to the user when a products added to the basket
  - Moved away from a larger single CSS before moving most of the components to the associated svelte component.
  - Used CSS variables
  - Added a dark mode (CSS variables are really impressive for that)
  - Used CSS grid for the basket layout instead of a table. Due to the design decisions on the mobile viewport.
  - Attempted to build with Accessibility in mind, though this has not been fully tested.
  - Used bootstrap sizes for devices, and added those to a SCSS breakpoints file to allow for adjustments to be made
- What you used to develop and test?
  - IntelliJ, local server run through `npm run dev`
  - SvelteKit, previous experience with Svelte, SvelteKit was a nice progression. I've wanted to try and use SvelteKit previously, this felt like a good time to attempt that
  - Typescript to help define types for variables to help prevent errors down the line
  - Playwright tests, used for E2E testing (would like to do more with this it's nice to use)
  - Chrome, Firefox and Edge locally tested
    - Using devtools device manager to help with viewport sizing
  - Browser Stack for testing in iOS and Android browsers
- Time Spent (6 evenings and a Sunday @4-6hrs )

  | Task        | Time (31) |
  | ----------- | --------- |
  | Styling     | ~6        |
  | JavaScript  | ~15       |
  | Refactoring | ~5        |
  | Research    | ~5        |

- What could be improved with the test
  - Updated tools, grunt relies on node-sass which has now been deprecated, @use not being supported was a hindrance.
  - Design files uploaded to Zeplin of Figma for those that can no access sketch files
  - Contrast of the blue on white appears to be a little low and could be improved

## What did you think of this test/exercise?

It's an enjoyable task, there are a few gotchas hidden, that would raise questions regarding functionality.
Assumptions made worked around those.

### What did you like?

1. I really enjoyed being able to add elements that I would not usually add into a project.
2. The ability to have fun with the exercise.
3. CSS's variables, I really don't get to use those enough.
4. Creating something I don't usually work on had me really thinking about the approach I had to take.
5. An excuse to do lots of research

### What could be improved?

1. Basket storage, currently based on a store, this could be added to local storage or an external api to allow a user to return to the basket at a later date.
2. Refactoring / code consistency, some CSS classes could do with being improved. This is the same with the JavaScript names and methods.
3. The quantity input, I think this could be better integrated with the basket store

### What didn't you like?

1. The menu modal popup
2. Fetch of local assets, works fine for development but in the build files I ran into issues 🤦‍♂️ this was refactored to import locally. Was easily one of the parts I refactored multiple times.
   - Vite has the ability to import json files directly which redeemed this
3. Svelte's inability to build files with exported types assigned to them (Typescript).
