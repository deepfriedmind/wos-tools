---
url: https://primevue.org/forms
scrapeDate: 2025-04-09T00:37:05.351Z
library: primevue

exactVersionMatch: false
---

## Forms

The PrimeVue Forms library provides comprehensive form state management with built-in validation support.

## Download [#](_forms_.md#download)

Forms add-on is available for download on npm registry.
```
# Using npm
npm install @primevue/forms
# Using yarn
yarn add @primevue/forms
# Using pnpm
pnpm add @primevue/forms
```
## Import [#](_forms_.md#import)

The form component is responsible for managing the form state and must encapsulate the form fields.
```
import { Form } from '@primevue/forms';
```
## Basic [#](_forms_.md#basic)

All PrimeVue form components are designed for seamless integration with the forms library. Instead of using the standard _v-model_, the _name_ property is used to link a state object that tracks values, errors, and actions. The form component provides four key properties for state management.

Property

Description

v-slot="$form"

Exposes the main _$form_ object that tracks the state management of the fields.

initialValues

Specifies the default values to initiate the form with.

resolver

The validation handler to implement validations or to bind a schema like _Zod_, _Yup_, _Valibot_ and more.

@submit

The event handler to execute when the form is submitted.
```
<Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-56">
    <div class="flex flex-col gap-1">
        <InputText name="username" type="text" placeholder="Username" fluid />
        <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{ $form.username.error?.message }}</Message>
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
</Form>
```
## States [#](_forms_.md#states)

The _$form_ object tracks the state management of the fields. Each field is linked with the _name_ property. View the _FormFieldState_ type in the API documentation for details about each property.
```
<Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="grid lg:grid-cols-2 gap-4 w-full">
    <div class="flex flex-col justify-center items-center gap-4">
        <InputText name="username" type="text" placeholder="Username" class="w-full sm:w-56" />
        <Button type="submit" severity="secondary" label="Submit" class="w-full sm:w-56" />
    </div>
    <Fieldset legend="Form States" class="h-80 overflow-auto">
        <pre class="whitespace-pre-wrap">{{ $form }}</pre>
    </Fieldset>
</Form>
```
## Resolvers [#](_forms_.md#resolvers)

