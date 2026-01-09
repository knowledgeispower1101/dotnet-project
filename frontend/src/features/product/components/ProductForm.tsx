import { useEffect, useState, useCallback, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ProductStatus } from '@/constant';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, X, ImagePlus, Package, DollarSign, Hash } from 'lucide-react';
import { api } from '@/services';

interface ValueArr {
  name: string;
}

interface ProductModel {
  name: string;
  values: ValueArr[];
}

interface MediaFile {
  file: File;
  preview: string;
  isPrimary?: boolean;
}

interface ProductVariant {
  key: string;
  name: string;
  sku: string;
  price: number;
}

// Validation schema
const productSchema = z.object({
  title: z.string().min(1, 'Please enter product name').min(3, 'Product name must be at least 3 characters'),
  description: z.string().min(1, 'Please enter description').min(10, 'Description must be at least 10 characters'),
  status: z.nativeEnum(ProductStatus),
});

type ProductFormData = z.infer<typeof productSchema>;

export const ProductForm = () => {
  const {
    control,
    handleSubmit: handleFormSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: '',
      description: '',
      status: ProductStatus.New,
    },
  });

  const [models, setModels] = useState<ProductModel[]>([]);
  const [images, setImages] = useState<MediaFile[]>([]);
  const [video] = useState<MediaFile | undefined>(undefined);

  const [variantData, setVariantData] = useState<Record<string, { sku: string; price: number }>>({});

  const buildVariants = useCallback((models: ProductModel[]): ProductVariant[] => {
    if (models.length === 0) return [];

    const validModels = models.filter((m) => m.name && m.values.some((v) => v.name));
    if (validModels.length === 0) return [];

    const combos = validModels.reduce<Record<string, string>[]>(
      (acc, model) => {
        if (acc.length === 0) return [];
        const res: Record<string, string>[] = [];
        const validValues = model.values.filter((v) => v.name);

        acc.forEach((o) => {
          validValues.forEach((v) => {
            res.push({ ...o, [model.name]: v.name });
          });
        });
        return res;
      },
      [{}],
    );

    return combos.map((o, index) => {
      const name = Object.values(o).join(',');
      const uniqueKey = `variant-${index}-${name}`;
      return {
        key: uniqueKey,
        name,
        sku: '',
        price: 0,
      };
    });
  }, []);

  const variants = useMemo(() => {
    const baseVariants = buildVariants(models);

    return baseVariants.map((variant) => ({
      ...variant,
      sku: variantData[variant.name]?.sku || '',
      price: variantData[variant.name]?.price || 0,
    }));
  }, [models, buildVariants, variantData]);

  const variationValues = useMemo(() => {
    return models
      .filter((m) => m.name)
      .map((m) => ({
        name: m.name,
        variation_option: m.values
          .filter((v) => v.name)
          .map((v) => {
            return { value: v.name };
          }),
      }));
  }, [models]);

  const onSubmit = useCallback(
    async (data: ProductFormData) => {
      try {
        if (variants.length === 0) {
          alert('Please add at least one product variant');
          return;
        }

        const hasInvalidVariant = variants.some((v) => !v.sku || v.price <= 0);
        if (hasInvalidVariant) {
          alert('Please fill in SKU and Price for all variants');
          return;
        }

        const payload = {
          title: data.title,
          description: data.description,
          models: variants.map((item: ProductVariant) => ({
            name: item.name,
            sku: item.sku,
            price: item.price,
          })),
          variation: variationValues,
        };
        console.log(payload);

        const res = await api.post('/products', payload);
        console.log(payload);
        console.log('Product created:', res.data);
        alert('Product created successfully!');
      } catch (error) {
        console.error('Error creating product:', error);
        alert('Failed to create product. Please try again.');
      }
    },
    [variants, variationValues],
  );

  const addModel = useCallback(() => {
    setModels((prev) => [...prev, { name: '', values: [] }]);
  }, []);

  const removeModel = useCallback((modelIndex: number) => {
    setModels((prev) => prev.filter((_, i) => i !== modelIndex));
  }, []);

  const updateModelName = useCallback((modelIndex: number, name: string) => {
    setModels((prev) => prev.map((m, i) => (i === modelIndex ? { ...m, name } : m)));
  }, []);

  const addValue = useCallback((modelIndex: number) => {
    setModels((prev) => prev.map((m, i) => (i === modelIndex ? { ...m, values: [...m.values, { name: '' }] } : m)));
  }, []);

  const removeValue = useCallback((modelIndex: number, valueIndex: number) => {
    setModels((prev) =>
      prev.map((m, i) =>
        i === modelIndex
          ? {
              ...m,
              values: m.values.filter((_, vi) => vi !== valueIndex),
            }
          : m,
      ),
    );
  }, []);

  const updateValues = useCallback((modelIndex: number, valueIndex: number, value: string) => {
    setModels((prev) =>
      prev.map((m, i) =>
        i === modelIndex
          ? {
              ...m,
              values: m.values.map((v, vi) => (vi === valueIndex ? { name: value } : v)),
            }
          : m,
      ),
    );
  }, []);

  const updateVariant = useCallback((variantName: string, field: 'sku' | 'price', value: string | number) => {
    setVariantData((prev) => ({
      ...prev,
      [variantName]: {
        ...prev[variantName],
        [field]: value,
      },
    }));
  }, []);

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;

      const files = Array.from(e.target.files);
      const newImages = files.map((file, index) => ({
        file,
        preview: URL.createObjectURL(file),
        isPrimary: images.length === 0 && index === 0,
      }));

      setImages((prev) => [...prev, ...newImages]);
    },
    [images.length],
  );

  const removeImage = useCallback((index: number) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  const setPrimaryImage = useCallback((index: number) => {
    setImages((prev) =>
      prev.map((img, i) => ({
        ...img,
        isPrimary: i === index,
      })),
    );
  }, []);

  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.preview));
      if (video) URL.revokeObjectURL(video.preview);
    };
  }, [images, video]);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Create New Product</h1>
        <p className="text-muted-foreground">Fill in the details to create a new product for your store</p>
      </div>

      <form onSubmit={handleFormSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Enter your product name and description</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Product Name <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="title"
                    placeholder="Enter product name (e.g., Premium Cotton T-Shirt)"
                    className={errors.title ? 'border-red-500' : ''}
                  />
                )}
              />
              {errors.title && <p className="text-sm text-red-500 flex items-center gap-1">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="flex items-center gap-2">
                Product Description <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    id="description"
                    placeholder="Describe your product in detail, including materials, features, and highlights..."
                    className={`min-h-25 ${errors.description ? 'border-red-500' : ''}`}
                  />
                )}
              />
              {errors.description && <p className="text-sm text-red-500 flex items-center gap-1">{errors.description.message}</p>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImagePlus className="w-5 h-5" />
              Product Images
            </CardTitle>
            <CardDescription>Add images for your product. The first image will be the primary image.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-6 hover:border-primary transition-colors">
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="flex flex-col items-center gap-2 text-center">
                  <ImagePlus className="w-10 h-10 text-muted-foreground" />
                  <div className="text-sm text-muted-foreground">
                    <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                  </div>
                  <p className="text-xs text-muted-foreground">PNG, JPG, JPEG (max 10 images)</p>
                </div>
              </label>
              <Input id="image-upload" type="file" accept="image/png,image/jpeg,image/jpg" multiple onChange={handleImageUpload} className="hidden" />
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="group relative border-2 rounded-lg p-2 cursor-pointer hover:border-primary transition-all hover:shadow-md"
                    onClick={() => setPrimaryImage(index)}
                  >
                    <div className="aspect-square overflow-hidden rounded">
                      <img src={img.preview} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                    </div>

                    {img.isPrimary && <Badge className="absolute top-3 left-3 bg-green-500">Primary</Badge>}

                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(index);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>

                    {!img.isPrimary && (
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg flex items-center justify-center">
                        <span className="text-xs text-white opacity-0 group-hover:opacity-100 font-medium bg-black/50 px-2 py-1 rounded">
                          Set as primary
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Product Variants</CardTitle>
                <CardDescription className="mt-1">Add attributes like color, size, version...</CardDescription>
              </div>
              <Button type="button" onClick={addModel} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Variant
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {models.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No variants yet</p>
                <p className="text-xs mt-1">Click "Add Variant" to create product variations</p>
              </div>
            ) : (
              <div className="space-y-4">
                {models.map((model, modelIndex) => (
                  <Card key={modelIndex} className="border-2 border-dashed">
                    <CardContent className="space-y-4 pt-6">
                      <div className="flex gap-2 items-start">
                        <div className="flex-1 space-y-2">
                          <Label className="text-xs text-muted-foreground">Attribute Name (e.g., Color, Size)</Label>
                          <Input
                            placeholder="Enter attribute name..."
                            value={model.name}
                            onChange={(e) => updateModelName(modelIndex, e.target.value)}
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="mt-6 text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => removeModel(modelIndex)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Values (e.g., Red, Blue, Yellow)</Label>
                        {model.values.map((v, valueIndex) => (
                          <div key={valueIndex} className="flex gap-2">
                            <Input
                              placeholder="Enter value..."
                              value={v.name}
                              onChange={(e) => updateValues(modelIndex, valueIndex, e.target.value)}
                              className="flex-1"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => removeValue(modelIndex, valueIndex)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}

                        <Button type="button" variant="outline" size="sm" onClick={() => addValue(modelIndex)} className="w-full">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Value
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {variants.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Product Variants List</CardTitle>
              <CardDescription>Fill in SKU and price information for each variant</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Variant</TableHead>
                      <TableHead className="font-semibold">
                        <div className="flex items-center gap-2">
                          <Hash className="w-4 h-4" />
                          SKU Code <span className="text-red-500">*</span>
                        </div>
                      </TableHead>
                      <TableHead className="font-semibold">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          Price <span className="text-red-500">*</span>
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {variants.map((v) => (
                      <TableRow key={v.key}>
                        <TableCell className="font-medium">
                          <Badge variant="outline">{v.name}</Badge>
                        </TableCell>
                        <TableCell>
                          <Input value={v.sku} onChange={(e) => updateVariant(v.name, 'sku', e.target.value)} placeholder="Enter SKU code" required />
                        </TableCell>
                        <TableCell>
                          <div className="relative">
                            <Input
                              type="number"
                              value={v.price}
                              onChange={(e) => updateVariant(v.name, 'price', Number(e.target.value))}
                              placeholder="0"
                              min="0"
                              step="0.01"
                              required
                              className="pl-8"
                            />
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex gap-3 justify-end pt-4">
          <Button type="button" variant="outline" size="lg">
            Cancel
          </Button>
          <Button type="submit" size="lg" className="min-w-50">
            <Package className="w-4 h-4 mr-2" />
            Create Product
          </Button>
        </div>
      </form>
    </div>
  );
};
