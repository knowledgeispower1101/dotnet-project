export const NotifyTrip = () => {
  return (
    <div className="flex gap-3 flex-col-reverse">
      <div>
        <div className="flex w-full items-center justify-end">
          <div className="flex flex-wrap w-full gap-x-3 gap-y-2">
            <div className="flex items-center gap-1">
              <p className="text-[#27ae60] text-[14px] leading-5 font-bold tracking-[0px] mb-0 uppercase">
                Trả tận nơi
              </p>
            </div>
            <div className="h-4 border-l border-gray-300 my-auto"></div>
            <div className="flex items-center gap-1">
              <p className="text-[#27ae60] text-[14px] leading-5 font-bold tracking-[0px] mb-0 uppercase">
                Theo dõi hành trình xe
              </p>
            </div>
          </div>
          <p className="whitespace-nowrap text-[#141414] text-[14px] leading-5 font-bold tracking-[0px] mb-0 wrap-break-word uppercase">
            Không cần thanh toán trước
          </p>
        </div>
      </div>
    </div>
  );
};
