import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MainContext from '../context/MainContext';
import { getReq } from '../plugins/http';

export default function SingleProduct({ prod }) {
  const { setProducts, socket, user, setSingleProduct } = useContext(MainContext);

  const [winnerTrigger, setWinnerTrigger] = useState(false);

  const countDown = ({ time }) => {
    const days = Math.floor(time / 60 / 24);
    const hours = Math.floor(time / 60) % 24;
    const minutes = Math.floor(time) % 60;
    return `${days} Days, ${hours} Hours, ${minutes} Minutes`;
  };

  const timerCutter = async () => {
    const res = await getReq(`testRoute/${prod.productId}`);
    setProducts(res.data);
  };

  const nav = useNavigate();

  const connectToTheRoom = async () => {
    const data = {
      user: user.username,
      room: prod.productId,
    };
    socket.emit('joinTheRoom', data);

    const res = await getReq(`getSingleProduct/${prod.productId}`);
    setSingleProduct(res.data);
  };

  return (
    <div className={`single-product ${prod.time <= 0 ? 'ended' : ''}`}>
      {prod.time <= 0 && (
        <h2 className='end-title' onClick={() => setWinnerTrigger(!winnerTrigger)}>
          Check winner
        </h2>
      )}
      {winnerTrigger && <div className='winner'>Winner is: {prod.bids.length !== 0 ? prod.bids[0].bidFrom : 'no one'}</div>}
      <img src={prod.image} alt='' />
      <p className='prod-id'>Lot # {prod.productId}</p>
      <p className='prod-price'>Start price: {prod.startPrice} $</p>
      <p className='prod-current-price'>Current price: {prod.currentPrice} $</p>
      <p className='prod-dis-count'>Bids quantity: {prod.bids.length}</p>
      <p className='prod-owner'>Product uploaded by: {prod.productOwner}</p>
      {prod.time > 0 && <p className='prod-time'>Auction ends in: {countDown(prod)}</p>}
      <p className='prod-title'>{prod.title}</p>
      {prod.time > 0 && (
        <button className='prod-fav-btn' onClick={timerCutter}>
          Pass the time
        </button>
      )}
      {prod.time > 0 && (
        <button
          className='prod-details-btn'
          onClick={() => {
            connectToTheRoom();
            nav(`/auction/${prod.productId}`);
          }}
        >
          Details
        </button>
      )}
    </div>
  );
}
