---
url: https://primevue.org/galleria
scrapeDate: 2025-04-09T00:37:01.789Z
library: primevue

exactVersionMatch: false
---

## Galleria

Galleria is a content gallery component.

## Import [#](_galleria_.md#import)
```
import Galleria from 'primevue/galleria';
```
## Basic [#](_galleria_.md#basic)

Galleria requires a _value_ as a collection of images, _item_ template for the higher resolution image and _thumbnail_ template to display as a thumbnail.
```
<Galleria :value="images" :responsiveOptions="responsiveOptions" :numVisible="5" containerStyle="max-width: 640px">
    <template #item="slotProps">
        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%" />
    </template>
    <template #thumbnail="slotProps">
        <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" />
    </template>
</Galleria>
```
## Controlled [#](_galleria_.md#controlled)

Galleria can be controlled programmatically using a binding to _activeIndex_.
```
<div>
    <Button icon="pi pi-minus" @click="prev" />
    <Button icon="pi pi-plus" @click="next" severity="secondary" class="ml-2" />
</div>
<Galleria v-model:activeIndex="activeIndex" :value="images" :responsiveOptions="responsiveOptions" :numVisible="5" containerStyle="max-width: 640px">
    <template #item="slotProps">
        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%" />
    </template>
    <template #thumbnail="slotProps">
        <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" />
    </template>
</Galleria>
```
## Indicator [#](_galleria_.md#indicator)

Indicators allow quick navigation between the items.

### Click Event [#](_galleria_.md#indicatorbasic)

Indicators are displayed at the bottom by enabling _showIndicators_ property and interacted with the click event by default.
```
<Galleria :value="images" :numVisible="5" containerStyle="max-width: 640px"
    :showThumbnails="false" :showIndicators="true">
    <template #item="slotProps">
        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block" />
    </template>
</Galleria>
```
### Hover Event [#](_galleria_.md#indicatorhoverevent)

Indicators can be activated on hover instead of click if _changeItemOnIndicatorHover_ is added.
```
<Galleria :value="images" :numVisible="5" containerStyle="max-width: 640px"
    :showThumbnails="false" :showIndicators="true" :changeItemOnIndicatorHover="true">
    <template #item="slotProps">
        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block" />
    </template>
</Galleria>
```
### Position [#](_galleria_.md#indicatorposition)

Indicators can be placed at four different sides using the _indicatorsPosition_ property. In addition, enabling _showIndicatorsOnItem_ moves the indicators inside the image section.
```
<Galleria :value="images" :numVisible="5" containerStyle="max-width: 640px" :showThumbnails="false"
    :showIndicators="true" :changeItemOnIndicatorHover="true" :showIndicatorsOnItem="inside" :indicatorsPosition="position">
    <template #item="slotProps">
        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block" />
    </template>
</Galleria>
```
### Template [#](_galleria_.md#indicatortemplate)

Indicator content can be customized with the _indicator_ property that takes an index as a parameter and expects content.
```
<Galleria :value="images" :numVisible="5" containerStyle="max-width: 640px" :showThumbnails="false"
    :showIndicators="true" :changeItemOnIndicatorHover="true" :showIndicatorsOnItem="true" indicatorsPosition="left">
    <template #item="slotProps">
        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block" />
    </template>
    <template #indicator="{ index }">
        <span style="color: '#ffffff', cursor: pointer">{{ index + 1 }}</span>
    </template>
</Galleria>
```
## Thumbnail [#](_galleria_.md#thumbnail)

Thumbnails represent a smaller version of the actual content.
```
<Galleria :value="images" :responsiveOptions="responsiveOptions" :numVisible="5" :thumbnailsPosition="position" containerStyle="max-width: 640px">
    <template #item="slotProps">
        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block" />
    </template>
    <template #thumbnail="slotProps">
        <div class="grid gap-4 justify-center">
            <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block;" />
        </div>
    </template>
</Galleria>
```
## Responsive [#](_galleria_.md#responsive)

Settings per screen size is defined via the _responsiveOptions_ property.
```
<Galleria :value="images" :responsiveOptions="responsiveOptions" :numVisible="5" :circular="true" containerStyle="max-width: 640px">
    <template #item="slotProps">
        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block" />
    </template>
    <template #thumbnail="slotProps">
        <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block" />
    </template>
</Galleria>
```
## Full Screen [#](_galleria_.md#fullscreen)

In fullscreen mode content covers the whole page over a modal layer.

