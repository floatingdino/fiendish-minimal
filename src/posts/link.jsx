import { h } from "preact";

export default class LinkSingle {
  render(props) {
    return (
      <a
        class="link-post"
        href={props.URL.replace(/&amp;/g, "&")}
        rel="nofollow noopener"
        target="_blank">
        {props["Thumbnail-HighRes"] && (
          <img alt="" src={props["Thumbnail-HighRes"]} />
        )}
        <div class="link-post-body">
          {props.Host && <h3>{props.Host}</h3>}
          {props.Description && (
            <div
              dangerouslySetInnerHTML={{
                __html:
                  props.Description &&
                  props.Description.replace(/(%[\da-fA-F]{2})/g, m =>
                    decodeURIComponent(m)
                  )
              }}
            />
          )}
        </div>
      </a>
    );
  }
}
