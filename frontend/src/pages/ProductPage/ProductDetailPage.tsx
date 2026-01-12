import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '@/services';
import type { ProductData, SelectedVariations } from '../../features/product/constants';
import { Container } from '@/components';
import { ProductBreadCrum } from './components';
import type { CategoryTree } from './components/ProductBreadCrum';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedVariations, setSelectedVariations] = useState<SelectedVariations>({});
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductData>({
    id: 0,
    title: '',
    description: '',
    brand_id: null,
    brand_name: '',
    models: [],
    variations: [],
  });
  const [categoryTree, setCategoryTree] = useState<CategoryTree[]>([]);
  const images = [
    'https://plus.unsplash.com/premium_photo-1661769750859-64b5f1539aa8?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdCUyMGltYWdlfGVufDB8fDB8fHww',
    'https://tse3.mm.bing.net/th/id/OIP.9rssJewM8mcVHxy84ucVXgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
  ];

  const handleVariationSelect = (variationId: number, optionId: number, value: string): void => {
    setSelectedVariations((prev) => {
      if (prev[variationId]?.optionId === optionId) {
        const newState = { ...prev };
        delete newState[variationId];
        return newState;
      }

      return {
        ...prev,
        [variationId]: { optionId, value },
      };
    });
  };

  const allVariationsSelected = product.variations.every((variation) => selectedVariations[variation.id]);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const handleQuantityChange = (delta: number): void => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };
  const handleBuy = () => {};
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data.data);
        console.log(product);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    };
    const fetchCategoryTree = async () => {
      try {
        const res = await api.get(`/categories/tree/by-product/${id}`);
        setCategoryTree(res.data.data);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    };
    fetchCategoryTree();
    fetchProduct();
  }, [id]);
  if (error) return 'Error';
  return (
    <div className="bg-[#F5F5F5]">
      <Container>
        <ProductBreadCrum categoryTree={categoryTree} productTitle={product.title} />
        <div className="grid lg:grid-cols-2 gap-6 bg-white ">
          <div className="rounded-lg p-4"></div>
        </div>
        {/* <div >
        <div className="">
          <div className="relative">
            <Badge className="absolute top-4 left-4 bg-orange-500 text-white z-10">SIÊU GIẢM GIÁ</Badge>
            <div className="aspect-square bg-linear-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">👔</div>
                <p className="text-gray-400">Product Image</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-4 overflow-x-auto">
            {images.map((img, i) => (
              <div
                key={i}
                className="shrink-0 w-20 h-20 bg-gray-100 rounded border-2 border-orange-500 cursor-pointer hover:border-orange-600 overflow-hidden"
              >
                <img src={img} alt={`Product ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Badge className="bg-red-500 text-white">Yêu thích</Badge>
          <h1 className="text-xl font-normal leading-relaxed">{product.title}</h1>
          {product.models && product.models.length > 0 && (
            <div className="bg-gray-50 p-4 rounded">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-normal text-orange-500">{formatPrice(product.models[0].price)}₫</span>
              </div>
            </div>
          )}
          <div className="flex items-start gap-3 text-sm">
            <span className="text-gray-600 min-w-24">Vận Chuyển</span>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Truck className="w-4 h-4" />
                <span>Nhận từ 1 Th01 - 2 Th01</span>
              </div>
              <div className="text-emerald-600 font-medium">Phí ship 0₫</div>
              <div className="text-xs text-gray-500">Tặng Voucher 15.000₫ nếu đơn giao sau thời gian trên.</div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-600 min-w-24">An Tâm Mua Sắm</span>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Trả hàng miễn phí 15 ngày</span>
            </div>
          </div>
          {product.variations && product.variations.length > 0 && (
            <div className="space-y-3">
              {product.variations.map((variation: Variation) => (
                <Card key={variation.id} className="p-4">
                  <h3 className="text-sm text-gray-600 mb-3 font-medium capitalize">{variation.name}</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {variation.variation_option.map((option: VariationOption) => {
                      const isSelected = selectedVariations[variation.id]?.optionId === option.id;
                      return (
                        <button
                          key={option.id}
                          onClick={() => handleVariationSelect(variation.id, option.id, option.value)}
                          className={`flex items-center justify-center gap-2 px-3 py-2 rounded border text-sm transition-all ${
                            isSelected ? 'border-orange-500 bg-orange-50 text-orange-500' : 'border-gray-200 hover:border-orange-300'
                          }`}
                        >
                          <span className="text-xs truncate capitalize">{option.value}</span>
                        </button>
                      );
                    })}
                  </div>
                </Card>
              ))}
            </div>
          )}
          <div className="flex items-center gap-6">
            <span className="text-gray-600 text-sm">Số Lượng</span>
            <div className="flex items-center gap-3">
              <button onClick={() => handleQuantityChange(-1)} className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-50">
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center">{quantity}</span>
              <button onClick={() => handleQuantityChange(1)} className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-50">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <span className="text-gray-400 text-sm">Sản phẩm có sẵn</span>
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              disabled={!allVariationsSelected}
              variant="outline"
              className="flex-1 h-12 border-orange-500 text-orange-500 hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Thêm Vào Giỏ Hàng
            </Button>
            <Button
              disabled={!allVariationsSelected}
              className="flex-1 h-12 bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleBuy}
            >
              Mua Ngay
            </Button>
          </div>
          {Object.keys(selectedVariations).length > 0 && (
            <div className="text-xs text-gray-500 mt-2">
              <p className="font-medium mb-1">Đã chọn:</p>
              {Object.entries(selectedVariations).map(([varId, selection]) => {
                const variation = product.variations.find((v) => v.id === parseInt(varId));
                return (
                  <p key={varId}>
                    {variation?.name}: {selection.value}
                  </p>
                );
              })}
            </div>
          )}
        </div>
      </div> */}
        <div className="max-w-7xl mx-auto">
          <div>
            <h1>SHOP</h1>
          </div>
          <div>
            <h1>Product detail</h1>
          </div>
          <div>
            <h1>Product description</h1>
          </div>
          <div>
            <h1>Product rating</h1>
          </div>
          <div>
            <h1>Others product of shop</h1>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetailPage;
