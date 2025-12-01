import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { LoginModal, Navbar } from '@/shared';

export const MainLayout = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const onClose = () => setIsLoginOpen(false);
  return (
    <div>
      <Navbar setIsLoginOpen={setIsLoginOpen} isLoginOpen={isLoginOpen} />
      <div>
        <Outlet />
      </div>
      <LoginModal open={isLoginOpen} onClose={onClose} />
    </div>
  );
};
