import { h } from "preact";

import Loadable from "./loadable";

export default class QuotePost extends Loadable {
  render(props) {
    return (
      <div ref={frame => (this.frame = frame)}>
        <h3>"{props.Quote}"</h3>
        {props.Source && (
          <p>
            &emsp;&mdash;&emsp;
            <span
              dangerouslySetInnerHTML={{
                __html:
                  props.Source &&
                  props.Source.replace(/(%[\da-fA-F]{2})/g, m =>
                    decodeURIComponent(m)
                  )
              }}
            />
          </p>
        )}
      </div>
    );
  }
}
