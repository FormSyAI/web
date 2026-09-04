import Image from 'next/image';

export function AurinovaArtworkImage({
  alt,
  priority = false,
  sizes,
  src,
}: {
  alt: string;
  priority?: boolean;
  sizes: string;
  src: string;
}) {
  if (src === '/aurinova-logo.svg') {
    return (
      <Image
        className="fw-placeholder-logo"
        src={src}
        alt={alt}
        width={1186}
        height={204}
        priority={priority}
        sizes={sizes}
        unoptimized
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      unoptimized
    />
  );
}
