// absoule
import React from "react";
import Image from "next/image";

interface IImageProps {
  src: string | StaticImageData;
  className: string;
}

const ImageComponent: React.FunctionComponent<IImageProps> = ({ className, src }) => {
  return (
    <div className={className}>
      <Image src={src} layout="fill" />
    </div>
  );
};

export default ImageComponent;
