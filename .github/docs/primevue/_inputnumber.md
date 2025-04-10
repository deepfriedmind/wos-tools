---
url: https://primevue.org/inputnumber
scrapeDate: 2025-04-09T00:36:30.707Z
library: primevue

exactVersionMatch: false
---

## InputNumber

InputNumber is an input component to provide numerical input.

## Import [#](_inputnumber_.md#import)
```
import InputNumber from 'primevue/inputnumber';
```
## Numerals [#](_inputnumber_.md#numerals)

InputNumber is used with the _v-model_ property for two-way value binding.

Integer Only

Without Grouping

Min-Max Fraction Digits

Min-Max Boundaries
```
<InputNumber v-model="value1" inputId="integeronly" fluid />
<InputNumber v-model="value2" inputId="withoutgrouping" :useGrouping="false" fluid />
<InputNumber v-model="value3" inputId="minmaxfraction" :minFractionDigits="2" :maxFractionDigits="5" fluid />
<InputNumber v-model="value4" inputId="minmax" :min="0" :max="100" fluid />
```
## Forms [#](_inputnumber_.md#forms)

InputNumber integrates seamlessly with the [PrimeVue Forms](_forms.md) library.
```
<Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-56">
    <div class="flex flex-col gap-1">
        <InputNumber name="amount" fluid />
        <Message v-if="$form.amount?.invalid" severity="error" size="small" variant="simple">{{ $form.amount.error?.message }}</Message>
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
</Form>
```
## Locale [#](_inputnumber_.md#locale)

Localization information such as grouping and decimal symbols are defined with the _locale_ property which defaults to the user locale.

User Locale

United States Locale

German Locale

Indian Locale
```
<InputNumber v-model="value1" inputId="locale-user" :minFractionDigits="2" fluid />
<InputNumber v-model="value2" inputId="locale-us" locale="en-US" :minFractionDigits="2" fluid />
<InputNumber v-model="value3" inputId="locale-german" locale="de-DE" :minFractionDigits="2" fluid />
<InputNumber v-model="value4" inputId="locale-indian" locale="en-IN" :minFractionDigits="2" fluid />
```
## Currency [#](_inputnumber_.md#currency)

Monetary values are enabled by setting _mode_ property as _currency_. In this setting, _currency_ property also needs to be defined using ISO 4217 standard such as "USD" for the US dollar.

United States

Germany

India

Japan
```
<InputNumber v-model="value1" inputId="currency-us" mode="currency" currency="USD" locale="en-US" fluid />
<InputNumber v-model="value2" inputId="currency-germany" mode="currency" currency="EUR" locale="de-DE" />
<InputNumber v-model="value3" inputId="currency-india" mode="currency" currency="INR" currencyDisplay="code" locale="en-IN" fluid />
<InputNumber v-model="value4" inputId="currency-japan" mode="currency" currency="JPY" locale="jp-JP" fluid />
```
## Prefix & Suffix [#](_inputnumber_.md#prefixsuffix)

Custom texts e.g. units can be placed before or after the input section with the _prefix_ and _suffix_ properties.

Mile

Percent

Expiry

Temperature
```
<InputNumber v-model="value1" inputId="mile" suffix=" mi" fluid />
<InputNumber v-model="value2" inputId="percent" prefix="%" fluid />
<InputNumber v-model="value3" inputId="expiry" prefix="Expires in " suffix=" days" fluid />
<InputNumber v-model="value4" inputId="temperature" prefix="&uarr; " suffix="℃" :min="0" :max="40" fluid />
```
## Buttons [#](_inputnumber_.md#buttons)

Spinner buttons are enabled using the _showButtons_ property and layout is defined with the _buttonLayout_.

Stacked

Min-Max Boundaries

Horizontal with Step
```
<InputNumber v-model="value1" inputId="stacked-buttons" showButtons mode="currency" currency="USD" fluid />
<InputNumber v-model="value2" inputId="minmax-buttons" mode="decimal" showButtons :min="0" :max="100" fluid />
<InputNumber v-model="value3" inputId="horizontal-buttons" showButtons buttonLayout="horizontal" :step="0.25" mode="currency" currency="EUR" fluid>
    <template #incrementbuttonicon>
        <span class="pi pi-plus" />
    </template>
    <template #decrementbuttonicon>
        <span class="pi pi-minus" />
    </template>
</InputNumber>
```
## Vertical [#](_inputnumber_.md#vertical)

