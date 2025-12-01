export const Filter = () => {
  return (
    <div className="w-[236px]">
      <div className="sticky top-5 flex flex-col gap-4 w-full pb-2.5 max-h-screen overflow-y-auto">
        <div className="bg-white p-4 rounded-lg flex flex-col gap-4 border border-gray-300">
          <div className="font-bold text-[18px] leading-6 mb-0 text-gray-900">Sắp xếp</div>
          <div className="p-4">Placeholder for long filter content</div>
        </div>
        <div>
          <div className="flex flex-col gap-4 rounded-lg bg-white border border-gray-300 p-4 text-sm shadow-none transition-all duration-1000">
            <div className="flex justify-between items-center">
              <div className="font-bold text-[18px]">Lọc</div>
              <p className="text-blue-600 cursor-pointer text-sm font-bold leading-6 mb-0 tracking-[0px] underline decoration-[10%] underline-offset-[20%] decoration-skip-ink-none">
                Xóa lọc
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
