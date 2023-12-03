import { makeAutoObservable } from 'mobx';


export default class AdminStore {
    constructor() {
        this._entities = { 1: 'Products', 2: 'Categories', 3: 'Roles'};
        this._selectedEntityId = 1;

       // alert(this.entities)
        // this._products = [];

        // this._selectedCategory = null;

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