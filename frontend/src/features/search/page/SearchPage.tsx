import { TransportationWidgetTab } from '@/shared/components';
import { Filter } from './components/Filter';
import { ListTicket } from './components/ListTicket';

export const SearchPage = () => {
  return (
    <div className="search-page h-[200vh]">
      <TransportationWidgetTab />
      <div className="flex gap-2.5">
        <Filter />
        <ListTicket listTicket={[]} />
      </div>
    </div>
  );
};
