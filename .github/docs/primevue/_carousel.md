---
url: https://primevue.org/carousel
scrapeDate: 2025-04-09T00:37:02.429Z
library: primevue

exactVersionMatch: false
---

## Carousel

Carousel is a content slider featuring various customization options.

## Import [#](_carousel_.md#import)
```
import Carousel from 'primevue/carousel';
```
## Basic [#](_carousel_.md#basic)

Carousel requires a collection of items as its value along with a template to render each item.
```
<Carousel :value="products" :numVisible="3" :numScroll="3" :responsiveOptions="responsiveOptions">
    <template #item="slotProps">
        <div class="border border-surface-200 dark:border-surface-700 rounded m-2  p-4">
            <div class="mb-4">
                <div class="relative mx-auto">
                    <img :src="'https://primefaces.org/cdn/primevue/images/product/' + slotProps.data.image" :alt="slotProps.data.name" class="w-full rounded" />
                    <Tag :value="slotProps.data.inventoryStatus" :severity="getSeverity(slotProps.data.inventoryStatus)" class="absolute" style="left:5px; top: 5px"/>
                </div>
            </div>
            <div class="mb-4 font-medium">{{ slotProps.data.name }}</div>
            <div class="flex justify-between items-center">
                <div class="mt-0 font-semibold text-xl">${{ slotProps.data.price }}</div>
                <span>
                    <Button icon="pi pi-heart" severity="secondary" outlined />
                    <Button icon="pi pi-shopping-cart" class="ml-2"/>
                </span>
            </div>
        </div>
    </template>
</Carousel>
```
## Circular [#](_carousel_.md#circular)

When _autoplayInterval_ is defined in milliseconds, items are scrolled automatically. In addition, for infinite scrolling _circular_ property needs to be added which is enabled automatically in auto play mode.
```
<Carousel :value="products" :numVisible="3" :numScroll="1" :responsiveOptions="responsiveOptions" circular :autoplayInterval="3000">
    <template #item="slotProps">
        <div class="border border-surface-200 dark:border-surface-700 rounded m-2  p-4">
            <div class="mb-4">
                <div class="relative mx-auto">
                    <img :src="'https://primefaces.org/cdn/primevue/images/product/' + slotProps.data.image" :alt="slotProps.data.name" class="w-full rounded" />
                    <Tag :value="slotProps.data.inventoryStatus" :severity="getSeverity(slotProps.data.inventoryStatus)" class="absolute" style="left:5px; top: 5px"/>
                </div>
            </div>
            <div class="mb-4 font-medium">{{ slotProps.data.name }}</div>
            <div class="flex justify-between items-center">
                <div class="mt-0 font-semibold text-xl">${{ slotProps.data.price }}</div>
                <span>
                    <Button icon="pi pi-heart" severity="secondary" outlined />
                    <Button icon="pi pi-shopping-cart" class="ml-2"/>
                </span>
            </div>
        </div>
    </template>
</Carousel>
```
## Responsive [#](_carousel_.md#responsive)

Carousel supports specific configuration per screen size with the _responsiveOptions_ property that takes an array of objects where each object defines the max-width _breakpoint_, _numVisible_ for the number of items items per page and _numScroll_ for number of items to scroll. When _responsiveOptions_ is defined, the _numScroll_ and _numVisible_ properties of the Carousel are used as default when there is breakpoint that applies.
```
<Carousel :value="products" :numVisible="3" :numScroll="1" :responsiveOptions="responsiveOptions">
    <template #item="slotProps">
        <div class="border border-surface-200 dark:border-surface-700 rounded m-2  p-4">
            <div class="mb-4">
                <div class="relative mx-auto">
                    <img :src="'https://primefaces.org/cdn/primevue/images/product/' + slotProps.data.image" :alt="slotProps.data.name" class="w-full rounded" />
                    <Tag :value="slotProps.data.inventoryStatus" :severity="getSeverity(slotProps.data.inventoryStatus)" class="absolute" style="left:5px; top: 5px"/>
                </div>
            </div>
            <div class="mb-4 font-medium">{{ slotProps.data.name }}</div>
            <div class="flex justify-between items-center">
                <div class="mt-0 font-semibold text-xl">${{ slotProps.data.price }}</div>
                <span>
                    <Button icon="pi pi-heart" severity="secondary" outlined />
                    <Button icon="pi pi-shopping-cart" class="ml-2"/>
                </span>
            </div>
        </div>
    </template>
</Carousel>
```
## Vertical [#](_carousel_.md#vertical)

To create a vertical Carousel, _orientation_ needs to be set to _vertical_ along with a _verticalViewPortHeight_.
```
<Carousel :value="products" :numVisible="1" :numScroll="1" orientation="vertical" verticalViewPortHeight="330px" containerClass="flex items-center">
    <template #item="slotProps">
        <div class="border border-surface-200 dark:border-surface-700 rounded m-2  p-4">
            <div class="mb-4">
                <div class="relative mx-auto">
                    <img :src="'https://primefaces.org/cdn/primevue/images/product/' + slotProps.data.image" :alt="slotProps.data.name" class="w-full rounded" />
                    <Tag :value="slotProps.data.inventoryStatus" :severity="getSeverity(slotProps.data.inventoryStatus)" class="absolute" style="left:5px; top: 5px"/>
                </div>
            </div>
            <div class="mb-4 font-medium">{{ slotProps.data.name }}</div>
            <div class="flex justify-between items-center">
                <div class="mt-0 font-semibold text-xl">${{ slotProps.data.price }}</div>
                <span>
                    <Button icon="pi pi-heart" severity="secondary" outlined />
                    <Button icon="pi pi-shopping-cart" class="ml-2"/>
                </span>
            </div>
        </div>
    </template>
</Carousel>
```
## Accessibility [#](_carousel_.md#accessibility)

### Screen Reader

Carousel uses _region_ role and since any attribute is passed to the main container element, attributes such as _aria-label_ and _aria-roledescription_ can be used as well. The slides container has _aria-live_ attribute set as "polite" if carousel is not in autoplay mode, otherwise "off" would be the value in autoplay.

A slide has a _group_ role with an aria-label that refers to the _aria.slideNumber_ property of the [locale](_configuration_.md#locale) API. Similarly _aria.slide_ is used as the _aria-roledescription_ of the item. Inactive slides are hidden from the readers with _aria-hidden_.

Next and Previous navigators are button elements with _aria-label_ attributes referring to the _aria.prevPageLabel_ and _aria.nextPageLabel_ properties of the [locale](_configuration_.md#locale) API by default respectively, you may still use your own aria roles and attributes as any valid attribute is passed to the button elements implicitly by using _nextButtonProps_ and _prevButtonProps_.

Quick navigation elements are button elements with an _aria-label_ attribute referring to the _aria.pageLabel_ of the [locale](_configuration_.md#locale) API. Current page is marked with _aria-current_.

### Next/Prev Keyboard Support

Key

Function

_tab_

Moves focus through interactive elements in the carousel.

_enter_

Activates navigation.

_space_

Activates navigation.

### Quick Navigation Keyboard Support

Key

Function

_tab_

Moves focus through the active slide link.

_enter_

Activates the focused slide link.

_space_

Activates the focused slide link.

_right arrow_

Moves focus to the next slide link.

_left arrow_

Moves focus to the previous slide link.

_home_

Moves focus to the first slide link.

_end_

Moves focus to the last slide link.