import { makeAutoObservable } from "mobx";

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {};

    makeAutoObservable(this);
  }
  //СОЗДАНИЕ ЭКШЕНОВ ИЗМЕНЯЮЩИХ СОСТОЯНИЕ
  setIsAuth(bool) {
    this._isAuth = bool;
  }
  //Экшн для измения пользователя
  setUser(user) {
    this._user = user;
  }

  //Создаем одноименные геттеры для получения переменных из нашего состояния
  //Computed функци будут вызываться только в том случаи ,если переменная которая используется внутри компоненты была изменена
  get isAuth() {
    return this._isAuth;
  }
  get user() {
    return this._user;
  }
}
