import { h } from "preact";

import Loadable from "./loadable";

export default class ChatPost extends Loadable {
  render(props) {
    return (
      <div ref={frame => (this.frame = frame)}>
        <h3>{props.Title}</h3>
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
