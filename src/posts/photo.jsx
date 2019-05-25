import { h, Component } from "preact";

import fetchRowPhotos from "../functions/fetchRowPhotos";

export default class PhotoPost extends Component {
  constructor(props) {
    super();
    this.numImages = props.Photos ? props.Photos.length : 1;
    this.loaded = 0;
    this.images = [];
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
    this.loaded++;
    if (this.loaded >= this.numImages) {
      this.props.loadPost();
    }
  }
  componentDidMount() {
    this.images.forEach(image => {
      if (image.complete) {
        this.loaded++;
        if (this.loaded >= this.numImages) {
          this.props.loadPost();
        }
      }
    });
  }
  render(props) {
    return (
      <a href={`${props.Permalink}`}>
        {props["PhotoURL-400"] && (
          <img
            alt={props.PhotoAlt}
            class="post-photo"
            onLoad={() => this.loadPhoto()}
            ref={img => this.images.push(img)}
            src={props["PhotoURL-400"]}
          />
        )}
        {props.PhotosetLayout &&
          props.PhotosetLayout.map((layout, layoutIndex) => (
            <div class="row" key={`${props.Permalink}-${layoutIndex}`}>
              {fetchRowPhotos(
                layout,
                layoutIndex,
                props.PhotosetLayout,
                props.Photos
              ).map(photo => (
                <img
                  alt={photo.PhotoAlt}
                  class={`col-${12 / parseInt(layout, 10)} post-photo`}
                  key={photo["PhotoURL-400"]}
                  onLoad={() => this.loadPhoto()}
                  ref={img => this.images.push(img)}
                  src={photo["PhotoURL-400"]}
                />
              ))}
            </div>
          ))}
      </a>
    );
  }
}
