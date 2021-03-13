var photos = require('./src')
import { render } from 'preact'

var { bus, setRoute, html } = photos()

bus.on('*', (eventName, data) => {
    console.log('*', eventName, data)
})

render(html, document.getElementById('content'))
