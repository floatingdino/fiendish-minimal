import { h } from "preact";

export default class ChatSingle {
  render(props) {
    return (
      <div>
        {props.Title && <h3>{props.Title}</h3>}
        <dl>
          {props.Lines.map(line => (
            <div key={`${line.Line}-${line.Label}`}>
              {line.Label && <dt class="speaker">{line.Label}</dt>}
              <dd class="tailed-answer">{line.Line}</dd>
            </div>
          ))}
        </dl>
      </div>
    );
  }
}
