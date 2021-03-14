import { html } from 'htm/preact'
import { generateFromString } from 'generate-avatar'

function createPostView (postId) {
    return function PostView (props) {
        console.log('props', props)
        var post = props.posts.find(post => post.key === postId)
        var fileHash = post.value.content.mentions[0].link
        var imgUrl = props.postUrls[fileHash]

        var author = (props.people[post.value.author] || {})
        var authorId = post.value.author

        var postAvatarUrl = (author.imgUrl ||
            ('data:image/svg+xml;utf8,' + generateFromString(authorId))
        )

        return html`<div class="single-post">
            <img src="${imgUrl}" />

            <div class="author">
                <div class="post-avatar">
                    <img src="${postAvatarUrl}" />
                </div>

                <h1>
                    <a href="/${authorId}">${author.name}</a>
                </h1>
            </div>

            ${post.value.content.text ?
                html`<div class="post-text">
                    ${post.value.content.text}
                </div>` :
                null
            }
        </div>`
    }
}

module.exports = createPostView
