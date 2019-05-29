import { h, Component } from "preact";

import PhotoPost from "./photo";
import TextPost from "./text";
import QuotePost from "./quote";
import AnswerPost from "./answer";
import VideoPost from "./video";
import AudioPost from "./audio";
import ChatPost from "./chat";
import LinkPost from "./link";

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
    return !(this.state == nextState);
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
        {props.PostType === "photo" && (
          <PhotoPost {...props} loadPost={() => this.loadPost()} />
        )}
        {props.PostType === "text" && (
          <TextPost {...props} loadPost={() => this.loadPost()} />
        )}
        {props.PostType === "quote" && (
          <QuotePost {...props} loadPost={() => this.loadPost()} />
        )}
        {props.PostType === "answer" && (
          <AnswerPost {...props} loadPost={() => this.loadPost()} />
        )}
        {props.PostType === "video" && (
          <VideoPost {...props} loadPost={() => this.loadPost()} />
        )}
        {props.PostType === "audio" && (
          <AudioPost {...props} loadPost={() => this.loadPost()} />
        )}
        {props.PostType === "chat" && (
          <ChatPost {...props} loadPost={() => this.loadPost()} />
        )}
        {props.PostType === "link" && (
          <LinkPost {...props} loadPost={() => this.loadPost()} />
        )}
      </article>
    );
  }
}
