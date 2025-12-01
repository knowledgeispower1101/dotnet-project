import { Ticket } from './Ticket';

export const ListTicket = ({ listTicket }: { listTicket: [] }) => {
  console.log(listTicket);
  return (
    <div className="w-[730px]">
      <div className="h-[1500px] bg-blue-50 p-4">
        <Ticket />
      </div>
    </div>
  );
};
