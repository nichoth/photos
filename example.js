var photos = require('./src')
import { render } from 'preact'

var { bus, setRoute, html } = photos()

render(html, document.getElementById('content'))
