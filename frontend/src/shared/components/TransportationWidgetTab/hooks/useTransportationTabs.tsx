import { useTranslation } from 'react-i18next';
import type { TransportationType } from './useTransportationSearch';

export interface TransportationTab {
  key: TransportationType;
  label: string;
  icon: React.ReactNode;
  badge: string | null;
}

export const useTransportationTabs = (): TransportationTab[] => {
  const { t } = useTranslation();

  return [
    {
      key: 'bus',
      label: t('bus'),
      icon: <span className="material-symbols-outlined">directions_bus</span>,
      badge: null,
    },
    {
      key: 'flight',
      label: t('flight'),
      icon: <span className="material-symbols-outlined">flight</span>,
      badge: '-30k',
    },
    {
      key: 'train',
      label: t('train'),
      icon: <span className="material-symbols-outlined">train</span>,
      badge: '25% off',
    },
    {
      key: 'rental',
      label: t('rental'),
      icon: <span className="material-symbols-outlined">transportation</span>,
      badge: t('new'),
    },
  ];
};
