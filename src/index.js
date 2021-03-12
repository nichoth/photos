import { html } from 'htm/preact'
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

    return { bus, setRoute, html: _html }
}

module.exports = photos
