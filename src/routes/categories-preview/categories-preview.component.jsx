import { Fragment } from 'react';
import { useSelector } from 'react-redux/es/exports';

import CategoryPreview from '../../components/category-preview/categori-preview.component';
import Spinner from '../../components/spinner/spinner.component';
import { selectCategoriesMap, selectCategoryIsLoading } from '../../store/categories/category.selector';

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap)
  const isLoading = useSelector(selectCategoryIsLoading);

  return (
    <Fragment>
      {isLoading ? <Spinner /> : (Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })
      )}
    </Fragment>
  );
};

export default CategoriesPreview;
