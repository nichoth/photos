var photos = require('./src')
var evs = require('./EVENTS')
import { html } from 'htm/preact';

import { render } from 'preact'

var { bus, setRoute, photosComponent, state } = photos()

bus.on('*', (eventName, data) => {
    console.log('*', eventName, data)
})

bus.on(evs.route.change, function (ev) {
    console.log('route change in here', ev)
})


render(html`<${photosComponent}>
    <p>woooo</p>
</${photosComponent}`, document.getElementById('content'))
