import { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '../ui/carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type MyCarouselProps<T> = {
  data: T[];
  itemsPerPage?: number;
  renderItem: (item: T) => React.ReactNode;
};

export function MyCarousel<T>({ data = [], itemsPerPage = 6, renderItem }: MyCarouselProps<T>) {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [canScrollPrev, setCanScrollPrev] = useState(false);

  useEffect(() => {
    if (!api) return;

    const updateScrollState = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    updateScrollState();

    api.on('select', updateScrollState);

    return () => {
      api.off('select', updateScrollState);
    };
  }, [api]);

  const chunkData = (arr: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const pages = chunkData(data, itemsPerPage);

  return (
    <div className="relative">
      <Carousel setApi={setApi} opts={{ align: 'start', loop: false }}>
        <CarouselContent>
          {pages.map((page, index) => (
            <CarouselItem key={index}>
              <div className="grid grid-cols-10 gap-1">
                {page.map((item, idx) => (
                  <div key={idx}>{renderItem(item)}</div>
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {canScrollPrev && (
          <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2">
            <ChevronLeft />
          </CarouselPrevious>
        )}

        {canScrollNext && (
          <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2">
            <ChevronRight />
          </CarouselNext>
        )}
      </Carousel>
    </div>
  );
}
