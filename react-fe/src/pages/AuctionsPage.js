/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import SingleProduct from '../components/SingleProduct';
import MainContext from '../context/MainContext';

export default function AuctionsPage() {
  const { user, products, setProducts, socket } = useContext(MainContext);

  useEffect(() => {
    socket.on('products', (data) => {
      setProducts(data);
    });
  }, []);

  return (
    <div>
      {user && <Header></Header>}
      {products.length === 0 && <h1>There is no auctions right now</h1>}
      <div className='products-list'>{products && products.map((prod, i) => <SingleProduct prod={prod} key={i} />)}</div>
    </div>
  );
}
