import React, { useContext } from 'react';
import MainContext from '../context/MainContext';

export default function ProductPreview() {
  const { productPreview } = useContext(MainContext);

  return (
    <div className='product-preview'>
      <h2 className='preview-title'>Product preview</h2>
      {productPreview && (
        <div className='product'>
          <img src={productPreview.image} alt='' />
          <p className='prod-title'>{productPreview.title}</p>
          <p className='time-left'>Auction end date: {productPreview.time}</p>
          <p className='prod-price'>Start Price: {productPreview.price} $</p>
          <p className='prod-step'>Bid step: {productPreview.step} $</p>
        </div>
      )}
    </div>
  );
}
