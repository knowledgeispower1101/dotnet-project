export const TicketHeader = () => (
  <div className="flex flex-col">
    <div className="cursor-pointer flex items-center">
      <div className="text-[16px] text-[#484848] font-bold mr-2">Mỹ Loan</div>
      <button className="p-0 m-0 border-0 bg-none">
        <div className="rounded-sm bg-[#2474e5] text-white text-[14px] px-1 py-0 flex items-center">
          <span className="material-symbols-outlined text-white mr-0.5">kid_star</span>
          <span>4.9 (193)</span>
        </div>
      </button>
    </div>
    <div className="text-sm text-[#484848] mt-2.5 mb-5">Fortuner 7 chỗ</div>
  </div>
);
