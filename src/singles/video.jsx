import { h } from "preact";

export default class VideoSingle {
  render(props) {
    return (
      <div
        class="embed-wrapper"
        dangerouslySetInnerHTML={{
          __html:
            props.VideoEmbed &&
            props.VideoEmbed.replace(/(%[\da-fA-F]{2})/g, m =>
              decodeURIComponent(m)
            )
        }}
        style={`padding-bottom:${(this.embedHeight / this.embedWidth) * 100}%`}
      />
    );
  }
}
