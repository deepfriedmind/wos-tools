---
url: https://primevue.org/card
scrapeDate: 2025-04-09T00:36:52.207Z
library: primevue

exactVersionMatch: false
---

## Card

Card is a flexible container component.

## Import [#](_card_.md#import)
```
import Card from 'primevue/card';
```
## Basic [#](_card_.md#basic)

A simple Card is created with a _title_ property along with the content as children.

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
```
<Card>
    <template #title>Simple Card</template>
    <template #content>
        <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
            quas!
        </p>
    </template>
</Card>
```
## Advanced [#](_card_.md#advanced)

Card provides _header_, _title_, _subtitle_, _content_ and _footer_ as the named templates to place content.

Advanced Card

Card subtitle

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
```
<Card style="width: 25rem; overflow: hidden">
    <template #header>
        <img alt="user header" src="/images/usercard.png" />
    </template>
    <template #title>Advanced Card</template>
    <template #subtitle>Card subtitle</template>
    <template #content>
        <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
            quas!
        </p>
    </template>
    <template #footer>
        <div class="flex gap-4 mt-1">
            <Button label="Cancel" severity="secondary" outlined class="w-full" />
            <Button label="Save" class="w-full" />
        </div>
    </template>
</Card>
```
## Accessibility [#](_card_.md#accessibility)

### Screen Reader

A card can be utilized in many use cases as a result no role is enforced, in fact a role may not be necessary if the card is used for presentational purposes only. Any valid attribute is passed to the container element so if you require to use one of the [landmark](https://www.w3.org/TR/wai-aria/#landmark) roles like _region_, you may use the _role_ property.
```
<Card role="region">
    Content
</Card>
```
### Keyboard Support

Component does not include any interactive elements.