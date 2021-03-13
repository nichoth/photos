var observ = require('observ')
var struct = require('observ-struct')

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

module.exports = state
