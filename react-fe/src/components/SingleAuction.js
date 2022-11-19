/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainContext from '../context/MainContext';

function SingleAuction({ productId }) {
  const { singleProduct, setSingleProduct, user, socket } = useContext(MainContext);

  const [yourPrice, setYourPrice] = useState(0);
  const [minBid, setMinBid] = useState(0);

  const bidRef = useRef();

  const nav = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      socket.emit('getProd', productId);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    socket.on('updatedProduct', (data) => {
      if (data.bids.length > 0) {
        setMinBid(Number(data.bids[0].bid) + Number(data.step));
      }
      setSingleProduct(data);
    });
  }, []);

  const calculateDays = (prod) => {
    const days = Math.floor(prod.time / 60 / 24);
    return days;
  };

  const calculateHours = (prod) => {
    const hours = Math.floor(prod.time / 60) % 24;
    return hours;
  };

  const calculateMinutes = (prod) => {
    const minutes = Math.floor(prod.time) % 60;
    return minutes;
  };

  const bid = () => {
    const data = {
      productId,
      bidFrom: user.username,
      bid: bidRef.current.value,
      startPrice: singleProduct.startPrice,
    };
    if (Number(bidRef.current.value) < minBid) return;
    socket.emit('bid', data);
  };

  const leaveTheRoom = () => {
    const room = productId;
    socket.emit('leaveTheRoom', room);
  };

  return (
    <div>
      {singleProduct && (
        <div className='single-auction'>
          <div className='single-auction-prod'>
            <p className='single-auction-prod-owner'>Product added by: {singleProduct.productOwner}</p>
            <img src={singleProduct.image} alt='' />
            <p className='single-auction-prod-id'>Lot #{productId}</p>
          </div>
          <div className='single-auction-details'>
            <button
              className='stop-btn'
              onClick={() => {
                leaveTheRoom();
                nav('/auctions');
              }}
            >
              Back
            </button>
            <div className='prod-info'>{singleProduct.title}</div>
            <div className='prod-price'>
              <p>Start price: {singleProduct.startPrice} $</p>
              <p>Current price: {singleProduct.currentPrice} $</p>
            </div>
            <div className='prod-info'>
              <div className='timer'>
                <div className='timer-days'>
                  <p className='time-calculator'>Days</p>
                  <p>{calculateDays(singleProduct)}</p>
                </div>
                <div className='timer-hours'>
                  <p className='time-calculator'>Hours</p>
                  <p>{calculateHours(singleProduct)}</p>
                </div>
                <div className='timer-minutes'>
                  <p className='time-calculator'>Minutes</p>
                  <p>{calculateMinutes(singleProduct)}</p>
                </div>
              </div>
            </div>
            <div className='your-price-info'>Your price will be: {yourPrice}</div>
            <div className='prod-bid-div'>
              <input
                ref={bidRef}
                type='number'
                min={minBid > 0 ? minBid : singleProduct.step}
                step={singleProduct.step}
                defaultValue={minBid > 0 ? minBid : singleProduct.step}
                onChange={() => setYourPrice(singleProduct.currentPrice + Number(bidRef.current.value))}
              />

              <button onClick={bid}>Bid</button>
              {/* <p>You can't outbid your own bid</p> */}
            </div>

            <div className='prod-bids'>
              <div className='bids-titles'>
                <p>From</p>
                <p>Bid</p>
              </div>
              {singleProduct.bids &&
                singleProduct.bids.map((bid, i) => (
                  <div className='product-bid' key={i}>
                    <p className='bid-index'>{i + 1}</p>
                    <p>{bid.bidFrom}</p>
                    <p>{bid.bid}$</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleAuction;
