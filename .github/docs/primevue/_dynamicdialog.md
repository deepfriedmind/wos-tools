---
url: https://primevue.org/dynamicdialog
scrapeDate: 2025-04-09T00:36:51.833Z
library: primevue

exactVersionMatch: false
---

## Dynamic Dialog

Dialogs can be created dynamically with any component as the content using a DialogService.

## Import [#](_dynamicdialog_.md#import)
```
import DynamicDialog from 'primevue/dynamicdialog';
```
## Dialog Service [#](_dynamicdialog_.md#dialogservice)

A single shared dialog instance is required in the application, ideal location would be defining it once at the main application template.

A dynamic dialog is controlled via the _DialogService_ that needs to be installed as an application plugin.
```
import {createApp} from 'vue';
import DialogService from 'primevue/dialogservice';
const app = createApp(App);
app.use(DialogService);
```
The service is available with the _useDialog_ function for Composition API or using the _$dialog_ property of the application for Options API.
```
/* Composition API */
import { useDialog } from 'primevue/usedialog';
const dialog = useDialog();
/* Options API */
const dialog = this.$dialog;
```
## Open [#](_dynamicdialog_.md#open)

The _open_ function of the _DialogService_ is used to open a Dialog. First parameter is the component to load and second one is the configuration object to customize the Dialog.
```
import ProductListDemo from './ProductListDemo';
import { useDialog } from 'primevue/usedialog';
const dialog = useDialog();
const showProducts = () => {
    dialog.open(ProductListDemo, {});
}
```
The component can also be loaded asynchronously, this approach is useful in conditional cases and to improve initial load times as well.
```
import { useDialog } from 'primevue/usedialog';
const dialog = useDialog();
const dynamicComponent = defineAsyncComponent(() => import('./ProductListDemo.vue'));
const showProducts = () => {
    dialog.open(dynamicComponent, {});
}
```
## Customization [#](_dynamicdialog_.md#customization)

DynamicDialog uses the Dialog component internally, visit [dialog](_dialog.md) for more information about the available props.
```
import ProductListDemo from './ProductListDemo';
import { useDialog } from 'primevue/usedialog';
const dialog = useDialog();
const showProducts = () => {
    dialog.open(ProductListDemo, {
        props: {
            header: 'Product List',
            style: {
                width: '50vw',
            },
            breakpoints:{
                '960px': '75vw',
                '640px': '90vw'
            },
            modal: true
        }
    });
}
```
## Close [#](_dynamicdialog_.md#close)

The _close_ function is available through a _dialogRef_ that is injected to the component loaded by the dialog.
```
import { inject } from "vue";
const dialogRef = inject('dialogRef');
const closeDialog = () => {
    dialogRef.value.close();
}
```
## Passing Data [#](_dynamicdialog_.md#passingdata)

Use the _data_ property to pass parameters when opening a Dialog, the internal component can later access this data using _dialogRef_.
```
const dialog = useDialog();
const showProducts = () => {
    dialog.open(ProductListDemo, {
        data: {
            user: 'primetime'
        }
    });
}
```
```
import { inject, onMounted } from "vue";
const dialogRef = inject('dialogRef');
onMounted(() => {
    const params = dialogRef.value.data; // {user: 'primetime'}
})
```
Similarly when hiding a Dialog, any parameter passed to the _close_ function is received from the _onClose_ callback.
```
const dialog = useDialog();
const showProducts = () => {
    dialog.open(ProductListDemo, {
        onClose: (opt) => {
            const callbackParams = opt.data; // {selectedId: 12}
        }
    });
}
```
```
import { inject } from "vue";
const dialogRef = inject('dialogRef');
const closeDialog = () => {
    dialogRef.value.close({
        selectedId: 12
    });
}
```
## Events [#](_dynamicdialog_.md#events)

The _emits_ object defines callbacks to handle events emitted by the component within the Dialog.
```
import ProductListDemo from './ProductListDemo';
import { useDialog } from 'primevue/usedialog';
const dialog = useDialog();
const showProducts = () => {
    dialog.open(ProductListDemo, {
        onCancel: (e) => {
            console.log(e);      // {user: 'primetime'}
        },
        emits: {
            onSave: (e) => {
                console.log(e);  // {user: 'primetime'}
            }
        }
    });
}
```
```
<script setup>
/* ProductListDemo.vue */
const emit = defineEmits(['cancel', 'save'])
function buttonClick() {
    emit('cancel', {user: 'primetime'});
}
function saveButtonClick() {
    emit('save', {user: 'primetime'});
}
</script>
```
## Example [#](_dynamicdialog_.md#example)

A sample implementation to demonstrate loading components asynchronously, nested content and passing data.
```
<Button label="Select a Product" icon="pi pi-search" @click="showProducts" />
<DynamicDialog />
```
## Accessibility [#](_dynamicdialog_.md#accessibility)

Visit accessibility section of [dialog](_dialog_.md#accessibility) component for more information.