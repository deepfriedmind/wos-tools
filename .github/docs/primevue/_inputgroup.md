---
url: https://primevue.org/inputgroup
scrapeDate: 2025-04-09T00:36:31.781Z
library: primevue

exactVersionMatch: false
---

## InputGroup

Text, icon, buttons and other content can be grouped next to an input.

## Import [#](_inputgroup_.md#import)
```
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
```
## Basic [#](_inputgroup_.md#basic)

A group is created by wrapping the input and add-ons with the _InputGroup_ component. Each add-on element is defined as a child of _InputGroupAddon_ component.
```
<InputGroup>
    <InputGroupAddon>
        <i class="pi pi-user"></i>
    </InputGroupAddon>
    <InputText v-model="text1" placeholder="Username" />
</InputGroup>
<InputGroup>
    <InputGroupAddon>$</InputGroupAddon>
    <InputNumber v-model="number" placeholder="Price" />
    <InputGroupAddon>.00</InputGroupAddon>
</InputGroup>
<InputGroup>
    <InputGroupAddon>www</InputGroupAddon>
    <InputText v-model="text2" placeholder="Website" />
</InputGroup>
<InputGroup>
    <InputGroupAddon>
        <i class="pi pi-map"></i>
    </InputGroupAddon>
    <Select v-model="selectedCity" :options="cities" optionLabel="name" placeholder="City" />
</InputGroup>
```
## Multiple [#](_inputgroup_.md#multiple)

Multiple add-ons can be placed inside the same group.
```
<InputGroup class="sm:!w-96">
    <InputGroupAddon>
        <i class="pi pi-clock"></i>
    </InputGroupAddon>
    <InputGroupAddon>
        <i class="pi pi-star-fill"></i>
    </InputGroupAddon>
    <InputNumber placeholder="Price" />
    <InputGroupAddon>$</InputGroupAddon>
    <InputGroupAddon>.00</InputGroupAddon>
</InputGroup>
```
## Button [#](_inputgroup_.md#button)

Buttons can be placed at either side of an input element.
```
<InputGroup>
    <Button label="Search" />
    <InputText placeholder="Keyword" />
</InputGroup>
<InputGroup>
    <InputText placeholder="Keyword" />
    <InputGroupAddon>
        <Button icon="pi pi-search" severity="secondary" variant="text" @click="toggle" />
    </InputGroupAddon>
</InputGroup>
<Menu ref="menu" :model="items" popup class="!min-w-fit" />
<InputGroup>
    <InputGroupAddon>
        <Button icon="pi pi-check" severity="secondary" />
    </InputGroupAddon>
    <InputText placeholder="Vote" />
    <InputGroupAddon>
        <Button icon="pi pi-times" severity="secondary" />
    </InputGroupAddon>
</InputGroup>
```
## Checkbox & Radio [#](_inputgroup_.md#checkbox)

Checkbox and RadioButton components can be combined with an input element under the same group.
```
<InputGroup>
    <InputText placeholder="Price" />
    <InputGroupAddon>
        <RadioButton v-model="radioValue1" name="rb1" value="rb1" />
    </InputGroupAddon>
</InputGroup>
<InputGroup>
    <InputGroupAddon>
        <Checkbox v-model="checked1" :binary="true" />
    </InputGroupAddon>
    <InputText placeholder="Username" />
</InputGroup>
<InputGroup>
    <InputGroupAddon>
        <Checkbox v-model="checked2" :binary="true" />
    </InputGroupAddon>
    <InputText placeholder="Website" />
    <InputGroupAddon>
        <RadioButton v-model="radioValue2" name="rb2" value="rb2" />
    </InputGroupAddon>
</InputGroup>
```
## Float Label [#](_inputgroup_.md#floatlabel)

FloatLabel visually integrates a label with its form element. Visit [FloatLabel](_floatlabel_.md) documentation for more information.
```
<InputGroup>
    <InputGroupAddon>
        <i class="pi pi-user"></i>
    </InputGroupAddon>
    <FloatLabel>
        <InputText id="over_label" v-model="value1" />
        <label for="over_label">Over Label</label>
    </FloatLabel>
</InputGroup>
<InputGroup>
    <InputGroupAddon>$</InputGroupAddon>
    <FloatLabel variant="in">
        <InputText id="in_label" v-model="value2" />
        <label for="in_label">In Label</label>
    </FloatLabel>
    <InputGroupAddon>.00</InputGroupAddon>
</InputGroup>
<InputGroup>
    <InputGroupAddon>www</InputGroupAddon>
    <FloatLabel variant="on">
        <InputText id="on_label" v-model="value3" />
        <label for="on_label">On Label</label>
    </FloatLabel>
</InputGroup>
```
## Ifta Label [#](_inputgroup_.md#iftalabel)

IftaLabel is used to create infield top aligned labels. Visit [IftaLabel](_iftalabel_.md) documentation for more information.
```
<InputGroup class="md:w-80">
    <InputGroupAddon>
        <i class="pi pi-shopping-cart"></i>
    </InputGroupAddon>
    <IftaLabel>
        <InputNumber v-model="value" inputId="price" mode="currency" currency="USD" locale="en-US" />
        <label for="price">Price</label>
    </IftaLabel>
</InputGroup>
```
## Accessibility [#](_inputgroup_.md#accessibility)

### Screen Reader

InputGroup and InputGroupAddon do not require any roles and attributes.

### Keyboard Support

Component does not include any interactive elements.