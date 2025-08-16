import Image from 'next/image';
import { FC } from 'react';

import { IconProps } from './icon-types';

export const IconHttp: FC<IconProps> = ({
  className,
  style,
  size = '1em',
  alt = 'HTTP Icon',
}) => (
  <Image
    className={className}
    style={{
      width: size,
      height: size,
      objectFit: 'cover',
      ...style,
    }}
    src='/components/icons/images/icon-http.svg'
    alt={alt}
    width={24}
    height={24}
  />
);
