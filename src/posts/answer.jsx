import { h } from "preact";

export default class AnswerSingle {
  render(props) {
    this.Replies = props.Replies.replace(/(%[\da-fA-F]{2})/g, m =>
      decodeURIComponent(m)
    );
    return (
      <div>
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
