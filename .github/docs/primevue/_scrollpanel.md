---
url: https://primevue.org/scrollpanel
scrapeDate: 2025-04-09T00:36:50.486Z
library: primevue

exactVersionMatch: false
---

## ScrollPanel

ScrollPanel is a cross browser, lightweight and skinnable alternative to native browser scrollbar.

## Import [#](_scrollpanel_.md#import)
```
import ScrollPanel from 'primevue/scrollpanel';
```
## Basic [#](_scrollpanel_.md#basic)

ScrollPanel is defined using dimensions for the scrollable viewport.
```
<ScrollPanel style="width: 100%; height: 200px">
    <p>
        Lorem ipsum dolor ...
    </p>
</ScrollPanel>
```
## Custom [#](_scrollpanel_.md#custom)

Scrollbar visuals can be styled for a unified look across different platforms.
```
<ScrollPanel
    style="width: 100%; height: 200px"
    :dt="{
        bar: {
            background: '{primary.color}'
        }
    }"
>
    ...
</ScrollPanel>
```
## Accessibility [#](_scrollpanel_.md#accessibility)

### Screen Reader

Scrollbars of the ScrollPanel has a _scrollbar_ role along with the _aria-controls_ attribute that refers to the id of the scrollable content container and the _aria-orientation_ to indicate the orientation of scrolling.

### Header Keyboard Support

Key

Function

_tab_

Moves focus through the bar.

_down arrow_

Scrolls content down when vertical scrolling is available.

_up arrow_

Scrolls content up when vertical scrolling is available.

_left_

Scrolls content left when horizontal scrolling is available.

_right_

Scrolls content right when horizontal scrolling is available.