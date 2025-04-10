---
url: https://primevue.org/imagecompare
scrapeDate: 2025-04-09T00:37:02.801Z
library: primevue

exactVersionMatch: false
---

## ImageCompare

Compare two images side by side with a slider.

## Import [#](_imagecompare_.md#import)
```
import ImageCompare from 'primevue/imagecompare';
```
## Basic [#](_imagecompare_.md#basic)

Images are defined using templating with _left_ and _right_ slots. Use the _style_ or _class_ properties to define the size of the container.

![](https://primefaces.org/cdn/primevue/images/compare/island1.jpg)

![](https://primefaces.org/cdn/primevue/images/compare/island2.jpg)
```
<ImageCompare class="shadow-lg rounded-2xl">
    <template #left>
        <img src="~/assets/images/island1.jpg" />
    </template>
    <template #right>
        <img src="~/assets/images/island2.jpg" />
    </template>
</ImageCompare>
```
## Responsive [#](_imagecompare_.md#responsive)

Apply responsive styles to the container element to optimize display per screen size.

![](https://primefaces.org/cdn/primevue/images/compare/island1.jpg)

![](https://primefaces.org/cdn/primevue/images/compare/island2.jpg)
```
<ImageCompare class="sm:!w-96 shadow-lg rounded-2xl">
    <template #left>
        <img src="~/assets/images/island1.jpg" />
    </template>
    <template #right>
        <img src="~/assets/images/island2.jpg" />
    </template>
</ImageCompare>
```
## Accessibility [#](_imagecompare_.md#accessibility)

### Screen Reader

ImageComponent component uses a native range _slider_ internally. Value to describe the component can be defined using _aria-labelledby_ and _aria-label_ props.
```
<span id="image_label">Compare Images</span>
<ImageCompare class="shadow-lg rounded-2xl" aria-labelledby="image-label">
    ...
</ImageCompare>
<ImageCompare class="shadow-lg rounded-2xl" aria-label="Compare Images">
    ...
</ImageCompare>
```
### Keyboard Support

Key

Function

_tab_

Moves focus to the component.

_left arrow__up arrow_

Decrements the value.

_right arrow__down arrow_

Increments the value.

_home_

Set the minimum value.

_end_

Set the maximum value.

_page up_

Increments the value by 10 steps.

_page down_

Decrements the value by 10 steps.