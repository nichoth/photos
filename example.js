var photos = require('./src')
var evs = require('./EVENTS')
import { render } from 'preact'

var { bus, setRoute, html, state } = photos()

bus.on('*', (eventName, data) => {
    console.log('*', eventName, data)
})

bus.on(evs.route.change, function (ev) {
    console.log('route change in here', ev)
})


render(html, document.getElementById('content'))
