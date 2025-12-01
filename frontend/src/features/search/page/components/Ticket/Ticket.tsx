import { Bus } from '@/assets';
import { NotifyTrip, TicketActions, TicketHeader, TicketPrice, TicketTimeInfo } from './components';

export const Ticket = () => {
  return (
    <div className="relative border border-gray-300 mb-4 bg-white transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)]">
      <div className="container p-4 bg-white rounded-lg">
        <div className="min-h-45 relative flex">
          <div className="relative cursor-pointer w-32 h-32 bg-cover bg-center bg-no-repeat mr-4 rounded overflow-hidden">
            <img className="w-full h-full object-center object-cover" src={Bus} alt="" />
          </div>

          <div className="relative min-h-40" style={{ width: 'calc(100% - 150px)' }}>
            <TicketHeader />
            <TicketTimeInfo />
          </div>

          <div className="absolute top-0 right-0 flex flex-col justify-between h-full">
            <TicketPrice />
            <TicketActions />
          </div>
        </div>

        <NotifyTrip />
      </div>
    </div>
  );
};
