import { h, Component } from "preact";

import getDataFromResponse from "functions/getDataFromResponse";

import AnswerSingle from "posts/answer";
import AudioSingle from "posts/audio";
import ChatSingle from "posts/chat";
import LinkSingle from "posts/link";
import PhotoSingle from "posts/photo";
import QuoteSingle from "posts/quote";
import TextSingle from "posts/text";
import VideoSingle from "posts/video";

const Posts = {
  answer: AnswerSingle,
  audio: AudioSingle,
  chat: ChatSingle,
  link: LinkSingle,
  photo: PhotoSingle,
  quote: QuoteSingle,
  text: TextSingle,
  video: VideoSingle
};

const PostBody = props => {
  const Component = Posts[props.PostType];
  return <Component {...props} />;
};

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
  componentWillReceiveProps(nextProps) {
    if (nextProps.url !== this.props.url) {
      this.setState({
        Post: null
      });
      this.fetchPost(nextProps.url);
    }
  }
  fetchNotes() {
    // Fetch notes if we know it has notes and the user isn't on "Data saver" mode
    if (
      parseInt(this.state.post.NoteCount, 10) > 0 &&
      !("connection" in navigator && navigator.connection.saveData) &&
      this.state.post.PostNotesURL
    ) {
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
  fetchPost(url = this.props.url) {
    fetch(url)
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
      <main class="single-wrapper">
        <article class={`${post.PostType} ${post.TagsAsClasses}`}>
          {<PostBody {...post} />}
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
          {parseInt(post.NoteCount, 10) > 0 && (
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
      </main>
    );
  }
}
