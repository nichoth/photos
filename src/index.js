import { html } from 'htm/preact'
import { useState, useEffect } from 'preact/hooks';
var Bus = require('@nichoth/events')
var OnRoute = require('route-event')
var raf = require('raf')
var Shell = require('./shell')
var state = require('./state')

function photos () {
    var bus = Bus({
        memo: true
    })
    var emit = bus.emit.bind(bus)

    function Component ({ emit, state }) {
        var router = Router({ emit, state })
        const [_state, setState] = useState(state())
    
        state(function onChange (newState) {
            raf(() => setState(newState))
        })
    
        useEffect(() => {
            emit(evs.profile.get, null)
        }, [])
    
        var match = router.match(_state.route || '/')
        var route = match ? match.action(match) : null
        var routeView = route ? route.view : null
    
        console.log('in component', _state)
    
        return html`<${Shell} emit=${emit} ...${_state}>
            <${routeView} emit=${emit} ...${_state} />
        <//>`
    }

    var _html = html`<${Component} emit=${emit} state=${state} />`

    var onRoute = OnRoute()

    onRoute(path => emit(evs.route.change, path))
    var { setRoute } = onRoute

    return { bus, setRoute, html: _html, state }
}

module.exports = photos
