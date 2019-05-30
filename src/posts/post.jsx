import { h, Component } from "preact";

import PhotoPost from "./photo";
import TextPost from "./text";
import QuotePost from "./quote";
import AnswerPost from "./answer";
import VideoPost from "./video";
import AudioPost from "./audio";
import ChatPost from "./chat";
import LinkPost from "./link";

const Posts = {
  answer: AnswerPost,
  audio: AudioPost,
  chat: ChatPost,
  link: LinkPost,
  photo: PhotoPost,
  quote: QuotePost,
  text: TextPost,
  video: VideoPost
};

const PostBody = props => {
  const Component = Posts[props.PostType];
  return <Component {...props} />;
};

export default class Post extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false
    };
  }
  componentDidMount() {
    if (this.props.Masonry()) {
      this.props.Masonry().appended(this.post);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !(this.state == nextState) || !this.props.Masonry();
  }
  loadPost() {
    this.props.loadPost();
    this.setState({
      loaded: true
    });
  }
  render(props, state) {
    return (
      <article
        class={`${props.PostType} ${props.TagsAsClasses} ${state.loaded &&
          this.props.Masonry() &&
          "loaded"}`}
        ref={post => (this.post = post)}>
        <h2>
          <a class="black" href={`${props.Permalink}`}>
            x {props.ReblogRootName || ""}
          </a>
        </h2>
        <PostBody {...props} loadPost={() => this.loadPost()} />
      </article>
    );
  }
}
