import { html } from 'htm/preact'
var evs = require('../../EVENTS')
var get = require('lodash/get')
import { generateFromString } from 'generate-avatar'

function pubsRoute ({ emit, pubs, followed, people }) {

    return html`<div class="pubs-route">
        <form onsubmit=${ev => {
            ev.preventDefault()
            var invite = ev.target.elements.invite.value
            emit(evs.pub.join, invite)
        }}>

            <${FormInput} label="Invite code" name="invite" class="pubs" />

            <button type="submit">Join pub</button>
        </form>

        <hr />

        <h2>Current pubs</h2>
        ${pubs.list.length === 0 ?
            html`<div><em>none</em></div>` :
            html`<ul class="pubs-list">
                ${pubs.list.map(function (pub) {
                    return html`<li class="pub">
                        ${get(pub, 'value.content.address.host', null)}
                    </li>`
                })}
            </ul>`
        }

        <h2>Following</h2>
        ${followed.length === 0 ?
            html`<div><em>none</em></div>` :
            html`<ul class="following-list">
                ${followed.map(function (foll) {

                    var person = ((people || {})[foll.id] || {
                        id: foll.id,
                        name: foll.id
                    })
                    var avatar = (person.imgUrl ||
                        ('data:image/svg+xml;utf8,' +
                        generateFromString(foll.id))
                    )

                    return html`<li class="following">
                        <span class="followed-avatar">
                            <img src=${avatar} />
                        </span>
                        <a href="/${foll.id}">
                            ${person.name}
                        </a>
                    </li>`
                })}
            </ul>`
        }

    </div>`
}

function FormInput (props) {
    var { label, name } = props
    return html`<div class="form-part ${props.class}">
        <label for="${name}">${label}</label>
        <input name="${name}" id=${name} type="text" />
    </div>`
}

module.exports = pubsRoute
