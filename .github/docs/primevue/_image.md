---
url: https://primevue.org/image
scrapeDate: 2025-04-09T00:37:02.705Z
library: primevue

exactVersionMatch: false
---

## Image

Displays a single image with preview and tranformation options.

## Import [#](_image_.md#import)
```
import Image from 'primevue/image';
```
## Basic [#](_image_.md#basic)

Image is used similar to the standard _img_ element.

![Image](https://primefaces.org/cdn/primevue/images/galleria/galleria10.jpg)
```
<Image src="/image.jpg" alt="Image" width="250" />
```
## Preview [#](_image_.md#preview)

Enabling _preview_ mode displays a modal layer when the image is clicked to provide transformation options such as rotating and zooming.

![Image](https://primefaces.org/cdn/primevue/images/galleria/galleria10.jpg)
```
<Image src="/image.jpg" alt="Image" width="250" preview />
```
## Template [#](_image_.md#template)

An eye icon is displayed by default when the image is hovered in preview mode, use the _previewicon_ slot for custom content. In addition, the _image_ and _preview_ slots are available to define the thumbnail and detailed image respectively.

![image](https://primefaces.org/cdn/primevue/images/galleria/galleria11.jpg)
```
<Image alt="Image" preview>
    <template #previewicon>
        <i class="pi pi-search"></i>
    </template>
    <template #image>
        <img src="/thumbnail.jpg" alt="image" />
    </template>
    <template #preview="slotProps">
        <img src="/image.jpg" alt="preview" :style="slotProps.style" @click="slotProps.onClick" />
    </template>
</Image>
```
## Accessibility [#](_image_.md#accessibility)

### Screen Reader

The preview button is a native _button_ element with an _aria-label_ that refers to the _aria.zoomImage_ property of the [locale](_configuration_.md#locale) API by default, with _previewButtonProps_ you may use your own aria roles and attributes as any valid attribute is passed to the button element implicitly.

When preview is active, _dialog_ role with _aria-modal_ is applied to the overlay image container.

Button controls use _aria.rotateRight_, _aria.rotateLeft_, _aria.zoomIn_, _aria.zoomOut_ and _aria.close_ from the [locale](_configuration_.md#locale) API as _aria-label_.

### ButtonBar Keyboard Support

When preview is activated, close button receives the initial focus.

Key

Function

_tab_

Moves focus through button bar.

_enter_

Activates the button.

_space_

Activates the button.

_esc_

Closes the image preview.