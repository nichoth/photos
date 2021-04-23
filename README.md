# photos
The UI for a photo viewing application. Does not include a backend/protocol.

## install
```
npm i @nichoth/photos
```

## example

```js
var photos = require('@nichoth/photos')
var evs = require('@nichoth/photos/EVENTS')
import { render } from 'preact'

var { bus, setRoute, photosComponent, state } = photos()

bus.on('*', (eventName, data) => {
    console.log('*', eventName, data)
})

bus.on(evs.route.change, route => {
    state.route.set(route)
})

render(html`<${photosComponent}>
    <p>woooo</p>
</${photosComponent}`, document.getElementById('content'))
```

## events
```js
var evs = require('@nichoth/events/namespace')({
    test: ['foo'],
    profile: ['setAvatar', 'save', 'get'],
    route: ['change'],
    posts: ['get'],
    post: ['new'],
    followed: ['get'],
    follow: ['start'],
    pub: ['join'],
    feed: ['get'],
    people: ['getProfile']
})
```

## state
```js
var state = struct({
    route: observ('/'),
    me: observ({}),
    posts: observ(null),
    postUrls: observ({}),
    people: observ({}),
    followed: observ([]),
    feeds: observ({}),
    pubs: struct({
        list: observ([]),
        err: observ(null)
    })
})
```

