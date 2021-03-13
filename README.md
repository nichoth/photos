# photos

The UI for a photo viewing application. Does not include a backend/protocol.

```js
var photos = require('@nichoth/photos')
import { render } from 'preact'

var { bus, setRoute, html } = photos()

bus.on('*', (eventName, data) => {
    console.log('*', eventName, data)
})

render(html, document.getElementById('content'))
```
