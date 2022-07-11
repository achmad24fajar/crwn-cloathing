import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { createAction } from '../../utils/firebase/reducer.utils';
import { CATEGORIES_ACTION_TYPES } from './category.types';

export const fetchCategoriesStart = () =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORY_START);

export const fetchCategoriesSuccess = (categories) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORY_SUCCESS, categories);

export const fetchCategoriesError = (error) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORY_FAILED, error);

export const fetchCategoriesAsync = () => {
  return async (dispatch) => {
    dispatch(fetchCategoriesStart());
    try {
      const categoriesArray = await getCategoriesAndDocuments('categories');
      dispatch(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
      dispatch(fetchCategoriesError(error));
    }
  };
};
