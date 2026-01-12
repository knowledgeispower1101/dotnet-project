import { memo, Fragment } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Link } from 'react-router-dom';

export interface CategoryTree {
  id: number;
  name: string;
  level: number;
  is_leaf: boolean;
  image_key: string;
}

interface ProductBreadcrumbProps {
  categoryTree: CategoryTree[];
  productTitle: string;
}

const breadcrumbLinkClass = 'text-[13px] text-blue-700 hover:text-blue-800 transition-colors';

const ProductBreadcrumb = ({ categoryTree, productTitle }: ProductBreadcrumbProps) => {
  return (
    <Breadcrumb className="pt-5">
      <BreadcrumbList>
        {/* Home */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/" className={breadcrumbLinkClass}>
              Shopee
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {categoryTree.map((category) => (
          <Fragment key={category.id}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/category/${category.id}`} className={breadcrumbLinkClass}>
                  {category.name}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Fragment>
        ))}

        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-[13px] text-gray-900">{productTitle}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default memo(ProductBreadcrumb);
