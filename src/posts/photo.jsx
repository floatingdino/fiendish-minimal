import { h, Component } from "preact";

export default class PhotoPost extends Component {
  fetchRowPhotos(layout, layoutIndex) {
    const startIndex = this.props.PhotosetLayout.slice(0, layoutIndex).reduce(
      (a, b) => a + parseInt(b, 10),
      0
    );
    return this.props.Photos.slice(
      startIndex,
      startIndex + parseInt(layout, 10)
    );
  }
  render(props) {
    return (
      <a href={`${props.Permalink}#title`}>
        {props["PhotoURL-400"] ? (
          <img src={props["PhotoURL-400"]} alt={props.PhotoAlt} />
        ) : (
          ""
        )}
        {props.PhotosetLayout
          ? props.PhotosetLayout.map((layout, layoutIndex) => (
              <div class="row">
                {this.fetchRowPhotos(layout, layoutIndex).map(photo => (
                  <img
                    class={`col-${12 / parseInt(layout, 10)}`}
                    src={photo["PhotoURL-400"]}
                    alt={photo.PhotoAlt}
                  />
                ))}
              </div>
            ))
          : ""}
      </a>
    );
  }
}
