import Image from 'next/image';

type BrandProps = {
  inverse?: boolean;
};

export function Brand({ inverse = false }: BrandProps) {
  return (
    <a
      className={`brand${inverse ? ' brand-inverse' : ''}`}
      href="#top"
      aria-label="AURINOVA 首页"
    >
      <Image
        className="brand-logo"
        src="/aurinova-logo.svg"
        alt="AURINOVA"
        width={1186}
        height={204}
      />
    </a>
  );
}
