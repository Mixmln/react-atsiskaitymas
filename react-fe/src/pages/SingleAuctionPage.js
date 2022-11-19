import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import SingleAuction from '../components/SingleAuction';
import MainContext from '../context/MainContext';

export default function SingleAuctionPage() {
  const { user } = useContext(MainContext);

  const { productId } = useParams();

  return (
    <div>
      {user && <Header></Header>}

      <SingleAuction productId={productId}></SingleAuction>
    </div>
  );
}
