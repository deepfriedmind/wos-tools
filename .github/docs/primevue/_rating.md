---
url: https://primevue.org/rating
scrapeDate: 2025-04-09T00:36:42.147Z
library: primevue

exactVersionMatch: false
---

## Rating

Rating component is a star based selection input.

## Import [#](_rating_.md#import)
```
import Rating from 'primevue/rating';
```
## Basic [#](_rating_.md#basic)

Rating is used with the _v-model_ property for two-way value binding.
```
<Rating v-model="value" />
```
## Forms [#](_rating_.md#forms)

Rating integrates seamlessly with the [PrimeVue Forms](_forms.md) library.
```
<Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit" class="flex flex-col gap-4 w-40">
    <div class="flex flex-col items-center gap-2">
        <Rating name="rating" />
        <Message v-if="$form.rating?.invalid" severity="error" size="small" variant="simple">{{ $form.rating.error?.message }}</Message>
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
</Form>
```
## Number of Stars [#](_rating_.md#numberofstars)

Number of stars to display is defined with _stars_ property.
```
<Rating v-model="value" :stars="10" />
```
## Template [#](_rating_.md#template)

Custom icons are used to override the default icons with _onicon_, _officon_ and _cancelicon_ slots.
```
<Rating v-model="value">
    <template #onicon>
        <img src="/images/rating/custom-onicon.png" height="24" width="24" />
    </template>
    <template #officon>
        <img src="/images/rating/custom-officon.png" height="24" width="24" />
    </template>
</Rating>
```
## ReadOnly [#](_rating_.md#readonly)

When _readOnly_ present, value cannot be edited.
```
<Rating v-model="value" readonly />
```
## Disabled [#](_rating_.md#disabled)

When _disabled_ is present, a visual hint is applied to indicate that the Knob cannot be interacted with.
```
<Rating v-model="value" disabled />
```
## Accessibility [#](_rating_.md#accessibility)

### Screen Reader

Rating component internally uses radio buttons that are only visible to screen readers. The value to read for item is retrieved from the [locale](_configuration_.md#locale) API via _star_ and _stars_ of the _aria_ property.

### Keyboard Support

Keyboard interaction is derived from the native browser handling of radio buttons in a group.

Key

Function

_tab_

Moves focus to the star representing the value, if there is none then first star receives the focus.

_left arrow__up arrow_

Moves focus to the previous star, if there is none then last radio button receives the focus.

_right arrow__down arrow_

Moves focus to the next star, if there is none then first star receives the focus.

_space_

If the focused star does not represent the value, changes the value to the star value.