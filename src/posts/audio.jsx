import { h } from "preact";

export default class AudioSingle {
  render(props) {
    const embed = props.AudioEmbed.replace(/(%[\da-fA-F]{2})/g, m =>
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
            props.AudioEmbed &&
            props.AudioEmbed.replace(/(%[\da-fA-F]{2})/g, m =>
              decodeURIComponent(m)
            )
        }}
        style={`padding-bottom:${(this.embedHeight / this.embedWidth) * 100}%`}
      />
    );
  }
}
