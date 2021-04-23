import { html } from 'htm/preact'
import { useState, useEffect } from 'preact/hooks';
var Bus = require('@nichoth/events')
var OnRoute = require('route-event')
var raf = require('raf')
var Shell = require('./shell')
var state = require('./state')
var Router = require('./routes')
var evs = require('../EVENTS')

function photos () {
    var bus = Bus({
        memo: true
    })
    var emit = bus.emit.bind(bus)

    function Component (props) {
        var { emit, state } = props
        var router = Router()
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
    
        return html`<${Shell} emit=${emit} ...${_state}>
            <${routeView} emit=${emit} ...${_state} />
            ${props.children}
        <//>`
    }

    var photosComponent = function (props) {
        return html`<${Component} emit=${emit} state=${state}>
            ${props.children}
        </${Component}>`
    }

    // var _html = html`<${Component} emit=${emit} state=${state} />`

    var onRoute = OnRoute()

    onRoute(path => {
        emit(evs.route.change, path)
    })
    var { setRoute } = onRoute

    return { bus, setRoute, photosComponent, state }
}

module.exports = photos
