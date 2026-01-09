import './App.css';
import { RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import { router } from './routes';
import { Loading } from '@/components';

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
