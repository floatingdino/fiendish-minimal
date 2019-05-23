import { h, Component } from "preact";

export default class PhotoPost extends Component {
  constructor(props) {
    super();
    this.numImages = props.Photos ? props.Photos.length : 1;
    this.state = {
      loaded: 0
    };
  }
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
  loadPhoto() {
    this.state.loaded++;
    if (this.state.loaded >= this.numImages) {
      this.props.loadPost();
    }
  }
  render(props) {
    return (
      <a href={`${props.Permalink}#title`}>
        {props["PhotoURL-400"] ? (
          <img
            src={props["PhotoURL-400"]}
            alt={props.PhotoAlt}
            onLoad={() => this.loadPhoto()}
          />
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
                    onLoad={() => this.loadPhoto()}
                  />
                ))}
              </div>
            ))
          : ""}
      </a>
    );
  }
}
