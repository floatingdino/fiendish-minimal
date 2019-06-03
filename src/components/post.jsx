import { h } from "preact";

import Loadable from "classes/loadable";

import PhotoPost from "posts/photo";
import TextPost from "posts/text";
import QuotePost from "posts/quote";
import AnswerPost from "posts/answer";
import VideoPost from "posts/video";
import AudioPost from "posts/audio";
import ChatPost from "posts/chat";
import LinkPost from "posts/link";

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
  const highRes = /x2|x3/.test(props.TagsAsClasses);
  return <Component {...props} highRes={highRes} />;
};

export default class Post extends Loadable {
  constructor() {
    super();
    this.state = {
      loaded: false
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !(this.state == nextState) || !this.props.Masonry();
  }
  render(props, state) {
    return (
      <article
        class={`${props.PostType} ${props.TagsAsClasses} ${state.loaded &&
          props.Masonry() &&
          "loaded"}`}
        ref={frame => (this.frame = frame)}>
        <h2>
          <a class="black" href={`${props.Permalink}`}>
            x {props.ReblogRootName || ""}
          </a>
        </h2>
        <PostBody {...props} />
      </article>
    );
  }
}
