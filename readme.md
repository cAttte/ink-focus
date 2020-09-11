# ink-focus

An [Ink](https://github.com/vadimdemedes/ink) component to manage element focus and _ease your mind_.

## Installation

```
$ npm install ink-focus
```

## Usage

This module exports two components.

```js
const React = require("react")
const Ink = require("ink")
const { FocusManager } = require("ink-focus")

Ink.render(
    <FocusManager tab onFocusChange={(_, i) => console.log(`Text ${i + 1} focused`)}>
        <Ink.Text>Text 1</Ink.Text>
        <Ink.Text>Text 2</Ink.Text>
        <Ink.Text>Text 3</Ink.Text>
    </FocusManager>
)
```

_For more advanced usage, see [Focusable](#focusable)._

### FocusManager

The main component, which will contain all of your focusable elements and handle keypress events.

Note that, currently, FocusManagers can't be nested; attempting to do so will throw an error.

#### Props

Note that none of the key props default to `true`, so you'll have to specify at least one of them to make the FocusManager interactive.

##### tab

Whether <kbd>Tab</kbd> presses should change the focus to the next element.

-   **Type:** `boolean`
-   **Default:** `false`

##### xArrows

Whether <kbd>←</kbd> and <kbd>→</kbd> (horizontal arrow key) presses should change the focus to the previous and next element, respectively.

-   **Type:** `boolean`
-   **Default:** `false`

##### yArrows

Whether <kbd>↑</kbd> and <kbd>↓</kbd> (vertical arrow key) presses should change the focus to the previous and next element, respectively.

-   **Type:** `boolean`
-   **Default:** `false`

##### arrows

`xArrows` and `yArrows`. Whether all arrows should change the focus.

-   **Type:** `boolean`
-   **Default:** `false`

##### filter

Custom filter to check whether a keypress should change focus or not. Return `"prev"` to change focus to the previous element, `"next"` to change focus to the next one, and any other value to not do anything. Check out the [**keypress**](https://github.com/TooTallNate/keypress#listening-for-keypress-events) module to see what arguments are passed to the callback.

-   **Type:** `function(char: string, key?: object) => "prev" | "next" | any`
-   **Default:** `undefined`

##### loop

Whether the focus should loop back to the start when there are no elements next, and loop to the end when there are no elements prior.

-   **Type:** `boolean`
-   **Default:** `false`

##### noInitialFocus

Whether no element should be focused by default; the first (or last) element will only be focused once the user presses a key.

-   **Type:** `boolean`
-   **Default:** `false`

##### onFocusChange

Callback run once the focus changes.

-   **Type:** `function(oldIndex?: number, newIndex: number) => void`
-   **Default:** `undefined`

#### Children props

The children of a FocusManager ("focusable elements") can have these props.

##### focused

Whether the element is focused. This prop is set by FocusManager, though you can set it yourself to set a default focused element other than the first one.

-   **Type:** `boolean`

##### unfocusable

Whether the element should not be focusable; it should be "skipped" if the user attempts to focus it.

-   **Type:** `boolean`

##### onFocus

Callback run once the element is focused.

-   **Type:** `function() => void`

##### onBlur

Callback run once the element is "blurred" (stops being focused).

-   **Type:** `function() => void`

### Focusable

A utility component, which isn't strictly necessary—you can place elements other than Focusables inside FocusManagers—but can be useful if the content of the FocusManager isn't solely custom components. It handles prop swapping depending on whether the element is focused.

#### Props

All [FocusManager children props](#children-props), and all [Ink.Box props](https://github.com/vadimdemedes/ink#box), which will be passed to the container Box.

##### focus

Props to pass to the container Ink.Box when the element is focused.

-   **Type:** `object`

### Writing your own focusable component

Check out [**examples/main.js**](https://github.com/cAttte/ink-focus/blob/master/examples/main.js) for an example of (two) custom-made focusable components, they handle styling so you don't have to inline the focus prop every time. They're similar to the [Focusable](#focusable) implementation.

_Psst! for focusable buttons, check out [**ink-button**](https://github.com/cAttte/ink-button)._

## Ctrl+C

You'll notice that pressing <kbd>Ctrl</kbd>+<kbd>C</kbd> (or any other combination) won't exit the program. This happens because `ink-focus` keeps listening for user keypresses. To fix this, add something like this to your code (preferably your main file; `index.js`, `cli.js`...):

```js
process.stdin.on("keypress", (char, key) => {
    if (key && key.ctrl && key.name === "c") {
        process.exit(0)
    }
})
```

This will listen for keypress events, and exit the program once the <kbd>Ctrl</kbd>+<kbd>C</kbd> combination is detected.
