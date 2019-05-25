import { h } from "preact";

import fetchRowPhotos from "../fetchRowPhotos";

export default class PhotoSingle {
  render(props) {
    return (
      <div>
        {props["PhotoURL-HighRes"] && (
          <img alt={props.PhotoAlt} src={props["PhotoURL-HighRes"]} />
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
                  class={`col-${12 / parseInt(layout, 10)}`}
                  key={photo["PhotoURL-HighRes"]}
                  src={photo["PhotoURL-HighRes"]}
                />
              ))}
            </div>
          ))}
        <div dangerouslySetInnerHTML={{ __html: props.Caption }} />
      </div>
    );
  }
}
