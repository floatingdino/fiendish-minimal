import { h } from "preact";

import fetchRowPhotos from "../functions/fetchRowPhotos";

export default class PhotoSingle {
  render(props) {
    return (
      <figure>
        {props["PhotoURL-HighRes"] && (
          <img
            alt={props.PhotoAlt}
            class="post-photo"
            src={props["PhotoURL-HighRes"]}
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
                  key={photo["PhotoURL-HighRes"]}
                  src={photo["PhotoURL-HighRes"]}
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