### With Thumbnails [#](_galleria_.md#fullscreenwiththumbnail)

Full screen mode is enabled by adding _fullScreen_ property and and visibility is controlled with a binding to _visible_ property.
```
<Galleria v-model:visible="displayBasic" :value="images" :responsiveOptions="responsiveOptions" :numVisible="9" containerStyle="max-width: 50%" :circular="true" :fullScreen="true" :showItemNavigators="true">
    <template #item="slotProps">
        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block" />
    </template>
    <template #thumbnail="slotProps">
        <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" style="display: block" />
    </template>
</Galleria>
<Button label="Show" icon="pi pi-external-link" @click="displayBasic = true" />
```
### Without Thumbnails [#](_galleria_.md#fullscreenwithoutthumnails)

Thumbnails can also be hidden in full screen mode.
```
<Galleria v-model:visible="displayBasic" :value="images" :responsiveOptions="responsiveOptions" :numVisible="9" containerStyle="max-width: 50%" :circular="true" :fullScreen="true" :showItemNavigators="true"  :showThumbnails="false">
    <template #item="slotProps">
        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block" />
    </template>
    <template #thumbnail="slotProps">
        <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" style="display: block" />
    </template>
</Galleria>
<Button label="Show" icon="pi pi-external-link" @click="displayBasic = true" />
```
### Custom Content [#](_galleria_.md#fullscreencustom)

Using _activeIndex_, Galleria is displayed with a specific initial image.
```
<Galleria v-model:activeIndex="activeIndex" v-model:visible="displayCustom" :value="images" :responsiveOptions="responsiveOptions" :numVisible="7"
    containerStyle="max-width: 850px" :circular="true" :fullScreen="true" :showItemNavigators="true" :showThumbnails="false">
    <template #item="slotProps">
        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block" />
    </template>
    <template #thumbnail="slotProps">
        <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" style="display: block" />
    </template>
</Galleria>
```
## Navigator [#](_galleria_.md#navigator)

Navigators are used to move back and forth between the images.

### With Thumbnails [#](_galleria_.md#itemthumbnails)

Add _showItemNavigators_ to display navigator elements and the left and right side.
```
<Galleria :value="images" :responsiveOptions="responsiveOptions" :numVisible="5" :circular="true" containerStyle="max-width: 640px"
    :showItemNavigators="true">
    <template #item="slotProps">
        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block;" />
    </template>
    <template #thumbnail="slotProps">
        <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" style="display: block;" />
    </template>
</Galleria>
```
### Without Thumbnails [#](_galleria_.md#itemwithouthumbnails)

Simple example with navigators only.
```
<Galleria :value="images" :responsiveOptions="responsiveOptions" :numVisible="5" :circular="true" containerStyle="max-width: 640px"
    :showItemNavigators="true" :showThumbnails="false">
    <template #item="slotProps">
        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block;" />
    </template>
    <template #thumbnail="slotProps">
        <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" style="display: block;" />
    </template>
</Galleria>
```
### Display on Hover [#](_galleria_.md#itemhover)

Navigators are displayed on hover only if _showItemNavigatorsOnHover_ is enabled.
```
<Galleria :value="images" :responsiveOptions="responsiveOptions" :numVisible="5" :circular="true" containerStyle="max-width: 640px" :showItemNavigators="true" :showItemNavigatorsOnHover="true">
    <template #item="slotProps">
        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block" />
    </template>
    <template #thumbnail="slotProps">
        <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" style="display: block" />
    </template>
</Galleria>
```
### With Indicators [#](_galleria_.md#indicators)

Navigators and Indicators can be combined as well.
```
<Galleria :value="images" :responsiveOptions="responsiveOptions" :numVisible="5" :circular="true" containerStyle="max-width: 640px"
    :showItemNavigators="true" :showThumbnails="false" :showItemNavigatorsOnHover="true" :showIndicators="true">
    <template #item="slotProps">
        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block;" />
    </template>
    <template #thumbnail="slotProps">
            <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" style="display: block;" />
    </template>
</Galleria>
```
## AutoPlay [#](_galleria_.md#autoplay)

A slideshow implementation is defined by adding _circular_ and _autoPlay_ properties.
```
<Galleria :value="images" :responsiveOptions="responsiveOptions" :numVisible="5" containerStyle="max-width: 640px"
    :circular="true" :autoPlay="true" :transitionInterval="2000">
    <template #item="slotProps">
        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block" />
    </template>
    <template #thumbnail="slotProps">
        <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" style="display: block" />
    </template>
</Galleria>
```
## Caption [#](_galleria_.md#caption)

