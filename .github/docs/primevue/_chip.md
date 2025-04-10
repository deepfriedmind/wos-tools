---
url: https://primevue.org/chip
scrapeDate: 2025-04-09T00:37:02.207Z
library: primevue

exactVersionMatch: false
---

## Chip

Chip represents entities using icons, labels and images.

## Import [#](_chip_.md#import)
```
import Chip from 'primevue/chip';
```
## Basic [#](_chip_.md#basic)

A basic chip with a text is created with the _label_ property. In addition when _removable_ is added, a delete icon is displayed to remove a chip.
```
<Chip label="Action" />
<Chip label="Comedy" />
<Chip label="Mystery" />
<Chip label="Thriller" removable />
```
## Icon [#](_chip_.md#icon)

A font icon next to the label can be displayed with the _icon_ property.
```
<Chip label="Apple" icon="pi pi-apple" />
<Chip label="Facebook" icon="pi pi-facebook" />
<Chip label="Google" icon="pi pi-google" />
<Chip label="Microsoft" icon="pi pi-microsoft" removable />
<Chip label="GitHub" icon="pi pi-github" removable>
    <template #removeicon="{ removeCallback, keydownCallback }">
        <i class="pi pi-minus-circle" @click="removeCallback" @keydown="keydownCallback" />
    </template>
</Chip>
```
## Image [#](_chip_.md#image)

The _image_ property is used to display an image like an avatar.

![](https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png)

Amy Elsner

![](https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png)

Asiya Javayant

![](https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png)

Onyama Limba

![](https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png)

Xuxue Feng
```
<Chip label="Amy Elsner" image="/images/avatar/amyelsner.png" />
<Chip label="Asiya Javayant" image="/images/avatar/asiyajavayant.png" />
<Chip label="Onyama Limba" image="/images/avatar/onyamalimba.png" />
<Chip label="Xuxue Feng" image="/images/avatar/xuxuefeng.png" removable />
```
## Template [#](_chip_.md#templatedoc)

The default slot allows displaying custom content inside a chip.
```
<Chip class="py-0 pl-0 pr-4">
    <span class="bg-primary text-primary-contrast rounded-full w-8 h-8 flex items-center justify-center">P</span>
    <span class="ml-2 font-medium">PRIME</span>
</Chip>
```
## Accessibility [#](_chip_.md#accessibility)

### Screen Reader

Chip uses the _label_ property as the default _aria-label_, since any attribute is passed to the root element _aria-labelledby_ or _aria-label_ can be used to override the default behavior. Removable chips have a _tabindex_ and focusable with the tab key.

### Keyboard Support

Key

Function

_backspace_

Hides removable.

_enter_

Hides removable.