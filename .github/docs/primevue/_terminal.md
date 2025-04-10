---
url: https://primevue.org/terminal
scrapeDate: 2025-04-09T00:37:00.177Z
library: primevue

exactVersionMatch: false
---

## Terminal

Terminal is a text based user interface.

## Import [#](_terminal_.md#import)
```
import Terminal from 'primevue/terminal';
import TerminalService from 'primevue/terminalservice'
```
## Basic [#](_terminal_.md#basic)

Commands are processed using an EventBus implementation called _TerminalService_. Import this service into your component and subscribe to the _command_ event to process the commands by sending replies with the _response_ event.

Enter "**date**" to display the current date, "**greet {0}**" for a message and "**random**" to get a random number.

Welcome to PrimeVue

primevue $
```
<Terminal
    welcomeMessage="Welcome to PrimeVue"
    prompt="primevue $"
    aria-label="PrimeVue Terminal Service"
/>
```
## Accessibility [#](_terminal_.md#accessibility)

### Screen Reader

Terminal component has an input element that can be described with _aria-label_ or _aria-labelledby_ props. The element that lists the previous commands has _aria-live_ so that changes are received by the screen reader.

### Keyboard Support

Key

Function

_tab_

Moves focus through the input element.

_enter_

Executes the command when focus in on the input element.