Description of an image is specified with the _caption_ property that takes the displayed object and returns content.
```
<Galleria :value="images" :responsiveOptions="responsiveOptions" :numVisible="5" containerStyle="max-width: 640px">
    <template #item="slotProps">
        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block" />
    </template>
    <template #thumbnail="slotProps">
        <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" style="display: block" />
    </template>
    <template #caption="slotProps">
        <div class="text-xl mb-2 font-bold">{{ slotProps.item.title }}</div>
        <p class="text-white">{{ slotProps.item.alt }}</p>
    </template>
</Galleria>
```
## Advanced [#](_galleria_.md#advanced)

Advanced Galleria implementation with a custom UI.
```
<Galleria
    ref="galleria"
    v-model:activeIndex="activeIndex"
    :value="images"
    :numVisible="5"
    containerStyle="max-width: 640px"
    :showThumbnails="showThumbnails"
    :showItemNavigators="true"
    :showItemNavigatorsOnHover="true"
    :circular="true"
    :autoPlay="isAutoPlay"
    :transitionInterval="3000"
    :responsiveOptions="responsiveOptions"
    :pt="{
        root: {
            class: [{ 'flex flex-col': fullScreen }]
        },
        content: {
            class: ['relative', { 'flex-1 justify-center': fullScreen }]
        },
        thumbnails: 'absolute w-full left-0 bottom-0'
    }"
>
    <template #item="slotProps">
        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" :style="[{ width: !fullScreen ? '100%' : '', display: !fullScreen ? 'block' : '' }]" />
    </template>
    <template #thumbnail="slotProps">
        <div class="grid gap-4 justify-center">
            <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" style="display: block" />
        </div>
    </template>
    <template #footer>
        <div class="flex items-stretch bg-surface-950 text-white h-10">
            <button type="button" @click="onThumbnailButtonClick" class="bg-transparent border-none rounded-none hover:bg-white/10 text-white inline-flex justify-center items-center cursor-pointer px-3">
                <i class="pi pi-th-large"></i>
            </button>
            <button type="button" @click="toggleAutoSlide" class="bg-transparent border-none rounded-none hover:bg-white/10 text-white inline-flex justify-center items-center cursor-pointer px-3"><i :class="slideButtonIcon"></i></button>
            <span v-if="images" class="flex items-center gap-4 ml-3">
                <span class="text-sm">{{ activeIndex + 1 }}/{{ images.length }}</span>
                <span class="font-bold text-sm">{{ images[activeIndex].title }}</span>
                <span class="text-sm">{{ images[activeIndex].alt }}</span>
            </span>
            <button type="button" @click="toggleFullScreen" class="bg-transparent border-none rounded-none hover:bg-white/10 text-white inline-flex justify-center items-center cursor-pointer px-3 ml-auto">
                <i :class="fullScreenIcon"></i>
            </button>
        </div>
    </template>
</Galleria>
```
## Accessibility [#](_galleria_.md#accessibility)

### Screen Reader

Galleria uses _region_ role and since any attribute is passed to the main container element, attributes such as _aria-label_ and _aria-roledescription_ can be used as well. The slides container has _aria-live_ attribute set as "polite" if galleria is not in autoplay mode, otherwise "off" would be the value in autoplay.

A slide has a _group_ role with an aria-label that refers to the _aria.slideNumber_ property of the [locale](_configuration_.md#locale) API. Similarly _aria.slide_ is used as the _aria-roledescription_ of the item. Inactive slides are hidden from the readers with _aria-hidden_.

Next and Previous navigators are button elements with _aria-label_ attributes referring to the _aria.prevPageLabel_ and _aria.nextPageLabel_ properties of the [locale](_configuration_.md#locale) API by default respectively, you may still use your own aria roles and attributes as any valid attribute is passed to the button elements implicitly by using _nextButtonProps_ and _prevButtonProps_.

Quick navigation elements and thumnbails follow the tab pattern. They are placed inside an element with a _tablist_ role whereas each item has a _tab_ role with _aria-selected_ and _aria-controls_ attributes. The _aria-label_ attribute of a quick navigation item refers to the _aria.pageLabel_ of the [locale](_configuration_.md#locale) API. Current page is marked with _aria-current_.

In full screen mode, modal element uses _dialog_ role with _aria-modal_ enabled. The close button retrieves _aria-label_ from the _aria.close_ property of the [locale](_configuration_.md#locale) API.

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