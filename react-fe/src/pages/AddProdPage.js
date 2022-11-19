import React, { useContext } from 'react';
import AddProductForm from '../components/AddProductForm';
import Header from '../components/Header';
import ProductPreview from '../components/ProductPreview';
import MainContext from '../context/MainContext';

export default function AddProdPage() {
  const { user } = useContext(MainContext);

  return (
    <div>
      {user && <Header></Header>}

      <div className='add-product-page'>
        <ProductPreview></ProductPreview>
        <AddProductForm></AddProductForm>
      </div>
    </div>
  );
}
