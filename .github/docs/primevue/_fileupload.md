---
url: https://primevue.org/fileupload
scrapeDate: 2025-04-09T00:36:51.467Z
library: primevue

exactVersionMatch: false
---

## File Upload

FileUpload is an advanced uploader with dragdrop support, multi file uploads, auto uploading, progress tracking and validations.

## Import [#](_fileupload_.md#import)
```
import FileUpload from 'primevue/fileupload';
```
## Basic [#](_fileupload_.md#basic)

FileUpload basic _mode_ provides a simpler UI as an alternative to default advanced mode.
```
<FileUpload ref="fileupload" mode="basic" name="demo[]" url="/api/upload" accept="image/*" :maxFileSize="1000000" @upload="onUpload" />
<Button label="Upload" @click="upload" severity="secondary" />
```
## Auto [#](_fileupload_.md#auto)

When _auto_ property is enabled, a file gets uploaded instantly after selection.
```
<FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" :maxFileSize="1000000" @upload="onUpload" :auto="true" chooseLabel="Browse" />
```
## Advanced [#](_fileupload_.md#advanced)

FileUpload is an advanced uploader with dragdrop support, multi file uploads, auto uploading, progress tracking and validations.

Drag and drop files to here to upload.
```
<FileUpload name="demo[]" url="/api/upload" @upload="onAdvancedUpload($event)" :multiple="true" accept="image/*" :maxFileSize="1000000">
    <template #empty>
        <span>Drag and drop files to here to upload.</span>
    </template>
</FileUpload>
```
## Template [#](_fileupload_.md#template)

Uploader UI can be customized with templating.

Drag and drop files to here to upload.
```
<FileUpload name="demo[]" url="/api/upload" @upload="onTemplatedUpload($event)" :multiple="true" accept="image/*" :maxFileSize="1000000" @select="onSelectedFiles">
    <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
        <div class="flex flex-wrap justify-between items-center flex-1 gap-4">
            <div class="flex gap-2">
                <Button @click="chooseCallback()" icon="pi pi-images" rounded outlined severity="secondary"></Button>
                <Button @click="uploadEvent(uploadCallback)" icon="pi pi-cloud-upload" rounded outlined severity="success" :disabled="!files || files.length === 0"></Button>
                <Button @click="clearCallback()" icon="pi pi-times" rounded outlined severity="danger" :disabled="!files || files.length === 0"></Button>
            </div>
            <ProgressBar :value="totalSizePercent" :showValue="false" class="md:w-20rem h-1 w-full md:ml-auto">
                <span class="whitespace-nowrap">{{ totalSize }}B / 1Mb</span>
            </ProgressBar>
        </div>
    </template>
    <template #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback, messages }">
        <div class="flex flex-col gap-8 pt-4">
            <Message v-for="message of messages" :key="message" :class="{ 'mb-8': !files.length && !uploadedFiles.length}" severity="error">
                {{ message }}
            </Message>
            <div v-if="files.length > 0">
                <h5>Pending</h5>
                <div class="flex flex-wrap gap-4">
                    <div v-for="(file, index) of files" :key="file.name + file.type + file.size" class="p-8 rounded-border flex flex-col border border-surface items-center gap-4">
                        <div>
                            <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" />
                        </div>
                        <span class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden">{{ file.name }}</span>
                        <div>{{ formatSize(file.size) }}</div>
                        <Badge value="Pending" severity="warn" />
                        <Button icon="pi pi-times" @click="onRemoveTemplatingFile(file, removeFileCallback, index)" outlined rounded severity="danger" />
                    </div>
                </div>
            </div>
            <div v-if="uploadedFiles.length > 0">
                <h5>Completed</h5>
                <div class="flex flex-wrap gap-4">
                    <div v-for="(file, index) of uploadedFiles" :key="file.name + file.type + file.size" class="p-8 rounded-border flex flex-col border border-surface items-center gap-4">
                        <div>
                            <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" />
                        </div>
                        <span class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden">{{ file.name }}</span>
                        <div>{{ formatSize(file.size) }}</div>
                        <Badge value="Completed" class="mt-4" severity="success" />
                        <Button icon="pi pi-times" @click="removeUploadedFileCallback(index)" outlined rounded severity="danger" />
                    </div>
                </div>
            </div>
        </div>
    </template>
    <template #empty>
        <div class="flex items-center justify-center flex-col">
            <i class="pi pi-cloud-upload !border-2 !rounded-full !p-8 !text-4xl !text-muted-color" />
            <p class="mt-6 mb-0">Drag and drop files to here to upload.</p>
        </div>
    </template>
</FileUpload>
```
## Custom Upload [#](_fileupload_.md#custom-upload)

Uploading implementation can be overridden by enabling _customUpload_ property. This sample, displays the image on the client side with a grayscale filter.
```
<FileUpload mode="basic" @select="onFileSelect" customUpload auto severity="secondary" class="p-button-outlined" />
<img v-if="src" :src="src" alt="Image" class="shadow-md rounded-xl w-full sm:w-64" style="filter: grayscale(100%)" />
```
## Accessibility [#](_fileupload_.md#accessibility)

### Screen Reader

FileUpload uses a hidden native _input_ element with _type="file"_ for screen readers.

### Keyboard Support

Interactive elements of the uploader are buttons, visit the [Button](_button_.md#accessibility) accessibility section for more information.