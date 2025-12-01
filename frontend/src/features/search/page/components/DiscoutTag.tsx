import { IconFlashSale } from '@/assets';

export const DiscoutTag = () => {
  return (
    <div className="relative flex justify-center items-stretch rounded bg-[#ECF4FD] border border-[#2F80ED] text-[12px] p-0 overflow-hidden cursor-pointer">
      <div className="relative">
        <div className="h-5 w-5 m-auto flex flex-col items-center justify-center bg-[#2F80ED]">
          <img className="align-middle border-none" src={IconFlashSale} alt="" />
        </div>
      </div>
      <div className="flex-1 text-[#2F80ED] px-1 py-0.5 text-[10px] leading-3 bg-[#ECF4FD] relative flex items-center">
        Giảm 20%, tối đa 250k
      </div>
    </div>
  );
};
