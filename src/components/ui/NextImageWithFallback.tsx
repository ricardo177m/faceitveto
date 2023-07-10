"use client";

import Image, { ImageProps } from "next/image";

import { useState } from "react";

interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc: string;
}

const NextImageWithFallback = (props: ImageWithFallbackProps) => {
  const { src, fallbackSrc, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image {...rest} src={imgSrc} onError={() => setImgSrc(fallbackSrc)} />
  );
};

export default NextImageWithFallback;
