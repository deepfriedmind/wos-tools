---
url: https://primevue.org/colorpicker
scrapeDate: 2025-04-09T00:36:31.526Z
library: primevue

exactVersionMatch: false
---

## ColorPicker

ColorPicker is an input component to select a color.

## Import [#](_colorpicker_.md#import)
```
import ColorPicker from 'primevue/colorpicker';
```
## Basic [#](_colorpicker_.md#basic)

ColorPicker is used with the _v-model_ property for two-way value binding.
```
<ColorPicker v-model="color" />
```
## Forms [#](_colorpicker_.md#forms)

ColorPicker integrates seamlessly with the [PrimeVue Forms](_forms.md) library.
```
<Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit" class="flex flex-col gap-4">
    <div class="flex flex-col items-center gap-2">
        <ColorPicker name="color" />
        <Message v-if="$form.color?.invalid" severity="error" size="small" variant="simple">{{ $form.color.error?.message }}</Message>
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
</Form>
```
## Inline [#](_colorpicker_.md#inline)

ColorPicker is displayed as a popup by default, add _inline_ property to customize this behavior.
```
<ColorPicker v-model="color" inline />
```
## Format [#](_colorpicker_.md#format)

Default color format to use in value binding is _hex_ and other possible values can be _rgb_ and _hsb_ using the _format_ property.

RGB

{"r":100,"g":102,"b":241}

HSB

{"h":239,"s":59,"b":95}
```
<ColorPicker v-model="colorHEX" inputId="cp-hex" format="hex" class="mb-4" />
<ColorPicker v-model="colorRGB" inputId="cp-rgb" format="rgb" class="mb-4" />
<ColorPicker v-model="colorHSB" inputId="cp-hsb" format="hsb" class="mb-4" />
```
## Disabled [#](_colorpicker_.md#disabled)

When _disabled_ is present, the element cannot be edited and focused.
```
<ColorPicker v-model="color" disabled />
```
## Accessibility [#](_colorpicker_.md#accessibility)

### Screen Reader

Specification does not cover a color picker [yet](https://github.com/w3c/aria/issues/930) and using a semantic native color picker is not consistent across browsers so currently component is not compatible with screen readers. In the upcoming versions, text fields will be introduced below the slider section to be able to pick a color using accessible text boxes in hsl, rgba and hex formats.

### Closed State Keyboard Support of Popup ColorPicker

Key

Function

_tab_

Moves focus to the color picker button.

_space_

Opens the popup and moves focus to the color slider.

### Popup Keyboard Support

Key

Function

_enter_

Selects the color and closes the popup.

_space_

Selects the color and closes the popup.

_escape_

Closes the popup, moves focus to the input.

### Color Picker Slider

Key

Function

_arrow keys_

Changes color.

### Hue Slider

Key

Function

_up arrow__down arrow_

Changes hue.