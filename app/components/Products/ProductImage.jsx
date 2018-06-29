import React from 'react';
import { WP_URL } from '../../../server/config/app';

export const ProductImage = props => {
  const { baseImage } = props;
  return (
    <img src={`${WP_URL}${baseImage.src}`} alt={baseImage.alt} />
  );
};
