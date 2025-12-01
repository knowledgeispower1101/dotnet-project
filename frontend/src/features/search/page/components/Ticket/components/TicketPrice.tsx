import { DiscoutTag } from '../../DiscoutTag';

export const TicketPrice = () => (
  <div className="text-right">
    <div className="flex justify-end font-bold text-[20px] mb-1">220.000đ</div>
    <div className="flex justify-end mb-1 items-center">
      <div className="text-[14px] text-[#707070] line-through font-normal">200.000đ</div>
      <div className="px-[3px] py-px rounded-2xl leading-4 text-center tracking-[0.1px] mr-0 bg-[#eb5757] font-bold text-[12px] text-white m-0 mx-1">
        -20%
      </div>
    </div>
    <div className="flex justify-end gap-2">
      <DiscoutTag />
      <DiscoutTag />
    </div>
  </div>
);