Buttons can also placed vertically by setting _buttonLayout_ as _vertical_.
```
<InputNumber v-model="value" showButtons buttonLayout="vertical" style="width: 3rem" :min="0" :max="99">
    <template #incrementbuttonicon>
        <span class="pi pi-plus" />
    </template>
    <template #decrementbuttonicon>
        <span class="pi pi-minus" />
    </template>
</InputNumber>
```
## Filled [#](_inputnumber_.md#filled)

Specify the _variant_ property as _filled_ to display the component with a higher visual emphasis than the default _outlined_ style.
```
<InputNumber v-model="value" variant="filled" />
```
## Float Label [#](_inputnumber_.md#floatlabel)

A floating label appears on top of the input field when focused. Visit [FloatLabel](_floatlabel_.md) documentation for more information.

Over LabelIn LabelOn Label
```
<FloatLabel>
    <InputNumber v-model="value1" inputId="over_label" mode="currency" currency="USD" locale="en-US" />
    <label for="over_label">Over Label</label>
</FloatLabel>
<FloatLabel variant="in">
    <InputNumber v-model="value2" inputId="in_label" mode="currency" currency="USD" locale="en-US" variant="filled" />
    <label for="in_label">In Label</label>
</FloatLabel>
<FloatLabel variant="on">
    <InputNumber v-model="value3" inputId="on_label" mode="currency" currency="USD" locale="en-US" />
    <label for="on_label">On Label</label>
</FloatLabel>
```
## Ifta Label [#](_inputnumber_.md#iftalabel)

IftaLabel is used to create infield top aligned labels. Visit [IftaLabel](_iftalabel_.md) documentation for more information.

Price
```
<IftaLabel>
    <InputNumber v-model="value" inputId="price_input" mode="currency" currency="USD" locale="en-US" variant="filled" />
    <label for="price_input">Price</label>
</IftaLabel>
```
## Sizes [#](_inputnumber_.md#sizes)

InputNumber provides _small_ and _large_ sizes as alternatives to the base.
```
<InputNumber v-model="value1" size="small" placeholder="Small" mode="currency" currency="USD" locale="en-US" />
<InputNumber v-model="value2" placeholder="Normal" mode="currency" currency="USD" locale="en-US" />
<InputNumber v-model="value3" size="large" placeholder="Large" mode="currency" currency="USD" locale="en-US" />
```
## Invalid [#](_inputnumber_.md#invalid)

Invalid state is displayed using the _invalid_ prop to indicate a failed validation. You can use this style when integrating with form validation libraries.
```
<InputNumber v-model="value1" :invalid="value1 === null" mode="decimal" :minFractionDigits="2" placeholder="Amount" />
<InputNumber v-model="value2" :invalid="value2 === null" mode="decimal" :minFractionDigits="2" variant="filled" placeholder="Amount" />
```
## Disabled [#](_inputnumber_.md#disabled)

When _disabled_ is present, the element cannot be edited and focused.
```
<InputNumber v-model="value" disabled prefix="%" />
```
## Accessibility [#](_inputnumber_.md#accessibility)

### Screen Reader

Value to describe the component can either be provided via _label_ tag combined with _inputId_ prop or using _aria-labelledby_, _aria-label_ props. The input element uses _spinbutton_ role in addition to the _aria-valuemin_, _aria-valuemax_ and _aria-valuenow_ attributes.
```
<label for="price">Price</label>
<InputNumber inputId="price" />
<span id="label_number">Number</span>
<InputNumber aria-labelledby="label_number" />
<InputNumber aria-label="Number" />
```
### Keyboard Support

Key

Function

_tab_

Moves focus to the input.

_up arrow_

Increments the value.

_down arrow_

Decrements the value.

_home_

Set the minimum value if provided.

_end_

Set the maximum value if provided.