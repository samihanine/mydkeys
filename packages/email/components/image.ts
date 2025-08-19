export const Image = ({
  src,
  alt,
  width,
  height
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}): string => {
  const widthAttr = width ? `width="${width}"` : '';
  const heightAttr = height ? `height="${height}"` : '';
  const widthStyle = width ? `width: ${width}px;` : '';
  const heightStyle = height ? `height: ${height}px;` : '';

  return `
    <img src="${src}" alt="${alt}" ${widthAttr} ${heightAttr} style="
      display: block;
      ${widthStyle}
      ${heightStyle}
      max-width: 100%;
      height: auto;
    " />
  `;
};
