var evs = require('../../EVENTS')
import { html } from 'htm/preact'
import { Component } from 'preact'
import { useEffect } from 'preact/hooks';
var marked = require('ssb-marked')
import { generateFromString } from 'generate-avatar'

class PostText extends Component {
    shouldComponentUpdate() {
        return false
    }

    componentDidMount() {
        if (!this.props.text) return
        this.base.innerHTML = marked(this.props.text)
    }

    render (props) {
        if (!props.text) return null
        return html`<div class="post-text"></div>`
    }
}

function Home (props) {
    console.log('props in home', props)
    var { followed, emit } = props

    useEffect(() => {
        emit(evs.followed.get, null)
        emit(evs.posts.get, null)
    }, [])

    if (!props.posts) return null

    return html`<div class="route-home">
        <ul class="post-list">
            ${props.posts.map(post => {
                var hash = post.value.content.mentions[0] ?
                    post.value.content.mentions[0].link :
                    null
                if (!hash) return null

                var authorId = post.value.author
                var author = ((props.people || {})[authorId] || {
                    id: authorId,
                    name: authorId
                })
                var postAvatar = (author.imgUrl ||
                    ('data:image/svg+xml;utf8,' +
                        generateFromString(authorId)
                    )
                )

                var isFollowing = followed.find(({ id }) => {
                    return id === authorId
                })

                return html`<li class="post">
                    <a class="post-link"
                        href="/post/${encodeURIComponent(post.key)}"
                    >
                        <img src=${props.postUrls[hash]} />
                    </a>

                    <div class="post-attributes">
                        <a class="avatar-link" href="/${authorId}">
                            <div class="post-avatar">
                                <img src="${postAvatar}" />
                            </div>
                        </a>
                        <div class="post-metadata">
                            <${PostText} text=${post.value.content.text} />
                            <div class="author">
                                <a href="/${authorId}">
                                    ${author.name}
                                </a>
                                ${authorId === props.me.id ?
                                    ' (you)' :
                                    null
                                }
                            </div>
                        </div>

                        <${FollowIcon} authorId=${authorId}
                            id=${props.me.id} isFollowing=${isFollowing}
                            onFollow=${emit(evs.follow.start)}
                        />
                    </div>
                </li>`

            })}
        </ul>

    </div>`
}

function FollowIcon (props) {
    var { authorId, id, isFollowing, onFollow } = props
    // if it's your own message
    if (authorId === id) return null

    if (isFollowing) {
        return html`<div class="follow-icon">
            <button title="You are already following this feed"
                onClick=${ev => ev.preventDefault()}
                disabled=${true}
            >
                *
            </button>
        </div>`
    }

    return html`<div class="follow-icon">
        <button title="follow" onClick=${ev => {
            ev.preventDefault()
            onFollow({ id: authorId })
        }}>*</button>
    </div>`
}

module.exports = Home
