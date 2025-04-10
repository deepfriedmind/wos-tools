---
url: https://primevue.org/toast
scrapeDate: 2025-04-09T00:37:00.434Z
library: primevue

exactVersionMatch: false
---

## Toast

Toast is used to display messages in an overlay.

## Import [#](_toast_.md#import)
```
import Toast from 'primevue/toast';
```
## Toast Service [#](_toast_.md#toast-service)

Toast component is controlled via the _ToastService_ that needs to be installed as an application plugin.
```
import {createApp} from 'vue';
import ToastService from 'primevue/toastservice';
const app = createApp(App);
app.use(ToastService);
```
The service is available with the _useToast_ function for Composition API or using the _$toast_ property of the application for Options API.
```
import { useToast } from 'primevue/usetoast';
const toast = useToast();
```
## Basic [#](_toast_.md#basic)

Ideal location of a Toast is the main application template so that it can be used by any component within the application. A single message is represented by the Message interface that defines properties such as severity, summary and detail.
```
<Toast />
<Button label="Show" @click="show()" />
```
## Severity [#](_toast_.md#severity)

The _severity_ option specifies the type of the message.
```
<Toast />
<Button label="Success" severity="success" @click="showSuccess" />
<Button label="Info" severity="info" @click="showInfo" />
<Button label="Warn" severity="warn" @click="showWarn" />
<Button label="Error" severity="danger" @click="showError" />
<Button label="Secondary" severity="secondary" @click="showSecondary" />
<Button label="Contrast" severity="contrast" @click="showContrast" />
```
## Position [#](_toast_.md#position)

A message can be targeted to a certain Toast component by matching the _group_ keys whereas location is customized with the _position_.
```
<Toast position="top-left" group="tl" />
<Toast position="bottom-left" group="bl" />
<Toast position="bottom-right" group="br" />
<Button label="Top Left" @click="showTopLeft" />
<Button label="Bottom Left" @click="showBottomLeft" />
<Button label="Bottom Right" @click="showBottomRight" />
```
## Multiple [#](_toast_.md#multiple)

Multiple messages are displayed by passing an array to the _show_ method.
```
<Toast />
<Button label="Multiple" @click="showMultiple()" />
```
## Sticky [#](_toast_.md#sticky)

A message disappears after the number of milliseconds defined in the _life_ option. Omit the _life_ option to make the message sticky.
```
<Toast />
<Button @click="showSticky" label="Sticky" />
<Button label="Clear" severity="secondary" @click="clear()" />
```
## Template [#](_toast_.md#template)

Custom content inside a message is defined with the _message_ template.
```
<Toast position="bottom-center" group="bc" @close="onClose">
    <template #message="slotProps">
        <div class="flex flex-col items-start flex-auto">
            <div class="flex items-center gap-2">
                <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
                <span class="font-bold">Amy Elsner</span>
            </div>
            <div class="font-medium text-lg my-4">{{ slotProps.message.summary }}</div>
            <Button size="small" label="Reply" severity="success" @click="onReply()"></Button>
        </div>
    </template>
</Toast>
<Button @click="showTemplate" label="View" />
```
## Headless [#](_toast_.md#headless)

Headless mode is enabled by defining a _container_ slot that lets you implement entire toast UI instead of the default elements.
```
<Toast position="top-center" group="headless" @close="visible = false">
    <template #container="{ message, closeCallback }">
        <section class="flex flex-col p-4 gap-4 w-full bg-primary/70 rounded-xl">
            <div class="flex items-center gap-5">
                <i class="pi pi-cloud-upload text-white dark:text-black text-2xl"></i>
                <span class="font-bold text-base text-white dark:text-black">{{ message.summary }}</span>
            </div>
            <div class="flex flex-col gap-2">
                <ProgressBar :value="progress" :showValue="false" :style="{ height: '4px' }" pt:value:class="!bg-primary-50 dark:!bg-primary-900" class="!bg-primary/80"></ProgressBar>
                <label class="text-sm font-bold text-white dark:text-black">{{ progress }}% uploaded</label>
            </div>
            <div class="flex gap-4 mb-4 justify-end">
                <Button label="Another Upload?" size="small" @click="closeCallback"></Button>
                <Button label="Cancel" size="small" @click="closeCallback"></Button>
            </div>
        </section>
    </template>
</Toast>
<Button @click="show" label="View" />
```
## Accessibility [#](_toast_.md#accessibility)

### Screen Reader

Toast component use _alert_ role that implicitly defines _aria-live_ as "assertive" and _aria-atomic_ as "true".

Close element is a _button_ with an _aria-label_ that refers to the _aria.close_ property of the [locale](_configuration_.md#locale) API by default, you may use _closeButtonProps_ to customize the element and override the default _aria-label_.

### Close Button Keyboard Support

Key

Function

_enter_

Closes the message.

_space_

Closes the message.