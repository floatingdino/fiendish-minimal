import { h, Component } from "preact";

import getDataFromResponse from "../functions/getDataFromResponse";

import PhotoSingle from "../singles/photo";

export default class Single extends Component {
  constructor(props) {
    super();
    this.state = {
      post:
        props.Post ||
        props.Posts().filter(post => post.Permalink === props.url)[0]
    };
  }
  componentWillMount() {
    this.props.setPageType("single");
    if (!this.props.Post) {
      this.fetchPost();
    }
  }
  fetchPost() {
    console.log(this);
    fetch(this.props.url)
      .then(resp => resp.text())
      .then(resp => {
        const data = getDataFromResponse(resp);
        console.log(data);
        this.setState({
          post: data.Post
        });
      });
  }

  render(props, state) {
    const post = state.post;
    return (
      <article class={`${post.PostType} ${post.TagsAsClasses}`}>
        {post.PostType === "photo" && <PhotoSingle {...post} />}
        {post.Date && <h2>{post.Date}</h2>}
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
            <h2>{post.NoteCount}</h2>
            <div
              dangerouslySetInnerHTML={{ __html: decodeURI(post.PostNotes) }}
            />
          </div>
        )}
      </article>
    );
  }
}
