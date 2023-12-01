import { TakeEffect, call, fork, put, take, takeEvery } from "redux-saga/effects";
import websocketInitChannel from "./channel";
import { showNotification } from "react-admin";
import { Socket } from "socket.io-client";

export default function* websocketSaga() {
  try {
    const {channel, socket} = yield call(websocketInitChannel);
    yield put(showNotification("Websocket connected"));
    yield fork(sendNotificationSaga, socket);

    while (true) {
      const action: TakeEffect = yield take(channel);
      yield put(action);
    }
  } catch (error) {
    yield put(showNotification("Websocket error"));
  } finally {
    yield put(showNotification("Websocket disconnected"));
  }
}

function *sendNotificationSaga(socket: Socket) {
  yield takeEvery("NOTIFICATION_CREATED", function (action: any) {
    socket.emit("notification", action.payload);
  });
}