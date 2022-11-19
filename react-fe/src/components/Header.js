import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainContext from '../context/MainContext';

export default function Header() {
  const { setUser, setRespMess, user, setProductPreview } = useContext(MainContext);

  const nav = useNavigate();

  const [profileTrigger, setProfileTrigger] = useState(false);

  return (
    <header>
      <div className='header-left-side'>
        <h1 onClick={() => nav('/auctions')}>Auction</h1>
      </div>
      <div className='header-right-side'>
        <Link onClick={() => setRespMess('')} to='/'>
          Auth
        </Link>
        <Link
          onClick={() => {
            setRespMess('');
          }}
          to='/auctions'
        >
          Auctions
        </Link>
        <Link
          onClick={() => {
            setProductPreview(null);
            setRespMess('');
            setProfileTrigger(false);
          }}
          to='/addProd'
        >
          Create an auction
        </Link>
      </div>
      <div className='profile'>
        Logged in:
        <span
          className='username'
          onClick={() => {
            if (profileTrigger) {
              setProfileTrigger(false);
              setRespMess('');
            }
            if (!profileTrigger) {
              setProfileTrigger(true);
              setRespMess('');
            }
          }}
        >
          {user.username}
        </span>
      </div>
      {profileTrigger && (
        <div className='profile-window'>
          <button
            onClick={() => {
              setRespMess('');
              setUser(null);
              nav('/');
            }}
          >
            Log out
          </button>
        </div>
      )}
    </header>
  );
}
