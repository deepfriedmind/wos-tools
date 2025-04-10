---
url: https://primevue.org/treeselect
scrapeDate: 2025-04-09T00:36:41.907Z
library: primevue

exactVersionMatch: false
---

## TreeSelect

TreeSelect is a form component to choose from hierarchical data.

## Import [#](_treeselect_.md#import)
```
import TreeSelect from 'primevue/treeselect';
```
## Basic [#](_treeselect_.md#basic)

TreeSelect is used with the _v-model_ property for two-way value binding along with the _options_ collection. Internally [Tree](_tree_.md) component is used so the options model is based on TreeNode API.

In single selection mode, value binding should be the _key_ value of a node.
```
<TreeSelect v-model="selectedValue" :options="nodes" placeholder="Select Item" class="md:w-80 w-full" />
```
## Forms [#](_treeselect_.md#forms)

TreeSelect is used with the _v-model_ property.
```
<Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit" class="flex flex-col gap-4 w-full md:w-80">
    <div class="flex flex-col gap-1">
        <TreeSelect name="node" :options="nodes" placeholder="Select Item" fluid />
        <Message v-if="$form.node?.invalid" severity="error" size="small" variant="simple">{{ $form.node.error?.message }}</Message>
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
</Form>
```
## Multiple [#](_treeselect_.md#multiple)

More than one node is selectable by setting _selectionMode_ to _multiple_. By default in multiple selection mode, metaKey press (e.g. _⌘_) is not necessary to add to existing selections. When the optional _metaKeySelection_ is present, behavior is changed in a way that selecting a new node requires meta key to be present. Note that in touch enabled devices, TreeSelect always ignores metaKey.

In multiple selection mode, value binding should be a key-value pair where key is the node key and value is a boolean to indicate selection.
```
{
    '0-0': true,
    '0-1-0': true
}
```
```
<TreeSelect v-model="selectedValue" :options="nodes" selectionMode="multiple" display="chip" :maxSelectedLabels="3" placeholder="Select Items" class="md:w-80 w-full" />
```
## Checkbox [#](_treeselect_.md#checkbox)

Selection of multiple nodes via checkboxes is enabled by configuring _selectionMode_ as _checkbox_.

In checkbox selection mode, value binding should be a key-value pair where key is the node key and value is an object that has _checked_ and _partialChecked_ properties to represent the checked state of a node object to indicate selection.
```
{
    '0-0': {
        partialChecked: false,
        checked: true
    }
}
```
```
<TreeSelect v-model="selectedValue" :options="nodes" selectionMode="checkbox" placeholder="Select Item" class="md:w-80 w-full" />
```
## Lazy [#](_treeselect_.md#lazy)

Lazy loading is useful when dealing with huge datasets, in this example nodes are dynamically loaded on demand using _loading_ property and _node-expand_ method. Default value of _loadingMode_ is _mask_ and also _icon_ is available.
```
<TreeSelect v-model="selectedValue" :loading="loading" :options="nodes" @node-expand="onNodeExpand" placeholder="Select Item" class="md:w-80 w-full" />
<TreeSelect v-model="selectedValue2" loadingMode="icon" :options="nodes2" @node-expand="onNodeExpand2" placeholder="Select Item" class="md:w-80 w-full" />
```
## Filter [#](_treeselect_.md#filter)

Filtering is enabled by adding the _filter_ property, by default label property of a node is used to compare against the value in the text field, in order to customize which field(s) should be used during search define _filterBy_ property. In addition _filterMode_ specifies the filtering strategy. In _lenient_ mode when the query matches a node, children of the node are not searched further as all descendants of the node are included. On the other hand, in _strict_ mode when the query matches a node, filtering continues on all descendants.
```
<TreeSelect v-model="selectedValue" filter filterMode="lenient" :options="nodes" placeholder="Select Item" class="md:w-80 w-full" />
<TreeSelect v-model="selectedValue" filter filterMode="strict" :options="nodes" placeholder="Select Item" class="md:w-80 w-full" />
```
## Clear Icon [#](_treeselect_.md#clearicon)

When _showClear_ is enabled, a clear icon is added to reset the TreeSelect.
```
<TreeSelect v-model="selectedValue" :options="nodes" placeholder="Select Item" class="md:w-80 w-full" />
```
## Template [#](_treeselect_.md#template)

TreeSelect offers multiple slots for customization through templating.
```
<TreeSelect v-model="selectedValue" :options="nodes" placeholder="Select Item" class="md:w-80 w-full">
    <template #dropdownicon>
        <i class="pi pi-search" />
    </template>
    <template #header>
        <div class="font-medium px-3 py-2">Available Files</div>
    </template>
    <template #footer>
        <div class="px-3 pt-1 pb-2 flex justify-between">
            <Button label="Add New" severity="secondary" text size="small" icon="pi pi-plus" />
            <Button label="Remove All" severity="danger" text size="small" icon="pi pi-plus" />
        </div>
    </template>
</TreeSelect>
```
## Filled [#](_treeselect_.md#filled)

