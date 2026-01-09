import { useState } from 'react';
import { ChevronDown, Star, MapPin } from 'lucide-react';

const SearchPage = () => {
  const [showMoreLocations, setShowMoreLocations] = useState(false);
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [showMoreBrands, setShowMoreBrands] = useState(false);

  const locations = ['Hà Nội', 'TP. Hồ Chí Minh', 'Thái Nguyên', 'Vĩnh Phúc', 'Đà Nẵng', 'Cần Thơ'];
  const categories = ['Ốp lưng, bao da, miếng dán màn hình cho Điện thoại', 'Pin Gắn Trong, Cáp và Bộ Sạc', 'Bảo vệ màn hình', 'Đế giữ điện thoại'];
  const brands = ['Samsung', 'OPPO', 'Masstel', 'Vsmart', 'Xiaomi', 'iPhone'];

  const products = [
    {
      id: 1,
      name: 'Điện thoại Honor X5b Plus...',
      price: '2.590.000₫',
      oldPrice: '3.200.000₫',
      discount: '-19%',
      image: 'https://via.placeholder.com/200x200/4A90E2/ffffff?text=Phone+1',
      badge: 'Mall',
    },
    {
      id: 2,
      name: '[ƯU ĐÃI MỞ BÁN] Điện thoại Honor...',
      price: '10.990.000₫',
      oldPrice: '12.990.000₫',
      discount: '-12%',
      image: 'https://via.placeholder.com/200x200/E74C3C/ffffff?text=Phone+2',
      badge: 'Mall',
    },
    {
      id: 3,
      name: 'Điện Thoại Honor 400 Lite 5G |...',
      price: '8.190.000₫',
      oldPrice: '9.990.000₫',
      discount: '-28%',
      image: 'https://via.placeholder.com/200x200/2ECC71/ffffff?text=Phone+3',
      badge: 'Mall',
    },
    {
      id: 4,
      name: 'Điện thoại Oppo A92 2 sim RAM 8GB',
      price: '4.590.000₫',
      oldPrice: '5.990.000₫',
      discount: '-15%',
      image: 'https://via.placeholder.com/200x200/9B59B6/ffffff?text=Phone+4',
      badge: 'Free Ship',
    },
    {
      id: 5,
      name: 'Điện thoại thông minh REDMI A5',
      price: '1.790.000₫',
      oldPrice: '2.290.000₫',
      discount: '-22%',
      image: 'https://via.placeholder.com/200x200/F39C12/ffffff?text=Phone+5',
      badge: '15.1',
    },
    {
      id: 6,
      name: 'Điện thoại Gaming nubia Neo 3 AI',
      price: '5.490.000₫',
      oldPrice: '6.990.000₫',
      discount: '-21%',
      image: 'https://via.placeholder.com/200x200/1ABC9C/ffffff?text=Phone+6',
      badge: '15.1',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-blue-900 via-blue-800 to-blue-900 p-6 mb-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h1 className="text-2xl font-bold mb-2">SHOPEE TECHZONE - SIÊU THỊ ĐIỆN TỬ</h1>
              <h2 className="text-3xl font-bold">ĐỈNH CAO HÀNG CÔNG NGHỆ</h2>
              <div className="flex gap-4 mt-4">
                <span className="bg-red-600 px-3 py-1 rounded text-sm">TIM HÀNG CHÍNH HÃNG</span>
                <span className="bg-blue-500 px-3 py-1 rounded text-sm">TRẢ GÓP 0% LÃI SUẤT</span>
                <span className="bg-gray-700 px-3 py-1 rounded text-sm">GIẢM GIÁ ĐẾN 50%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 flex gap-6">
        <div className="w-64 shrink-0">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="mb-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <MapPin size={18} />
                Nơi Bán
              </h3>
              {locations.slice(0, showMoreLocations ? locations.length : 4).map((location) => (
                <label key={location} className="flex items-center mb-2 cursor-pointer">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">{location}</span>
                </label>
              ))}
              <button onClick={() => setShowMoreLocations(!showMoreLocations)} className="text-blue-600 text-sm flex items-center gap-1 mt-2">
                {showMoreLocations ? 'Thu gọn' : 'Thêm'} <ChevronDown size={16} />
              </button>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-3">Theo Danh Mục</h3>
              {categories.slice(0, showMoreCategories ? categories.length : 3).map((category) => (
                <label key={category} className="flex items-center mb-2 cursor-pointer">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">{category}</span>
                </label>
              ))}
              <button onClick={() => setShowMoreCategories(!showMoreCategories)} className="text-blue-600 text-sm flex items-center gap-1 mt-2">
                {showMoreCategories ? 'Thu gọn' : 'Thêm'} <ChevronDown size={16} />
              </button>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-3">Đơn Vị Vận Chuyển</h3>
              <label className="flex items-center mb-2 cursor-pointer">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">Nhanh</span>
              </label>
              <label className="flex items-center mb-2 cursor-pointer">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">Tiết Kiệm</span>
              </label>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-3">Thương Hiệu</h3>
              {brands.slice(0, showMoreBrands ? brands.length : 4).map((brand) => (
                <label key={brand} className="flex items-center mb-2 cursor-pointer">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">{brand}</span>
                </label>
              ))}
              <button onClick={() => setShowMoreBrands(!showMoreBrands)} className="text-blue-600 text-sm flex items-center gap-1 mt-2">
                {showMoreBrands ? 'Thu gọn' : 'Thêm'} <ChevronDown size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Shop Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold mb-2">SHOP LIÊN QUAN ĐẾN "ĐIỆN THOẠI"</h2>
              </div>
              <a href="#" className="text-red-600">
                Thêm Kết Quả →
              </a>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mb-2 flex items-center justify-center font-bold">HONOR</div>
              </div>
              <div>
                <h3 className="font-semibold">HONOR Official Store</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="bg-red-600 text-white px-2 py-0.5 rounded text-xs">Mall</span>
                  <span className="flex items-center gap-1">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    4.9
                  </span>
                  <span>83.2k Followers</span>
                </div>
              </div>
              <button className="ml-auto border border-red-600 text-red-600 px-6 py-2 rounded hover:bg-red-50">Xem Shop</button>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {products.slice(0, 4).map((product) => (
                <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
                    {product.discount && (
                      <span className="absolute top-2 right-2 bg-yellow-400 text-xs px-2 py-1 rounded font-semibold">{product.discount}</span>
                    )}
                    {product.badge && <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">{product.badge}</span>}
                  </div>
                  <div className="p-2">
                    <p className="text-sm mb-2 line-clamp-2">{product.name}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-red-600 font-semibold">{product.price}</span>
                    </div>
                    {product.oldPrice && <span className="text-xs text-gray-400 line-through">{product.oldPrice}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
            <div className="flex items-center gap-3">
              <span className="text-gray-600">Sắp xếp theo</span>
              <button className="px-4 py-2 bg-red-600 text-white rounded">Liên Quan</button>
              <button className="px-4 py-2 hover:bg-gray-100 rounded">Mới Nhất</button>
              <button className="px-4 py-2 hover:bg-gray-100 rounded">Bán Chạy</button>
              <select className="px-4 py-2 border rounded">
                <option>Giá</option>
                <option>Giá: Thấp đến Cao</option>
                <option>Giá: Cao đến Thấp</option>
              </select>
              <div className="ml-auto">
                <span className="text-red-600">1/17</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-3">
            {products.map((product) => (
              <div key={product.id} className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                  {product.discount && (
                    <span className="absolute top-2 right-2 bg-yellow-400 text-xs px-2 py-1 rounded font-semibold">{product.discount}</span>
                  )}
                  {product.badge && <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">{product.badge}</span>}
                </div>
                <div className="p-3">
                  <p className="text-sm mb-2 line-clamp-2 h-10">{product.name}</p>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-red-600 font-semibold">{product.price}</span>
                  </div>
                  {product.oldPrice && <span className="text-xs text-gray-400 line-through">{product.oldPrice}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
