import { takeLatest, all, call, put } from 'redux-saga/effects';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import {
  fetchCategoriesSuccess,
  fetchCategoriesError,
} from './category.action';
import { CATEGORIES_ACTION_TYPES } from './category.types';

export function* onFetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCategoriesAndDocuments, 'categories');
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesError(error));
  }
}

export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORY_START,
    onFetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
