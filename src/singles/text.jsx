import { h } from "preact";

export default class TextSingle {
  render(props) {
    return (
      <div>
        {props.Title && <h3>{props.Title}</h3>}
        <div
          dangerouslySetInnerHTML={{
            __html:
              props.Body &&
              props.Body.replace(/(%[\da-fA-F]{2})/g, m =>
                decodeURIComponent(m)
              )
          }}
        />
      </div>
    );
  }
}
