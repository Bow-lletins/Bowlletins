'use client';

import { signOut } from 'next-auth/react';
import { Button } from 'react-bootstrap';

const SignOut = () => (
  <div className="signout-page">
    <div className="signout-note">
      <div className="signout-pin" />
      <img src="/signout_door.png" alt="Sign Out" className="signout-icon" />
      <h2 className="signout-title">Sign out?</h2>
      <p className="signout-subtitle">
        You&apos;ll be returned to the home page and will need to sign in again to access your account.
      </p>
      <hr className="signout-divider" />
      <div className="signout-buttons">
        <Button className="signout-btn-cancel" href="/">Cancel</Button>
        <Button
          className="signout-btn-confirm"
          onClick={() => signOut({ callbackUrl: '/', redirect: true })}
        >
          Sign out
        </Button>
      </div>
    </div>
  </div>
);

export default SignOut;
