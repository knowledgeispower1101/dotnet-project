import flashSaleImg from '@/assets/flash-sale.png';
import { MyCarousel } from '@/components';
import { CarouselItem } from '@/components/ui/carousel';
import { ProductCard } from '@/features';
import { Link } from 'react-router-dom';

const FlashSaleCarousel = () => {
  return (
    <div className="bg-white mt-5">
      <div className="flex flex-row justify-between items-center bg-white h-7.5 px-5 py-3.75">
        <div className="flex flex-row">
          <div
            className="uppercase w-32.5 h-7.5 leading-7.5 bg-center bg-no-repeat bg-contain"
            style={{ backgroundImage: `url(${flashSaleImg})` }}
          ></div>
          {/* <div>Counter</div> */}
        </div>
        <div>
          <Link className="text-[#F6412D] font-bold" to="/flash-sale">
            Xem tất cả
          </Link>
        </div>
      </div>
      <div className="mx-5">
        <MyCarousel></MyCarousel>
      </div>
    </div>
  );
};

export default FlashSaleCarousel;
