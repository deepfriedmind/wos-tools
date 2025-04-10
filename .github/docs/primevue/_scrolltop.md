---
url: https://primevue.org/scrolltop
scrapeDate: 2025-04-09T00:37:00.630Z
library: primevue

exactVersionMatch: false
---

## ScrollTop

ScrollTop gets displayed after a certain scroll position and used to navigates to the top of the page quickly.

## Import [#](_scrolltop_.md#import)
```
import ScrollTop from 'primevue/scrolltop';
```
## Basic [#](_scrolltop_.md#basic)

ScrollTop listens window scroll by default.

Scroll down the page to display the ScrollTop component.

## Element [#](_scrolltop_.md#element)

Setting the _target_ property to _parent_ binds ScrollTop to its parent element that has scrolling content.
```
<ScrollPanel style="width: 250px; height: 200px">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae et leo duis ut diam. Ultricies mi quis hendrerit dolor magna eget est lorem. Amet consectetur adipiscing
        elit ut. Nam libero justo laoreet sit amet. Pharetra massa massa ultricies mi quis hendrerit dolor magna. Est ultricies integer quis auctor elit sed vulputate. Consequat ac felis donec et. Tellus orci ac auctor augue mauris. Semper
        feugiat nibh sed pulvinar proin gravida hendrerit lectus a. Tincidunt arcu non sodales neque sodales. Metus aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices. Sodales ut etiam sit amet nisl purus. Cursus sit amet
        dictum sit amet. Tristique senectus et netus et malesuada fames ac turpis egestas. Et tortor consequat id porta nibh venenatis cras sed. Diam maecenas ultricies mi eget mauris. Eget egestas purus viverra accumsan in nisl nisi.
        Suscipit adipiscing bibendum est ultricies integer. Mattis aliquam faucibus purus in massa tempor nec.
    </p>
    <ScrollTop target="parent" :threshold="100" icon="pi pi-arrow-up" :buttonProps="{ severity: 'contrast', raised: true, rounded: true }" />
</ScrollPanel>
```
## Accessibility [#](_scrolltop_.md#accessibility)

### Screen Reader

ScrollTop uses a button element with an _aria-label_ that refers to the _aria.scrollTop_ property of the [locale](_configuration_.md#locale) API by default, you may use your own aria roles and attributes as any valid attribute is passed to the button element implicitly.

### Keyboard Support

Key

Function

_enter_

Scrolls to top.

_space_

Scrolls to top.