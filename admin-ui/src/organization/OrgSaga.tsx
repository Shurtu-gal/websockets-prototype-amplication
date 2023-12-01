import { put, takeEvery } from 'redux-saga/effects';
import { showNotification } from 'react-admin';

export default function* OrgSaga() {
  yield takeEvery('RA/CRUD_CREATE_SUCCESS', function* (action) {
    yield put(showNotification('Organisation custom created'));
    yield put({ type: 'NOTIFICATION_CREATED', payload: "Custom notification created" });
  });
}