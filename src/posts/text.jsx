import { h } from "preact";

export default class TextSingle {
  render(props) {
    // console.log(props.Body, props.Body.match(/(?:%[\da-fA-F]{2})+/g));

    return (
      <div>
        {props.Title && <h2>{props.Title}</h2>}
        <div
          dangerouslySetInnerHTML={{
            __html:
              props.Body &&
              props.Body.replace(/(?:%[\da-fA-F]{2})+/g, m =>
                decodeURIComponent(m)
              )
          }}
        />
      </div>
    );
  }
}
