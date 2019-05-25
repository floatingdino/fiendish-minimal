export default function fetchRowPhotos(
  layout,
  layoutIndex,
  PhotosetLayout,
  Photos
) {
  const startIndex = PhotosetLayout.slice(0, layoutIndex).reduce(
    (a, b) => a + parseInt(b, 10),
    0
  );
  return Photos.slice(startIndex, startIndex + parseInt(layout, 10));
}
