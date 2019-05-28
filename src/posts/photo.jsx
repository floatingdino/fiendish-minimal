import { h, Component } from "preact";

import fetchRowPhotos from "../functions/fetchRowPhotos";

export default class PhotoPost extends Component {
  constructor(props) {
    super();
    this.numImages = props.Photos ? props.Photos.length : 1;

    this.expanded = /x2|x3/.test(props.TagsAsClasses);

    // Use high-res source if the post is tagged to be expanded and user is on a large enough screen for it to matter
    this.src =
      this.expanded && window.innerWidth > 420
        ? props["PhotoURL-HighRes"]
        : props["PhotoURL-400"];
    this.loaded = 0;
    this.images = [];
  }
  loadPhoto() {
    // Tell the parent when the post is completely loaded (all photos)
    this.loaded++;
    if (this.loaded >= this.numImages) {
      this.props.loadPost();
    }
  }
  componentDidMount() {
    // Sometimes if the image is already cached it won't fire the onload, so this catches that
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
        {this.src && (
          <img
            alt={props.PhotoAlt}
            class="post-photo"
            onLoad={() => this.loadPhoto()}
            ref={img => this.images.push(img)}
            src={this.src}
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
                  src={
                    this.expanded
                      ? photo["PhotoURL-HighRes"]
                      : photo["PhotoURL-400"]
                  }
                />
              ))}
            </div>
          ))}
      </a>
    );
  }
}