Validations are implemented with the _resolver_ property. A custom resolver is responsible for handling the validation and returning an _errors_ object with key-value pairs where key is the form field name and value is an array of error object data. For productivity, we recommend using a schema validation library instead of building your own custom validation logic. The forms library provide built-in resolvers for popular options including [Zod](https://zod.dev/), [Yup](https://github.com/jquense/yup), [Joi](https://joi.dev/), [Valibot](https://valibot.dev/), and [Superstruct](https://docs.superstructjs.org/) that can be imported from _@primevue/forms/resolvers_ path.
```
<Form v-slot="$form" :initialValues :resolver="resolver" @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-56">
    <div class="flex flex-col gap-1">
        <InputText name="username" type="text" placeholder="Username" fluid />
        <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{ $form.username.error.message }}</Message>
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
</Form>
```
## ValidateOn [#](_forms_.md#validateon)

Form component supports flexible validation triggers, allowing validation on value updates, blur events, form mount, or submission. These behaviors can be configured at form level or on specific fields via the _validateOnValueUpdate_, _validateOnBlur_, _validateOnMount_, and _validateOnSubmit_ options of the _formControl_ property.

In this example, form disables _validateOnValueUpdate_ and enables _validateOnBlur_ at form level, and validates **firstName** on mount. The _firstName_ field, overrides the form level setting locally.
```
<Form v-slot="$form" :initialValues :resolver :validateOnValueUpdate="false" :validateOnBlur="true" :validateOnMount="['firstName']" @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-56">
    <div class="flex flex-col gap-1">
        <InputText name="username" type="text" placeholder="Username" fluid />
        <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{ $form.username.error.message }}</Message>
    </div>
    <div class="flex flex-col gap-1">
        <InputText name="firstName" type="text" placeholder="First Name" fluid :formControl="{ validateOnValueUpdate: true }" />
        <Message v-if="$form.firstName?.invalid" severity="error" size="small" variant="simple">{{ $form.firstName.error.message }}</Message>
    </div>
    <div class="flex flex-col gap-1">
        <InputText name="lastName" type="text" placeholder="Last Name" fluid />
        <Message v-if="$form.lastName?.invalid" severity="error" size="small" variant="simple">{{ $form.lastName.error.message }}</Message>
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
</Form>
```
## FormField [#](_forms_.md#formfield)

### Import [#](_forms_.md#formfield-import)

The _FormField_ is a helper component that provides validation and tracking for input elements, offering a more flexible structure to bind PrimeVue, non-PrimeVue components or native HTML elements to Form API. Additionally, with props like _validateOn\*_, _initialValue_, _resolver_, and _name_, behaviors can be controlled directly from this component.
```
import { FormField } from '@primevue/forms';
```
### Built-in [#](_forms_.md#formfield-built-in)

Although PrimeVue components have built-in support for the Form API, you may still prefer to utilize the components as wrapped with the FormField. This is a matter of preference, for example in case you are also using FormField for other 3rd party components, your own custom components, and native elements, for consistency it may be an option.
```
<Form :resolver @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-56">
    <FormField v-slot="$field" name="username" initialValue="" class="flex flex-col gap-1">
        <InputText type="text" placeholder="Username" />
        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
    </FormField>
    <Button type="submit" severity="secondary" label="Submit" />
</Form>
```
### Non PrimeVue [#](_forms_.md#formfield-non-primevue)

Form API is not strictly tied to PrimeVue components, providing a flexible way to manage validation and state for any native HTML elements, your own custom components or third-party libraries.
```
<Form :resolver @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-56">
    <FormField v-slot="$field" name="username" initialValue="" class="flex flex-col gap-1">
        <input type="text" placeholder="Username" :class="[{ error: $field?.invalid }]" v-bind="$field.props" />
        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
    </FormField>
    <FormField v-slot="$field" name="password" initialValue="PrimeVue" class="flex flex-col gap-1">
        <input v-model="$field.value" type="password" placeholder="Password" :class="[{ error: $field?.invalid }]" @input="$field.onInput" @blur="$field.onBlur" @change="$field.onChange" />
        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
    </FormField>
    <Button type="submit" severity="secondary" label="Submit" />
</Form>
```
### Resolver [#](_forms_.md#formfield-resolver)

Each FormField can have its own dedicated resolver, allowing you to define custom validation logic for individual fields. This flexibility enables tailored validation rules, ensuring that each form field meets specific criteria.
```
<Form :initialValues :resolver @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-80">
    <FormField v-slot="$field" name="username" initialValue="" :resolver="zodUserNameResolver" class="flex flex-col gap-1">
        <InputText type="text" placeholder="Username" />
        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
    </FormField>
    <FormField v-slot="$field" name="firstname" initialValue="" :resolver="yupFirstNameResolver" class="flex flex-col gap-1">
        <InputText type="text" placeholder="First Name" />
        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
    </FormField>
    <FormField v-slot="$field" name="lastname" initialValue="" :resolver="valibotLastNameResolver" class="flex flex-col gap-1">
        <InputText type="text" placeholder="Last Name" />
        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
    </FormField>
    <FormField v-slot="$field" name="password" initialValue="" :resolver="customPasswordResolver" class="flex flex-col gap-1">
        <Password type="text" placeholder="Password" :feedback="false" toggleMask fluid />
        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
    </FormField>
    <FormField v-slot="$field" name="details" class="flex flex-col gap-1">
        <Textarea placeholder="Details" />
        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
    </FormField>
    <Button type="submit" severity="secondary" label="Submit" />
</Form>
```
### Template [#](_forms_.md#formfield-template)

It renders as a HTML div element, but this behavior can be modified using the _as_ and _asChild_ props to render different HTML elements or to pass a custom component, allowing for greater flexibility in form structure.
```
<Form :resolver @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-56">
    <FormField v-slot="$field" as="section" name="username" initialValue="" class="flex flex-col gap-2">
        <InputText type="text" placeholder="Username" />
        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
    </FormField>
    <FormField v-slot="$field" asChild name="password" initialValue="">
        <section class="flex flex-col gap-2">
            <Password type="text" placeholder="Password" :feedback="false" toggleMask fluid />
            <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
        </section>
    </FormField>
    <Button type="submit" severity="secondary" label="Submit" />
</Form>
```
## Submit [#](_forms_.md#submit)

The _submit_ callback returns an object that encapsulates the form's validity, any existing errors, and its current state. This enables access to the form values, validation status, and any errors present at the time of submission. View the _FormSubmitEvent_ in the API documentation for more information about the available event data.
```
<Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-60">
    <div class="flex flex-col gap-1">
        <InputText name="username" type="text" placeholder="Username" fluid />
        <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{ $form.username.error.message }}</Message>
    </div>
    <div class="flex flex-col gap-1">
        <Password name="password" placeholder="Password" :feedback="false" toggleMask fluid />
        <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">
            <ul class="my-0 px-4 flex flex-col gap-1">
                <li v-for="(error, index) of $form.password.errors" :key="index">{{ error.message }}</li>
            </ul>
        </Message>
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
</Form>
```
## Dynamic [#](_forms_.md#dynamic)

This section demonstrates how to create a dynamic form using a custom Form component. It showcases an example where form fields are generated dynamically based on the provided configuration, allowing for flexible form structures. The components named _Dynamic\*_ shown in this example are not built-in, and only available for sampling purposes. First form uses a declarative approach whereas second form goes for a programmatic approach. We suggest running this sample in StackBlitz to view the comprehensive implementation.
```
<Fieldset legend="Form 1" pt:content:class="flex justify-center">
    <DynamicForm @submit="onFormSubmit('Form 1', $event)">
        <DynamicFormField groupId="userId_1" name="username">
            <DynamicFormLabel>Username</DynamicFormLabel>
            <DynamicFormControl defaultValue="PrimeVue" fluid :schema="userNameSchema" />
            <DynamicFormMessage />
        </DynamicFormField>
        <DynamicFormField groupId="passId_1" name="password">
            <DynamicFormLabel>Password</DynamicFormLabel>
            <DynamicFormControl as="Password" :feedback="false" toggleMask fluid :schema="passwordSchema" />
            <DynamicFormMessage errorType="minimum" />
            <DynamicFormMessage errorType="maximum" />
            <DynamicFormMessage errorType="uppercase" severity="warn" />
            <DynamicFormMessage errorType="lowercase" severity="warn" />
            <DynamicFormMessage errorType="number" severity="secondary" />
        </DynamicFormField>
        <DynamicFormSubmit />
    </DynamicForm>
</Fieldset>
<Fieldset legend="Form 2" pt:content:class="flex justify-center">
    <DynamicForm :fields @submit="onFormSubmit('Form 2', $event)" />
</Fieldset>
```
## Accessibility [#](_forms_.md#accessibility)

### Screen Reader

Form does not require any roles and attributes.

### Keyboard Support

Component does not include any interactive elements.