import React, { useContext, useRef } from 'react';
import MainContext from '../context/MainContext';
import { postReq } from '../plugins/http';
import { format } from 'date-fns';

export default function AddProductForm() {
  const { productPreview, setProductPreview, user, respMess, setRespMess } = useContext(MainContext);

  const imageRef = useRef();
  const titleRef = useRef();
  const timeRef = useRef();
  const priceRef = useRef();
  const stepRef = useRef();

  const createProduct = async () => {
    const nowInMinutes = new Date().getTime() / 1000 / 60;
    const selectedUserTimeInMinutes = new Date(timeRef.current.value).getTime() / 1000 / 60;
    const timeLeft = Math.floor(selectedUserTimeInMinutes - nowInMinutes);
    const product = {
      title: titleRef.current.value,
      image: imageRef.current.value,
      time: timeLeft,
      startPrice: priceRef.current.value,
      currentPrice: priceRef.current.value,
      step: stepRef.current.value,
      productOwner: user.username,
    };

    const result = await postReq(product, 'createProduct');

    if (!result.error) {
      setProductPreview(null);
      setRespMess(result.message);
      titleRef.current.value = '';
      imageRef.current.value = '';
      timeRef.current.value = '';
      priceRef.current.value = '';
      stepRef.current.value = '';
    }
  };

  const minDate = format(new Date(), 'yyyy-MM-dd');
  const date = new Date().getTime() + 864000000;
  const maxDate = format(new Date(date), 'yyyy-MM-dd');

  return (
    <div className='add-product'>
      <h3>Product form</h3>
      {respMess !== '' && <p className='result'>{respMess}</p>}
      <div className='product-form'>
        <input ref={imageRef} type='url' placeholder='Product image...' onChange={() => setProductPreview({ ...productPreview, image: imageRef.current.value })} onClick={() => setRespMess('')} />
        <input ref={titleRef} type='text' placeholder='Product title...' onChange={() => setProductPreview({ ...productPreview, title: titleRef.current.value })} onClick={() => setRespMess('')} />
        <input
          ref={timeRef}
          type='date'
          min={minDate}
          max={maxDate}
          placeholder='Select auction expire date...'
          onChange={() => setProductPreview({ ...productPreview, time: timeRef.current.value })}
          onClick={() => setRespMess('')}
        />
        <input
          ref={priceRef}
          type='number'
          placeholder='Product start price...'
          onChange={() => setProductPreview({ ...productPreview, price: priceRef.current.value })}
          onClick={() => setRespMess('')}
        />
        <input ref={stepRef} type='number' placeholder='Bid step...' onChange={() => setProductPreview({ ...productPreview, step: stepRef.current.value })} onClick={() => setRespMess('')} />
        <button onClick={createProduct}>Add product</button>
      </div>
    </div>
  );
}
