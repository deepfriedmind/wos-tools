---
url: https://primevue.org/editor
scrapeDate: 2025-04-09T00:36:31.355Z
library: primevue

exactVersionMatch: false
---

## Editor

Editor is rich text editor component based on Quill.

## Import [#](_editor_.md#import)
```
import Editor from 'primevue/editor';
```
## Quill [#](_editor_.md#quill)

Editor uses [Quill](https://quilljs.com/) editor underneath so it needs to be installed as a dependency.

## Basic [#](_editor_.md#basic)

Editor is used with the _v-model_ property for two-way value binding.
```
<Editor v-model="value" editorStyle="height: 320px" />
```
## Forms [#](_editor_.md#forms)

Editor integrates seamlessly with the [PrimeVue Forms](_forms.md) library.
```
<Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit" class="flex flex-col gap-4">
    <div class="flex flex-col gap-1">
        <Editor name="content" editorStyle="height: 320px" />
        <Message v-if="$form.content?.invalid" severity="error" size="small" variant="simple">{{ $form.content.error?.message }}</Message>
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
</Form>
```
## ReadOnly [#](_editor_.md#readonly)

When _readonly_ is present, the value cannot be edited.
```
<Editor v-model="value" editorStyle="height: 320px" readonly />
```
## Template [#](_editor_.md#template)

Editor provides a default toolbar with common options, to customize it define your elements inside the header element. Refer to [Quill documentation](http://quilljs.com/docs/modules/toolbar/) for available controls.
```
<Editor v-model="value" editorStyle="height: 320px">
    <template v-slot:toolbar>
        <span class="ql-formats">
            <button v-tooltip.bottom="'Bold'" class="ql-bold"></button>
            <button v-tooltip.bottom="'Italic'" class="ql-italic"></button>
            <button v-tooltip.bottom="'Underline'" class="ql-underline"></button>
        </span>
    </template>
</Editor>
```
## Accessibility [#](_editor_.md#accessibility)

### Screen Reader

Quill performs generally well in terms of accessibility. The elements in the toolbar can be tabbed and have the necessary ARIA roles/attributes for screen readers. One known limitation is the lack of arrow key support for [dropdowns](https://github.com/quilljs/quill/issues/1031) in the toolbar that may be overcome with a custom toolbar.