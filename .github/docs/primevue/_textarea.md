---
url: https://primevue.org/textarea
scrapeDate: 2025-04-09T00:36:41.473Z
library: primevue

exactVersionMatch: false
---

## Textarea

Textarea adds styling and autoResize functionality to standard textarea element.

## Import [#](_textarea_.md#import)
```
import Textarea from 'primevue/textarea';
```
## Basic [#](_textarea_.md#basic)

Textarea is used with the _v-model_ property for two-way value binding.
```
<Textarea v-model="value" rows="5" cols="30" />
```
## Forms [#](_textarea_.md#forms)

Textarea integrates seamlessly with the [PrimeVue Forms](_forms.md) library.
```
<Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit" class="flex flex-col gap-4">
    <div class="flex flex-col gap-1">
        <Textarea name="address" rows="5" cols="30" style="resize: none" />
        <Message v-if="$form.address?.invalid" severity="error" size="small" variant="simple">{{ $form.address.error?.message }}</Message>
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
</Form>
```
## Auto Resize [#](_textarea_.md#auto-resize)

When _autoResize_ is enabled, textarea grows instead of displaying a scrollbar.
```
<Textarea v-model="value" autoResize rows="5" cols="30" />
```
## Filled [#](_textarea_.md#filled)

Specify the _variant_ property as _filled_ to display the component with a higher visual emphasis than the default _outlined_ style.
```
<Textarea v-model="value" variant="filled" rows="5" cols="30" />
```
## Float Label [#](_textarea_.md#floatlabel)

A floating label appears on top of the input field when focused. Visit [FloatLabel](_floatlabel_.md) documentation for more information.

Over LabelIn LabelOn Label
```
<FloatLabel>
    <Textarea id="over_label" v-model="value1" rows="5" cols="30" style="resize: none" />
    <label for="over_label">Over Label</label>
</FloatLabel>
<FloatLabel variant="in">
    <Textarea id="over_label" v-model="value2" rows="5" cols="30" style="resize: none" />
    <label for="in_label">In Label</label>
</FloatLabel>
<FloatLabel variant="on">
    <Textarea id="over_label" v-model="value3" rows="5" cols="30" style="resize: none" />
    <label for="on_label">On Label</label>
</FloatLabel>
```
## Ifta Label [#](_textarea_.md#iftalabel)

IftaLabel is used to create infield top aligned labels. Visit [IftaLabel](_iftalabel_.md) documentation for more information.

Description
```
<IftaLabel>
    <Textarea id="description" v-model="value" rows="5" cols="30" style="resize: none" />
    <label for="description">Description</label>
</IftaLabel>
```
## Sizes [#](_textarea_.md#sizes)

Textarea provides _small_ and _large_ sizes as alternatives to the base.
```
<Textarea v-model="value1" size="small" placeholder="Small" rows="3" />
<Textarea v-model="value2" placeholder="Normal" rows="3" />
<Textarea v-model="value3" size="large" placeholder="Large" rows="3" />
```
## Invalid [#](_textarea_.md#invalid)

Invalid state is displayed using the _invalid_ prop to indicate a failed validation. You can use this style when integrating with form validation libraries.
```
<Textarea v-model="value" rows="5" cols="30" :invalid="!value" style="resize: none" placeholder="Address" />
```
## Disabled [#](_textarea_.md#disabled)

When _disabled_ is present, the element cannot be edited and focused.
```
<Textarea v-model="value" rows="5" cols="30" disabled />
```
## Accessibility [#](_textarea_.md#accessibility)

### Screen Reader

Textarea component renders a native textarea element that implicitly includes any passed prop. Value to describe the component can either be provided via _label_ tag combined with _id_ prop or using _aria-labelledby_, _aria-label_ props.
```
<label for="address1">Address 1</label>
<Textarea id="address1" />
<span id="address2">Address 2</span>
<Textarea aria-labelledby="address2" />
<Textarea aria-label="Address Details"/>
```
### Keyboard Support

Key

Function

_tab_

Moves focus to the input.