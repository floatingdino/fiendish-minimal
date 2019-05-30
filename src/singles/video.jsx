import { h } from "preact";

export default class VideoSingle {
  render(props) {
    const embed = props.VideoEmbed.replace(/(%[\da-fA-F]{2})/g, m =>
      decodeURIComponent(m)
    );
    this.embedWidth = parseInt(embed.match(/width=(?:'|")(\d+)(?:'|")/)[1], 10);
    this.embedHeight = parseInt(
      embed.match(/height=(?:'|")(\d+)(?:'|")/)[1],
      10
    );
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
