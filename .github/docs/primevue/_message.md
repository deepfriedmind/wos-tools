---
url: https://primevue.org/message
scrapeDate: 2025-04-09T00:37:02.364Z
library: primevue

exactVersionMatch: false
---

## Message

Message component is used to display inline messages.

## Import [#](_message_.md#import)
```
import Message from 'primevue/message';
```
## Basic [#](_message_.md#basic)

Message component requires a content to display.
```
<Message>Message Content</Message>
```
## Severity [#](_message_.md#severity)

The _severity_ option specifies the type of the message.
```
<Message severity="success">Success Message</Message>
<Message severity="info">Info Message</Message>
<Message severity="warn">Warn Message</Message>
<Message severity="error">Error Message</Message>
<Message severity="secondary">Secondary Message</Message>
<Message severity="contrast">Contrast Message</Message>
```
## Icon [#](_message_.md#icon)

Icon property and the _icon_ slots are available to customize the icon of the message.
```
<Message severity="info" icon="pi pi-send">Info Message</Message>
<Message severity="success">
    <template #icon>
        <Avatar image="/images/avatar/amyelsner.png" shape="circle" />
    </template>
    <span class="ml-2">How may I help you?</span>
</Message>
```
## Outlined [#](_message_.md#outlined)

Configure the _variant_ value as _outlined_ for messages with borders and no background.
```
<Message severity="success" variant="outlined">Success Message</Message>
<Message severity="info" variant="outlined">Info Message</Message>
<Message severity="warn" variant="outlined">Warn Message</Message>
<Message severity="error" variant="outlined">Error Message</Message>
<Message severity="secondary" variant="outlined">Secondary Message</Message>
<Message severity="contrast" variant="outlined">Contrast Message</Message>
```
## Simple [#](_message_.md#simple)

Configure the _variant_ value as _simple_ for messages without borders, backgrounds and paddings.
```
<Message severity="success" variant="simple">Success Message</Message>
<Message severity="info" variant="simple">Info Message</Message>
<Message severity="warn" variant="simple">Warn Message</Message>
<Message severity="error" variant="simple">Error Message</Message>
<Message severity="secondary" variant="simple">Secondary Message</Message>
<Message severity="contrast" variant="simple">Contrast Message</Message>
```
## Sizes [#](_message_.md#sizes)

Message provides _small_ and _large_ sizes as alternatives to the base.
```
<Message size="small" icon="pi pi-send">Small Message</Message>
<Message icon="pi pi-user">Normal Message</Message>
<Message size="large" icon="pi pi-check">Large Message</Message>
```
## Forms [#](_message_.md#forms)

Validation errors in a form are displayed with the _error_ severity.
```
<Message v-if="!username || !email" severity="error" icon="pi pi-times-circle" class="mb-2">Validation error</Message>
<Message v-if="username && email" severity="success" icon="pi pi-times-circle" class="mb-2">Form is valid</Message>
<div class="flex flex-col gap-1">
    <InputText v-model="username" placeholder="Username" aria-label="username" :invalid="!username" />
    <Message v-if="!username" severity="error" variant="simple" size="small">Username is required</Message>
</div>
<div class="flex flex-col gap-1">
    <InputText v-model="email" placeholder="Email" aria-label="email" :invalid="!email" />
    <Message v-if="!email" severity="error" variant="simple" size="small">Email is not valid</Message>
</div>
```
## Dynamic [#](_message_.md#dynamic)

Multiple messages can be displayed using the standard v-for directive.
```
<Button label="Show" @click="addMessages()" />
<Button label="Clear" severity="secondary" class="ml-2" @click="clearMessages()" />
<transition-group name="p-message" tag="div" class="flex flex-col">
    <Message v-for="msg of messages" :key="msg.id" :severity="msg.severity" class="mt-4">{{ msg.content }}</Message>
</transition-group>
```
## Closable [#](_message_.md#closable)

Enable _closable_ option to display an icon to remove a message.
```
<Message closable>Closable Message</Message>
```
## Life [#](_message_.md#life)

Messages can disappear automatically by defined the _life_ in milliseconds.
```
<Button label="Show" @click="showMessage" :disabled="visible" class="mb-4" />
<Message v-if="visible" severity="success" :life="3000">Auto Disappear Message</Message>
```
## Accessibility [#](_message_.md#accessibility)

### Screen Reader

Message component uses _alert_ role that implicitly defines _aria-live_ as "assertive" and _aria-atomic_ as "true". Since any attribute is passed to the root element, attributes like _aria-labelledby_ and _aria-label_ can optionally be used as well.

Close element is a _button_ with an _aria-label_ that refers to the _aria.close_ property of the [locale](_configuration_.md#locale) API by default, you may use _closeButtonProps_ to customize the element and override the default _aria-label_.

### Close Button Keyboard Support

Key

Function

_enter_

Closes the message.

_space_

Closes the message.