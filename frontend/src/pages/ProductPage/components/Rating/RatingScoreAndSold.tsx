import { Star } from 'lucide-react';

const RatingScoreAndSold = ({ rating = 5 }: { rating: number }) => {
  const roundedRating = Math.round(rating);

  return (
    <>
      <div className="flex">
        <div className="flex items-center gap-1 py-0 pr-3.75">
          <span className="underline mr-1">{rating.toFixed(1)}</span>
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} className={`w-3 h-3 ${index < roundedRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
          ))}
        </div>
        <div className="">
          <div>
            <span className="underline"> 1.6k</span> <span>Ratings</span>
          </div>
        </div>
        <div className="pl-3.75">
          <div>
            <span className="underline">7k</span> <span>Sold</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default RatingScoreAndSold;
