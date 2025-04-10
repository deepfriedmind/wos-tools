---
url: https://primevue.org/virtualscroller
scrapeDate: 2025-04-09T00:36:41.314Z
library: primevue

exactVersionMatch: false
---

## VirtualScroller

VirtualScroller is a performant approach to render large amounts of data efficiently.

## Import [#](_virtualscroller_.md#import)
```
import VirtualScroller from 'primevue/virtualscroller';
```
## Basic [#](_virtualscroller_.md#basic)

VirtualScroller requires _items_ as the data to display, _itemSize_ for the dimensions of an item and _item_ template are required on component. In addition, an initial array is required based on the total number of items to display. Size of the viewport is configured using _scrollWidth_, _scrollHeight_ properties directly or with CSS _width_ and _height_ styles.
```
<VirtualScroller :items="items" :itemSize="50" class="border border-surface-200 dark:border-surface-700 rounded" style="width: 200px; height: 200px">
    <template v-slot:item="{ item, options }">
        <div :class="['flex items-center p-2', { 'bg-surface-100 dark:bg-surface-700': options.odd }]" style="height: 50px">{{ item }}</div>
    </template>
</VirtualScroller>
```
## Horizontal [#](_virtualscroller_.md#horizontal)

Setting _orientation_ to _horizontal_ enables scrolling horizontally. In this case, the _itemSize_ should refer to the width of an item.
```
<VirtualScroller :items="items" :itemSize="50" orientation="horizontal" class="border border-surface-200 dark:border-surface-700 rounded" style="width: 200px; height: 200px" :pt="{ content: 'flex flex-row' }">
    <template v-slot:item="{ item, options }">
        <div :class="['flex items-center p-2', { 'bg-surface-100 dark:bg-surface-700': options.odd }]" style="width: 50px; writing-mode: vertical-lr;">{{ item }}</div>
    </template>
</VirtualScroller>
```
## Grid [#](_virtualscroller_.md#grid)

Scrolling can be enabled vertically and horizontally when _orientation_ is set as _both_. In this mode, _itemSize_ should be an array where first value is the height of an item and second is the width.
```
<VirtualScroller :items="items" :itemSize="[50, 100]" orientation="both" class="border border-surface-200 dark:border-surface-700 rounded" style="width: 200px; height: 200px">
    <template v-slot:item="{ item, options }">
        <div :class="['flex items-center p-2', { 'bg-surface-100 dark:bg-surface-700': options.odd }]" style="height: 50px">
            <template v-for="(el, index) of item" :key="index">
                <div style="width: 100px">{{ el }}</div>
            </template>
        </div>
    </template>
</VirtualScroller>
```
## Delay [#](_virtualscroller_.md#delay)

The _delay_ property adds a threshold to wait in milliseconds during scrolling for render optimization.
```
<VirtualScroller :items="items" :itemSize="50" class="border border-surface-200 dark:border-surface-700 rounded" style="width: 200px; height: 200px">
    <template v-slot:item="{ item, options }">
        <div :class="['flex items-center p-2', { 'bg-surface-100 dark:bg-surface-700': options.odd }]" style="height: 50px">{{ item }}</div>
    </template>
</VirtualScroller>
<VirtualScroller :items="items" :itemSize="50" :delay="150" class="border border-surface-200 dark:border-surface-700 rounded" style="width: 200px; height: 200px">
    <template v-slot:item="{ item, options }">
        <div :class="['flex items-center p-2', { 'bg-surface-100 dark:bg-surface-700': options.odd }]" style="height: 50px">{{ item }}</div>
    </template>
</VirtualScroller>
<VirtualScroller :items="items" :itemSize="50" :delay="500" class="border border-surface-200 dark:border-surface-700 rounded" style="width: 200px; height: 200px">
    <template v-slot:item="{ item, options }">
        <div :class="['flex items-center p-2', { 'bg-surface-100 dark:bg-surface-700': options.odd }]" style="height: 50px">{{ item }}</div>
    </template>
</VirtualScroller>
```
## Loading [#](_virtualscroller_.md#loading)

Busy state is enabled by adding _showLoader_ property which blocks the UI with a modal by default. Alternatively, _loader_ template can be used to customize items e.g. with [Skeleton](_skeleton_.md).
```
<VirtualScroller :items="items" :itemSize="50" showLoader :delay="250" class="border border-surface-200 dark:border-surface-700 rounded" style="width: 200px; height: 200px">
    <template v-slot:item="{ item, options }">
        <div :class="['flex items-center p-2', { 'bg-surface-100 dark:bg-surface-700': options.odd }]" style="height: 50px">{{ item }}</div>
    </template>
</VirtualScroller>
<VirtualScroller :items="items" :itemSize="50" showLoader :delay="250" class="border border-surface-200 dark:border-surface-700 rounded" style="width: 200px; height: 200px">
    <template v-slot:item="{ item, options }">
        <div :class="['flex items-center p-2', { 'bg-surface-100 dark:bg-surface-700': options.odd }]" style="height: 50px">{{ item }}</div>
    </template>
    <template v-slot:loader="{ options }">
        <div :class="['flex items-center p-2', { 'bg-surface-100 dark:bg-surface-700': options.odd }]" style="height: 50px">
            <Skeleton :width="options.even ? '60%' : '50%'" height="1.3rem" />
        </div>
    </template>
</VirtualScroller>
```
## Lazy [#](_virtualscroller_.md#lazy)

Lazy mode is handy to deal with large datasets, instead of loading the entire data, small chunks of data is loaded on demand. To implement lazy loading, enable the _lazy_property and implement _onLazyLoad_ callback to return data.
```
<VirtualScroller :items="lazyItems" :itemSize="50" showLoader :delay="250" :loading="lazyLoading" lazy @lazy-load="onLazyLoad" class="border border-surface-200 dark:border-surface-700 rounded" style="width: 200px; height: 200px">
    <template v-slot:item="{ item, options }">
        <div :class="['flex items-center p-2', { 'bg-surface-100 dark:bg-surface-700': options.odd }]" style="height: 50px">{{ item }}</div>
    </template>
</VirtualScroller>
```
## Accessibility [#](_virtualscroller_.md#accessibility)

### Screen Reader

VirtualScroller has no specific role is enforced, still you may use any aria role and attributes as any valid attribute is passed to the container element.

### Keyboard Support

Component does not include any built-in interactive elements.