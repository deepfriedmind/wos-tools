---
url: https://primevue.org/confirmpopup
scrapeDate: 2025-04-09T00:36:51.901Z
library: primevue

exactVersionMatch: false
---

## ConfirmPopup

ConfirmPopup displays a confirmation overlay displayed relatively to its target.

## Import [#](_confirmpopup_.md#import)
```
import ConfirmPopup from 'primevue/confirmpopup';
```
## Service [#](_confirmpopup_.md#confirmation-service)

ConfirmPopup is controlled via the _ConfirmationService_ that needs to be installed as an application plugin.
```
import {createApp} from 'vue';
import ConfirmationService from 'primevue/confirmationservice';
const app = createApp(App);
app.use(ConfirmationService);
```
The service is available with the _useConfirm_ function for Composition API or using the _$confirm_ property of the application for Options API.
```
import { useConfirm } from "primevue/useconfirm";
const confirm = useConfirm();
```
## Basic [#](_confirmpopup_.md#basic)

ConfirmPopup is displayed by calling the _require_ method of the _$confirm_ instance by passing the options to customize the Popup. The _target_ attribute is mandatory to align the popup to its referrer.
```
<ConfirmPopup></ConfirmPopup>
<Button @click="confirm1($event)" label="Save" outlined></Button>
<Button @click="confirm2($event)" label="Delete" severity="danger" outlined></Button>
```
## Template [#](_confirmpopup_.md#template)

Templating allows customizing the message content.
```
<ConfirmPopup group="templating">
    <template #message="slotProps">
        <div class="flex flex-col items-center w-full gap-4 border-b border-surface-200 dark:border-surface-700 p-4 mb-4 pb-0">
            <i :class="slotProps.message.icon" class="text-6xl text-primary-500"></i>
            <p>{{ slotProps.message.message }}</p>
        </div>
    </template>
</ConfirmPopup>
<Button @click="showTemplate($event)" label="Save"></Button>
```
## Headless [#](_confirmpopup_.md#headless)

Headless mode is enabled by defining a _container_ slot that lets you implement entire confirmation UI instead of the default elements.
```
<ConfirmPopup group="headless">
    <template #container="{ message, acceptCallback, rejectCallback }">
        <div class="rounded p-4">
            <span>{{ message.message }}</span>
            <div class="flex items-center gap-2 mt-4">
                <Button label="Save" @click="acceptCallback" size="small"></Button>
                <Button label="Cancel" outlined @click="rejectCallback" severity="secondary" size="small" text></Button>
            </div>
        </div>
    </template>
</ConfirmPopup>
<Button @click="requireConfirmation($event)" label="Save"></Button>
```
## Accessibility [#](_confirmpopup_.md#accessibility)

### Screen Reader

ConfirmPopup component uses _alertdialog_ role and since any attribute is passed to the root element you may define attributes like _aria-label_ or _aria-labelledby_ to describe the popup contents. In addition _aria-modal_ is added since focus is kept within the popup.

When _require_ method of the _$confirm_ instance is used and a trigger is passed as a parameter, ConfirmPopup adds _aria-expanded_ state attribute and _aria-controls_ to the trigger so that the relation between the trigger and the dialog is defined.
```
<ConfirmPopup id="confirm" aria-label="popup" />
<Button @click="openPopup($event)" label="Confirm" id="confirmButton" :aria-expanded="isVisible" :aria-controls="isVisible ? 'confirm' : null" />
```
```
<script setup>
const confirm = useConfirm();
const isVisible = ref(false);
const openPopup = (event) => {
    confirm.require({
        target: event.currentTarget,
        message: 'Are you sure you want to proceed?',
        header: 'Confirmation',
        onShow: () => {
            isVisible.value = true;
        },
        onHide: () => {
            isVisible.value = false;
        }
    });
}
</script>
```
### Overlay Keyboard Support

Key

Function

_tab_

Moves focus to the next the focusable element within the popup.

_shift_ + _tab_

Moves focus to the previous the focusable element within the popup.

_escape_

Closes the popup and moves focus to the trigger.

### Buttons Keyboard Support

Key

Function

_enter_

Triggers the action, closes the popup and moves focus to the trigger.

_space_

Triggers the action, closes the popup and moves focus to the trigger.