---
url: https://primevue.org/inputmask
scrapeDate: 2025-04-09T00:36:30.567Z
library: primevue

exactVersionMatch: false
---

## InputMask

InputMask component is used to enter input in a certain format such as numeric, date, currency, email and phone.

## Import [#](_inputmask_.md#import)
```
import InputMask from 'primevue/inputmask';
```
## Basic [#](_inputmask_.md#basic)

InputMask is used with the _v-model_ property for two-way value binding.
```
<InputMask id="basic" v-model="value" mask="99-999999" placeholder="99-999999" />
```
## Forms [#](_inputmask_.md#forms)

InputMask integrates seamlessly with the [PrimeVue Forms](_forms.md) library.
```
<Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-56">
    <div class="flex flex-col gap-1">
        <InputMask name="serialNumber" mask="99-999999" placeholder="99-999999" fluid />
        <Message v-if="$form.serialNumber?.invalid" severity="error" size="small" variant="simple">{{ $form.serialNumber.error?.message }}</Message>
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
</Form>
```
## Mask [#](_inputmask_.md#mask)

Mask format can be a combination of the following definitions; _a_ for alphabetic characters, _9_ for numeric characters and _\*_ for alphanumberic characters. In addition, formatting characters like _(_, _)_ , _\-_ are also accepted.
```
<div class="flex-auto">
    <label for="ssn" class="font-bold block mb-2">SSN</label>
    <InputMask id="ssn" v-model="value1" mask="999-99-9999" placeholder="999-99-9999" fluid />
</div>
<div class="flex-auto">
    <label for="phone" class="font-bold block mb-2">Phone</label>
    <InputMask id="phone" v-model="value2" mask="(999) 999-9999" placeholder="(999) 999-9999" fluid />
</div>
<div class="flex-auto">
    <label for="serial" class="font-bold block mb-2">Serial</label>
    <InputMask id="serial" v-model="value3" mask="a*-999-a999" placeholder="a*-999-a999" fluid />
</div>
```
## Optional [#](_inputmask_.md#optional)

When the input does not complete the mask definition, it is cleared by default. Use _autoClear_ property to control this behavior. In addition, _?_ is used to mark anything after the question mark optional.
```
<InputMask v-model="value" mask="(999) 999-9999? x99999" placeholder="(999) 999-9999? x99999" />
```
## SlotChar [#](_inputmask_.md#slotchar)

Default placeholder for a mask is underscore that can be customized using _slotChar_ property.
```
<InputMask id="basic" v-model="value" placeholder="99/99/9999" mask="99/99/9999" slotChar="mm/dd/yyyy" />
```
## Filled [#](_inputmask_.md#filled)

Specify the _variant_ property as _filled_ to display the component with a higher visual emphasis than the default _outlined_ style.
```
<InputMask id="basic" v-model="value" variant="filled" mask="99-999999" placeholder="99-999999" />
```
## Float Label [#](_inputmask_.md#floatlabel)

FloatLabel visually integrates a label with its form element. Visit [FloatLabel](_floatlabel_.md) documentation for more information.

Over LabelIn LabelOn Label
```
<FloatLabel>
    <InputMask id="over_label" v-model="value1" mask="999-99-9999" />
    <label for="over_label">Over Label</label>
</FloatLabel>
<FloatLabel variant="in">
    <InputMask id="in_label" v-model="value2" mask="999-99-9999" variant="filled" />
    <label for="in_label">In Label</label>
</FloatLabel>
<FloatLabel variant="on">
    <InputMask id="on_label" v-model="value3" mask="999-99-9999" />
    <label for="on_label">On Label</label>
</FloatLabel>
```
## Ifta Label [#](_inputmask_.md#iftalabel)

IftaLabel is used to create infield top aligned labels. Visit [IftaLabel](_iftalabel_.md) documentation for more information.

SSN
```
<IftaLabel>
    <InputMask id="ssn" v-model="value" mask="999-99-9999" variant="filled" />
    <label for="ssn">SSN</label>
</IftaLabel>
```
## Sizes [#](_inputmask_.md#sizes)

InputMask provides _small_ and _large_ sizes as alternatives to the base.
```
<InputMask v-model="value1" placeholder="Small" size="small" mask="99-999999" />
<InputMask v-model="value2" placeholder="Normal" mask="99-999999" />
<InputMask v-model="value3" placeholder="Large" size="large" mask="99-999999" />
```
## Invalid [#](_inputmask_.md#invalid)

Invalid state is displayed using the _invalid_ prop to indicate a failed validation. You can use this style when integrating with form validation libraries.
```
<InputMask v-model="value1" mask="99-999999" placeholder="Serial Key" :invalid="!value1" />
<InputMask v-model="value2" mask="99-999999" placeholder="Serial Key" :invalid="!value2" variant="filled" />
```
## Disabled [#](_inputmask_.md#disabled)

When _disabled_ is present, the element cannot be edited and focused.
```
<InputMask mask="99-999999" placeholder="Disabled" disabled />
```
## Accessibility [#](_inputmask_.md#accessibility)

### Screen Reader

InputMask component renders a native input element that implicitly includes any passed prop. Value to describe the component can either be provided via _label_ tag combined with _id_ prop or using _aria-labelledby_, _aria-label_ props.
```
<label for="date">Date</label>
<InputMask id="date" />
<span id="phone">Phone</span>
<InputMask aria-labelledby="phone" />
<InputMask aria-label="Age" />
```
### Keyboard Support

Key

Function

_tab_

Moves focus to the input.