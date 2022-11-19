import '../src/css/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainContext from '../src/context/MainContext';
import AuthPage from './pages/AuthPage';
import { useEffect, useState } from 'react';
import AuctionsPage from './pages/AuctionsPage';
import AddProdPage from './pages/AddProdPage';
import SingleAuctionPage from './pages/SingleAuctionPage';
import { io } from 'socket.io-client';

const socket = io.connect('http://localhost:5000');

function App() {
  const [user, setUser] = useState(null);

  const [respMess, setRespMess] = useState('');

  const [products, setProducts] = useState([]);

  const [productPreview, setProductPreview] = useState({});

  const [singleProduct, setSingleProduct] = useState(null);

  const states = { user, setUser, respMess, setRespMess, productPreview, setProductPreview, products, setProducts, singleProduct, setSingleProduct, socket };

  useEffect(() => {
    const interval = setInterval(() => {
      socket.emit('updateTime');
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      socket.on('updatedTimer', (data) => {
        setProducts(data);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    socket.on('singleProd', (data) => {
      setSingleProduct(data);
    });
  }, []);

  return (
    <div className='App'>
      <MainContext.Provider value={states}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<AuthPage />}></Route>
            <Route path='/auctions' element={user ? <AuctionsPage /> : <AuthPage />}></Route>
            <Route path='/addProd' element={user ? <AddProdPage /> : <AuthPage />}></Route>
            <Route path='/auction/:productId' element={user ? <SingleAuctionPage /> : <AuthPage />}></Route>
          </Routes>
        </BrowserRouter>
      </MainContext.Provider>
    </div>
  );
}

export default App;
