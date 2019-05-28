import { h, Component } from "preact";

import getDataFromResponse from "../functions/getDataFromResponse";

import PhotoSingle from "../singles/photo";
import TextSingle from "../singles/text";

export default class Single extends Component {
  constructor(props) {
    super();
    this.state = {
      post:
        props.Post ||
        (props.Posts &&
          props.Posts().filter(post => post.Permalink === props.url)[0]) ||
        false,
      notes: ""
    };
  }
  componentWillMount() {
    this.props.setPageType("single");
    if (!this.props.Post) {
      this.fetchPost();
    } else {
      this.fetchNotes();
    }
  }
  fetchNotes() {
    if (this.state.post.PostNotesURL) {
      fetch(this.state.post.PostNotesURL)
        .then(resp => resp.text())
        .then(notes => {
          this.setState({
            post: {
              ...this.state.post,
              PostNotes: notes
            }
          });
        });
    }
  }
  fetchPost() {
    fetch(this.props.url)
      .then(resp => resp.text())
      .then(resp => {
        const data = getDataFromResponse(resp);
        this.setState({
          post: data.Post
        });
        this.fetchNotes();
      });
  }

  render(props, state) {
    const post = state.post;
    return (
      <article class={`${post.PostType} ${post.TagsAsClasses}`}>
        {post.PostType === "photo" && <PhotoSingle {...post} />}
        {post.PostType === "text" && <TextSingle {...post} />}
        {post.Date && <time>{post.Date}</time>}
        {post.Tags && (
          <ul class="tags">
            {post.Tags.map(Tag => (
              <li class={Tag} key={Tag}>
                {Tag}
              </li>
            ))}
          </ul>
        )}
        {post.NoteCount && (
          <div>
            <h2>{post.NoteCount} Notes</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: decodeURIComponent(post.PostNotes)
              }}
            />
          </div>
        )}
      </article>
    );
  }
}
