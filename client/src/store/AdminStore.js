import { makeAutoObservable } from 'mobx';


export default class AdminStore {
    constructor() {
        this._entities = { 1: 'Books', 2: 'Authors', 3: 'Users', 4: 'Categories', 5: 'Coupons'};
        this._selectedEntityId = 1;

        makeAutoObservable(this);
    }

    selectEntityById(id) {
        this._selectedEntityId = id;
    }

    get selectedEntityId() {
        return this._selectedEntityId;
    }

    get entities() {
        return this._entities;
    }
}