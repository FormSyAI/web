import type { CSSProperties, ImgHTMLAttributes } from 'react';

import { withBasePath } from './app-link';

type AppImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'alt' | 'src'> & {
  alt: string;
  src: string;
  fill?: boolean;
  priority?: boolean;
  unoptimized?: boolean;
};

export default function AppImage({
  alt,
  fill,
  height,
  priority,
  src,
  style,
  unoptimized: _unoptimized,
  width,
  ...props
}: AppImageProps) {
  const fillStyle: CSSProperties | undefined = fill
    ? {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        ...style,
      }
    : style;

  return (
    // The static Vite build deliberately uses the browser's native image element.
    // oxlint-disable-next-line next/no-img-element
    <img
      {...props}
      alt={alt}
      src={withBasePath(src)}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      style={fillStyle}
      loading={priority ? 'eager' : props.loading}
      fetchPriority={priority ? 'high' : props.fetchPriority}
    />
  );
}
