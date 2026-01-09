import { useMatches } from 'react-router-dom';

export type HeaderVariant = 'cart' | 'shop' | 'default' | 'login' | 'register';

interface Handle {
  headerVariant?: HeaderVariant;
}

export const useGetPath = (): HeaderVariant => {
  const matches = useMatches();

  return [...matches].reverse().find((m) => (m.handle as Handle)?.headerVariant)?.handle?.headerVariant ?? 'default';
};
