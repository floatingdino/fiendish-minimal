import { h } from "preact";

import fetchRowPhotos from "functions/fetchRowPhotos";

export default class PhotoSingle {
  render(props) {
    const photoIndex = props.highRes ? "PhotoURL-HighRes" : "PhotoURL-400";
    return (
      <figure>
        {props[photoIndex] && (
          <img
            alt={props.PhotoAlt}
            class="post-photo"
            src={props[photoIndex]}
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
                  key={photo[photoIndex]}
                  src={photo[photoIndex]}
                />
              ))}
            </div>
          ))}
        <caption
          dangerouslySetInnerHTML={{
            __html: props.Caption && decodeURI(props.Caption)
          }}
        />
      </figure>
    );
  }
}
