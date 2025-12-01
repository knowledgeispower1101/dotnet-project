import { useTranslation } from 'react-i18next';
import { useTransportationSearch } from './hooks';
import { TransportationTabs } from './components/TransportationTabs';
import { SearchFields } from './components/SearchFields';

export const TransportationWidgetTab = () => {
  const { i18n } = useTranslation();
  const searchState = useTransportationSearch();

  return (
    <div className="bg-white rounded-lg shadow-md max-w-[1016px] w-full">
      <TransportationTabs activeTab={searchState.activeTab} onTabChange={searchState.setActiveTab} />
      <SearchFields searchState={searchState} i18nLanguage={i18n.language} />
    </div>
  );
};
