import { h } from "preact";

import Loadable from "./loadable";

export default class AnswerPost extends Loadable {
  render(props) {
    return (
      <div ref={frame => (this.frame = frame)}>
        <h3
          dangerouslySetInnerHTML={{
            __html:
              props.Question &&
              props.Question.replace(/(%[\da-fA-F]{2})/g, m =>
                decodeURIComponent(m)
              )
          }}
        />
        <h3
          dangerouslySetInnerHTML={{
            __html:
              props.Replies &&
              props.Replies.replace(/(%[\da-fA-F]{2})/g, m =>
                decodeURIComponent(m)
              )
          }}
        />
      </div>
    );
  }
}
