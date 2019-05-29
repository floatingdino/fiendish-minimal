import { h } from "preact";

import Loadable from "./loadable";

export default class AnswerPost extends Loadable {
  constructor(props) {
    super();
    this.Replies = props.Replies.replace(/(%[\da-fA-F]{2})/g, m =>
      decodeURIComponent(m)
    );
  }
  render(props) {
    return (
      <div ref={frame => (this.frame = frame)}>
        <div class="speaker-comment">
          <h3 class="speaker">{props.Asker}:</h3>
          <p>{props.Question}</p>
        </div>
        <div
          class="answer-body"
          dangerouslySetInnerHTML={{
            __html: this.Replies
          }}
        />
      </div>
    );
  }
}
