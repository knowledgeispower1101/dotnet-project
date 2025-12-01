import { FromTo } from '@/assets';
import { Tooltip } from 'antd';

export const TicketTimeInfo = () => (
  <div className="flex items-center text-[#707070]">
    <img src={FromTo} alt="" className="h-[74px] w-3" />
    <div className="from-to-content ml-2.5 relative h-[74px]">
      <div className="absolute top-0 flex items-center h-5">
        <div className="text-[20px] text-black font-bold mr-1">19:15</div>
        <div className="place w-40 whitespace-nowrap text-ellipsis">
          <Tooltip className="text-[16px] text-black" placement="topLeft" title={'• Bến xe Miền Đông - Quầy vé 94'}>
            Bến xe Miền Đông ...
          </Tooltip>
        </div>
      </div>
      <div className="absolute top-6 text-sm">9h10m</div>
      <div className="absolute -bottom-6 flex flex-col justify-start gap-[3px] items-center leading-5">
        <div className="flex">
          <div className="mr-1 font-bold text-[20px]">04:25</div>
          <div className="place w-40 whitespace-nowrap text-ellipsis">
            <Tooltip className="text-[16px] text-black" placement="topLeft" title={'• Nhà xe Kim Anh (Chợ Ea Phê) '}>
              • Nhà xe Kim Anh (C...)
            </Tooltip>
          </div>
        </div>
        <span className="w-full text-sm font-bold">(09/11)</span>
      </div>
    </div>
  </div>
);