Specify the _variant_ property as _filled_ to display the component with a higher visual emphasis than the default _outlined_ style.
```
<TreeSelect v-model="selectedValue" variant="filled" :options="nodes" placeholder="Select Item" class="md:w-80 w-full" />
```
## Float Label [#](_treeselect_.md#floatlabel)

A floating label appears on top of the input field when focused. Visit [FloatLabel](_floatlabel_.md) documentation for more information.

Over LabelIn LabelOn Label
```
<FloatLabel class="w-full md:w-80">
    <TreeSelect v-model="value1" inputId="over_label" :options="nodes" class="w-full" />
    <label for="over_label">Over Label</label>
</FloatLabel>
<FloatLabel class="w-full md:w-80" variant="in">
    <TreeSelect v-model="value2" inputId="in_label" :options="nodes" class="w-full" variant="filled" />
    <label for="in_label">In Label</label>
</FloatLabel>
<FloatLabel class="w-full md:w-80" variant="on">
    <TreeSelect v-model="value3" inputId="on_label" :options="nodes" class="w-full" />
    <label for="on_label">On Label</label>
</FloatLabel>
```
## Ifta Label [#](_treeselect_.md#iftalabel)

IftaLabel is used to create infield top aligned labels. Visit [IftaLabel](_iftalabel_.md) documentation for more information.

File
```
<IftaLabel class="w-full md:w-80">
    <TreeSelect v-model="selectedValue" inputId="t_file" :options="nodes" class="w-full" variant="filled" />
    <label for="t_file">File</label>
</IftaLabel>
```
## Sizes [#](_treeselect_.md#sizes)

TreeSelect provides _small_ and _large_ sizes as alternatives to the base.
```
<TreeSelect v-model="value1" :options="nodes" size="small" placeholder="Small" class="md:w-80 w-full" />
<TreeSelect v-model="value2" :options="nodes" placeholder="Normal" class="md:w-80 w-full" />
<TreeSelect v-model="value3" :options="nodes" size="large" placeholder="Large" class="md:w-80 w-full" />
```
## Invalid [#](_treeselect_.md#invalid)

Invalid state is displayed using the _invalid_ prop to indicate a failed validation. You can use this style when integrating with form validation libraries.
```
<TreeSelect v-model="selectedValue1" :invalid="Object.keys(selectedValue1).length === 0" class="md:w-80 w-full" :options="nodes" placeholder="TreeSelect" />
<TreeSelect v-model="selectedValue2" :invalid="Object.keys(selectedValue2).length === 0" class="md:w-80 w-full" :options="nodes" placeholder="TreeSelect" variant="filled" />
```
## Disabled [#](_treeselect_.md#disabled)

When _disabled_ is present, the element cannot be edited and focused.
```
<TreeSelect v-model="selectedValue" disabled class="md:w-80 w-full" :options="nodes" placeholder="TreeSelect" />
```
## Accessibility [#](_treeselect_.md#accessibility)

### Screen Reader

Value to describe the component can either be provided with _aria-labelledby_ or _aria-label_ props. The treeselect element has a _combobox_ role in addition to _aria-haspopup_ and _aria-expanded_ attributes. The relation between the combobox and the popup is created with _aria-controls_ that refers to the id of the popup.

The popup list has an id that refers to the _aria-controls_ attribute of the _combobox_ element and uses _tree_ as the role. Each list item has a _treeitem_ role along with _aria-label_, _aria-selected_ and _aria-expanded_ attributes. In checkbox selection, _aria-checked_ is used instead of _aria-selected_. Checkbox and toggle icons are hidden from screen readers as their parent element with _treeitem_ role and attributes are used instead for readers and keyboard support. The container element of a treenode has the _group_ role. The _aria-setsize_, _aria-posinset_ and _aria-level_ attributes are calculated implicitly and added to each treeitem.
```
<span id="dd1">Options</span>
<TreeSelect aria-labelledby="dd1" />
<TreeSelect aria-label="Options" />
```
### Closed State Keyboard Support

Key

Function

_tab_

Moves focus to the treeselect element.

_space_

Opens the popup and moves visual focus to the selected treenode, if there is none then first treenode receives the focus.

_down arrow_

Opens the popup and moves visual focus to the selected option, if there is none then first option receives the focus.

### Popup Keyboard Support

Key

Function

_tab_

Moves focus to the next focusable element in the page tab sequence.

_shift_ + _tab_

Moves focus to the previous focusable element in the page tab sequence.

_enter_

Selects the focused option, closes the popup if selection mode is single.

_space_

Selects the focused option, closes the popup if selection mode is single.

_escape_

Closes the popup, moves focus to the treeselect element.

_down arrow_

Moves focus to the next treenode.

_up arrow_

Moves focus to the previous treenode.

_right arrow_

If node is closed, opens the node otherwise moves focus to the first child node.

_left arrow_

If node is open, closes the node otherwise moves focus to the parent node.