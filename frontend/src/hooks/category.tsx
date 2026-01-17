import { categoryApi, type Category } from '@/services';
import { useEffect, useState } from 'react';

export const useCategoryMenu = () => {
  const [data, setData] = useState<Category[]>([]);

  useEffect(() => {
    categoryApi.getMenu().then(setData);
  }, []);

  return { data };
};

export const useCategoryTree = () => {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>();
};
