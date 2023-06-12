"use client";

import React, { useCallback, useEffect, useState } from "react";

interface ImageWithFallbackProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  fallbackSrc: string;
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

export const ImageWithFallback = React.forwardRef(
  (
    { onError, fallbackSrc, ...props }: ImageWithFallbackProps,
    ref: React.Ref<HTMLImageElement>
  ) => {
    const [imageLoadFailed, setImageLoadFailed] = useState<boolean>(false);

    const handleError = useCallback(
      (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        if (imageLoadFailed) return;
        setImageLoadFailed(true); // to avoid infinite loop
        if (onError) {
          onError(e);
        }
      },
      [imageLoadFailed, setImageLoadFailed, onError]
    );

    useEffect(() => {
      setImageLoadFailed(false); // in case `src` is changed
    }, [props.src]);

    const imageSrc = imageLoadFailed
      ? fallbackSrc
      : !props.src
      ? fallbackSrc
      : props.src;

    return <img {...props} src={imageSrc} onError={handleError} ref={ref} />;
  }
);
