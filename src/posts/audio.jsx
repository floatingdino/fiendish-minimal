import { h } from "preact";

import Loadable from "./loadable";

export default class AudioPost extends Loadable {
  constructor(props) {
    super();
    const embed = props.AudioEmbed.replace(/(%[\da-fA-F]{2})/g, m =>
      decodeURIComponent(m)
    );

    console.dir(embed);
    this.embedWidth = parseInt(embed.match(/width=(?:'|")(\d+)(?:'|")/)[1], 10);
    this.embedHeight = parseInt(
      embed.match(/height=(?:'|")(\d+)(?:'|")/)[1],
      10
    );
  }
  render(props) {
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
        ref={frame => (this.frame = frame)}
        style={`padding-bottom:${(this.embedHeight / this.embedWidth) * 100}%`}
      />
    );
  }
}
