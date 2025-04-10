---
url: https://primevue.org/knob
scrapeDate: 2025-04-09T00:36:32.858Z
library: primevue

exactVersionMatch: false
---

## Knob

Knob is a form component to define number inputs with a dial.

## Import [#](_knob_.md#import)
```
import Knob from 'primevue/knob';
```
## Basic [#](_knob_.md#basic)

Knob is used with the _v-model_ property for two-way value binding.

## Forms [#](_knob_.md#forms)

Knob integrates seamlessly with the [PrimeVue Forms](_forms.md) library.
```
<Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit" class="flex flex-col gap-4">
    <div class="flex flex-col items-center gap-1">
        <Knob name="knob" />
        <Message v-if="$form.knob?.invalid" severity="error" size="small" variant="simple">{{ $form.knob.error?.message }}</Message>
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
</Form>
```
## Min/Max [#](_knob_.md#minmax)

Boundaries are configured with the _min_ and _max_ values whose defaults are 0 and 100 respectively.
```
<Knob v-model="value" :min="-50" :max="50" />
```
## Step [#](_knob_.md#step)

Step factor is 1 by default and can be customized with _step_ option.
```
<Knob v-model="value5" :step="10" />
```
## Template [#](_knob_.md#template)

The label can be customized with the _valueTemplate_ property using either a template string or a function.
```
<Knob v-model="value" valueTemplate="{value}%" />
```
## Stroke [#](_knob_.md#stroke)

The border size is specified with the _stroke_ property as a number in pixels.
```
<Knob v-model="value" :strokeWidth="5" />
```
## Size [#](_knob_.md#size)

Diameter of the knob is defined in pixels using the _size_ property.
```
<Knob v-model="value" :size="200" />
```
## Color [#](_knob_.md#color)

_valueColor_ defines the value color, _rangeColor_ defines the range background and similarly _textColor_ configures the color of the value text. In addition, _strokeWidth_ is used to determine the width of the stroke of range and value sections.
```
<Knob v-model="value" valueColor="SlateGray" rangeColor="MediumTurquoise" />
```
## Reactive [#](_knob_.md#reactive)

Knob can be controlled with custom controls as well.
```
<Knob v-model="value" :size="150" readonly />
<div class="flex gap-2">
    <Button icon="pi pi-plus" @click="value++" :disabled="value >= 100" />
    <Button icon="pi pi-minus" @click="value--" :disabled="value <= 0" />
</div>
```
## ReadOnly [#](_knob_.md#readonly)

When _readonly_ present, value cannot be edited.
```
<Knob v-model="value" readonly />
```
## Disabled [#](_knob_.md#disabled)

When _disabled_ is present, a visual hint is applied to indicate that the Knob cannot be interacted with.
```
<Knob v-model="value" disabled />
```
## Accessibility [#](_knob_.md#accessibility)

### Screen Reader

Knob element component uses _slider_ role in addition to the _aria-valuemin_, _aria-valuemax_ and _aria-valuenow_ attributes. Value to describe the component can be defined using _aria-labelledby_ and _aria-label_ props.
```
<span id="label_number">Number</span>
<Knob aria-labelledby="label_number" />
<Knob aria-label="Number" />
```
### Keyboard Support

Key

Function

_tab_

Moves focus to the slider.

_left arrow__down arrow_

Decrements the value.

_right arrow__up arrow_

Increments the value.

_home_

Set the minimum value.

_end_

Set the maximum value.

_page up_

Increments the value by 10 steps.

_page down_

Decrements the value by 10 steps.