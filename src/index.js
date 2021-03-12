import { html } from 'htm/preact'
import { render } from 'preact'
var Bus = require('@nichoth/events')
var OnRoute = require('route-event')

function photos () {
    var bus = Bus({
        memo: true
    })
    var emit = bus.emit.bind(bus)

    var _html = html`<p>fooooooo</p>`

    var onRoute = OnRoute()

    onRoute(path => emit(evs.route.change, path))
    var { setRoute } = onRoute

    render(_html, document.getElementById('content'))

    return { bus, setRoute }
}

photos()

module.exports = photos
