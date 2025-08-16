import Image from 'next/image';
import { FC } from 'react';

import { IconProps } from './icon-types';

export const IconContinue: FC<IconProps> = ({
  className,
  style,
  size = '1em',
  alt = 'Continue Icon',
}) => (
  <Image
    className={className}
    style={{
      width: size,
      height: size,
      objectFit: 'cover',
      ...style,
    }}
    src='/components/icons/images/icon-continue.jpg'
    alt={alt}
    width={24}
    height={24}
  />
);
