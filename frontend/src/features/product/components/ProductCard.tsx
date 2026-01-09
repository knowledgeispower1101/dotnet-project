import { Play } from 'lucide-react';

export const ProductCard = () => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
      {/* Product Image Section */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"
          alt="Asics sports shoes"
          className="w-full h-64 object-cover"
        />
      </div>
    </div>
  );
};
