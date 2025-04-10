---
url: https://primevue.org/slider
scrapeDate: 2025-04-09T00:36:41.687Z
library: primevue

exactVersionMatch: false
---

## Slider

Slider is a component to provide input with a drag handle.

## Import [#](_slider_.md#import)
```
import Slider from 'primevue/slider';
```
## Basic [#](_slider_.md#basic)

Slider is used with the _v-model_ property for two-way value binding.
```
<Slider v-model="value" class="w-56" />
```
## Forms [#](_slider_.md#forms)

Slider integrates seamlessly with the [PrimeVue Forms](_forms.md) library.
```
<Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-56">
    <div class="flex flex-col gap-4">
        <Slider name="slider" />
        <Message v-if="$form.slider?.invalid" severity="error" size="small" variant="simple">{{ $form.slider.error?.message }}</Message>
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
</Form>
```
## Input [#](_slider_.md#input)

Slider is connected to an input field using two-way binding.
```
<InputText v-model.number="value" />
<Slider v-model="value" />
```
## Step [#](_slider_.md#step)

Size of each movement is defined with the _step_ property.
```
<Slider v-model="value" :step="20" class="w-56" />
```
## Range [#](_slider_.md#range)

When _range_ property is present, slider provides two handles to define two values. In range mode, value should be an array instead of a single value.
```
<Slider v-model="value" range class="w-56" />
```
## Filter [#](_slider_.md#filter)

Image filter implementation using multiple sliders.

![user header](https://primefaces.org/cdn/primevue/images/card-vue.jpg)
```
<img alt="user header" class="w-full md:w-80 rounded mb-6" src="https://primefaces.org/cdn/primevue/images/card-vue.jpg" :style="filterStyle" />
<SelectButton v-model="filter" :options="filterOptions" optionLabel="label" optionValue="value" class="mb-4" />
<Slider v-model="filterValues[filter]" class="w-56" :min="0" :max="200" />
```
## Vertical [#](_slider_.md#vertical)

Default layout of slider is _horizontal_, use _orientation_ property for the alternative _vertical_ mode.
```
<Slider v-model="value" orientation="vertical" class="h-56" />
```
## Accessibility [#](_slider_.md#accessibility)

### Screen Reader

Slider element component uses _slider_ role on the handle in addition to the _aria-orientation_, _aria-valuemin_, _aria-valuemax_ and _aria-valuenow_ attributes. Value to describe the component can be defined using _aria-labelledby_ and _aria-label_ props.
```
<span id="label_number">Number</span>
<Slider aria-labelledby="label_number" />
<Slider aria-label="Number" />
```
### Keyboard Support

Key

Function

_tab_

Moves focus to the slider.

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