import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { HomePage, SearchPage } from '@/features';
import { MainLayout } from '@/shared';

export const App = () => {
  return (
    <div id="__next">
      <div id="loadingContainer" className="width-height-full"></div>
      <div id="loadingWrapper" className="loading-wrapper"></div>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
