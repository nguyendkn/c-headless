import Image from 'next/image';
import { FC } from 'react';

import { IconProps } from './icon-types';

export const IconScript: FC<IconProps> = ({
  className,
  style,
  size = '1em',
  alt = 'Script Icon',
}) => (
  <Image
    className={className}
    style={{
      width: size,
      height: size,
      objectFit: 'cover',
      ...style,
    }}
    src='/components/icons/images/icon-script.png'
    alt={alt}
    width={24}
    height={24}
  />
);
