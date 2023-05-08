"use client";

import Image, { ImageProps } from "next/image";

import React, { useState } from "react";

interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc: string;
}

const NextImageWithFallback = (props: ImageWithFallbackProps) => {
  const { src, fallbackSrc, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
      onLoadingComplete={(result) => {
        // broken image
        // ! firefox doesn't seem to like this
        // if (result.naturalWidth === 0) setImgSrc(fallbackSrc);
      }}
    />
  );
};

export default NextImageWithFallback;
