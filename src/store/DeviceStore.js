import { makeAutoObservable } from "mobx";

export default class DeviceStore {
  constructor() {
    this._types = [];
    this._brands = [];
    this._devices = [];
    this._selectedType = {};
    this._selectedBrand = {};
    this._page = 1;
    this._totalCount = 0;
    this._limit = 3;

    makeAutoObservable(this);
  }
  //СОЗДАНИЕ ЭКШЕНОВ ИЗМЕНЯЮЩИХ СОСТОЯНИЕ
  setTypes(types) {
    this._types = types;
  }
  //Экшн для измения бренда
  setBrands(brands) {
    this._brands = brands;
  }
  //Экшн для измения девайса
  setDevices(devices) {
    this._devices = devices;
  }
  //При нажатии на тип нам надо его выделять
  setSelectedType(type) {
    this.setPage(1);
    this._selectedType = type;
  }
  //При нажатии на бренд нам надо его выделять
  setSelectedBrand(brand) {
    this.setPage(1);
    this._selectedBrand = brand;
  }
  //Пагинация
  setPage(page) {
    this._page = page;
  }
  //число
  setTotalCount(count) {
    this._totalCount = count;
  }

  //Создаем одноименные геттеры для получения переменных из нашего состояния
  //Computed функци будут вызываться только в том случаи ,если переменная которая используется внутри компоненты была изменена
  get types() {
    return this._types;
  }
  get brands() {
    return this._brands;
  }
  get devices() {
    return this._devices;
  }
  get selectedType() {
    return this._selectedType;
  }
  get selectedBrand() {
    return this._selectedBrand;
  }
  get totalCount() {
    return this._totalCount;
  }
  get page() {
    return this._page;
  }
  get limit() {
    return this._limit;
  }
}
