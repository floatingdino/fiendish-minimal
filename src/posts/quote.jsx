import { h } from "preact";

export default class QuoteSingle {
  render(props) {
    return (
      <div>
        <h3>{props.Quote}</h3>
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
