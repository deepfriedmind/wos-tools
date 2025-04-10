---
url: https://primevue.org/confirmdialog
scrapeDate: 2025-04-09T00:36:51.778Z
library: primevue

exactVersionMatch: false
---

## ConfirmDialog

ConfirmDialog uses a Dialog UI that is integrated with the Confirmation API.

## Import [#](_confirmdialog_.md#import)
```
import ConfirmDialog from 'primevue/confirmdialog';
```
## Service [#](_confirmdialog_.md#confirmation-service)

ConfirmDialog is controlled via the _ConfirmationService_ that needs to be installed as an application plugin.
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
## Basic [#](_confirmdialog_.md#basic)

ConfirmDialog is displayed by calling the _require_ method of the _$confirm_ instance by passing the options to customize the Dialog. The _target_ attribute is mandatory to align the popup to its referrer.
```
<ConfirmDialog></ConfirmDialog>
<Button @click="confirm1()" label="Save" outlined></Button>
<Button @click="confirm2()" label="Delete" severity="danger" outlined></Button>
```
## Position [#](_confirmdialog_.md#position)

The _position_ property of the confirm options specifies the location of the Dialog.
```
<ConfirmDialog group="positioned"></ConfirmDialog>
<div class="flex flex-wrap justify-center gap-2 mb-4">
    <Button @click="confirmPosition('left')" icon="pi pi-arrow-right" label="Left" severity="secondary" style="min-width: 10rem"></Button>
    <Button @click="confirmPosition('right')" icon="pi pi-arrow-left" label="Right" severity="secondary" style="min-width: 10rem"></Button>
</div>
<div class="flex flex-wrap justify-center gap-2 mb-4">
    <Button @click="confirmPosition('topleft')" icon="pi pi-arrow-down-right" label="TopLeft" severity="secondary" style="min-width: 10rem"></Button>
    <Button @click="confirmPosition('top')" icon="pi pi-arrow-down" label="Top" severity="secondary" style="min-width: 10rem"></Button>
    <Button @click="confirmPosition('topright')" icon="pi pi-arrow-down-left" label="TopRight" severity="secondary" style="min-width: 10rem"></Button>
</div>
<div class="flex flex-wrap justify-center gap-2">
    <Button @click="confirmPosition('bottomleft')" icon="pi pi-arrow-up-right" label="BottomLeft" severity="secondary" style="min-width: 10rem"></Button>
    <Button @click="confirmPosition('bottom')" icon="pi pi-arrow-up" label="Bottom" severity="secondary" style="min-width: 10rem"></Button>
    <Button @click="confirmPosition('bottomright')" icon="pi pi-arrow-up-left" label="BottomRight" severity="secondary" style="min-width: 10rem"></Button>
</div>
```
## Template [#](_confirmdialog_.md#template)

Templating allows customizing the message content.
```
<ConfirmDialog group="templating">
    <template #message="slotProps">
        <div class="flex flex-col items-center w-full gap-4 border-b border-surface-200 dark:border-surface-700">
            <i :class="slotProps.message.icon" class="!text-6xl text-primary-500"></i>
            <p>{{ slotProps.message.message }}</p>
        </div>
    </template>
</ConfirmDialog>
<Button @click="showTemplate()" label="Save"></Button>
```
## Headless [#](_confirmdialog_.md#headless)

Headless mode is enabled by defining a _container_ slot that lets you implement entire confirmation UI instead of the default elements.
```
<ConfirmDialog group="headless">
    <template #container="{ message, acceptCallback, rejectCallback }">
        <div class="flex flex-col items-center p-8 bg-surface-0 dark:bg-surface-900 rounded">
            <div class="rounded-full bg-primary text-primary-contrast inline-flex justify-center items-center h-24 w-24 -mt-20">
                <i class="pi pi-question !text-4xl"></i>
            </div>
            <span class="font-bold text-2xl block mb-2 mt-6">{{ message.header }}</span>
            <p class="mb-0">{{ message.message }}</p>
            <div class="flex items-center gap-2 mt-6">
                <Button label="Save" @click="acceptCallback" class="w-32"></Button>
                <Button label="Cancel" outlined @click="rejectCallback" class="w-32"></Button>
            </div>
        </div>
    </template>
</ConfirmDialog>
<Button @click="requireConfirmation()" label="Save"></Button>
```
## Accessibility [#](_confirmdialog_.md#accessibility)

### Screen Reader

ConfirmDialog component uses _alertdialog_ role along with _aria-labelledby_ referring to the header element however any attribute is passed to the root element so you may use _aria-labelledby_ to override this default behavior. In addition _aria-modal_ is added since focus is kept within the popup.

When _require_ method of the _$confirm_ instance is used and a trigger is passed as a parameter, ConfirmDialog adds _aria-expanded_ state attribute and _aria-controls_ to the trigger so that the relation between the trigger and the dialog is defined.
```
<ConfirmDialog id="confirm" />
<Button @click="openDialog()" label="Confirm" :aria-expanded="visible" :aria-controls="visible ? 'confirm' : null"></Button>
```
```
<script setup>
const confirm = useConfirm();
const isVisible = ref(false);
const openDialog = () => {
    confirm.require({
        message: 'Are you sure you want to proceed?',
        header: 'Confirmation',
        onShow: () => {
            isVisible.value = true;
        },
        onHide: () => {
            isVisible.value = false;
        }
    });
};
</script>
```
### Overlay Keyboard Support

Key

Function

_tab_

Moves focus to the next the focusable element within the dialog.

_shift_ + _tab_

Moves focus to the previous the focusable element within the dialog.

_escape_

Closes the dialog.

### Buttons Keyboard Support

Key

Function

_enter_

Closes the dialog.

_space_

Closes the dialog.