import { makeAutoObservable } from 'mobx';


export default class ProductStore {
    constructor() {
        this._category = {name: "CATEGORY_LOLOOOLOL"};
        
        this._products = [{name: "lol"}, {name: "lalal"}];

        makeAutoObservable(this);
    }

    setCategory(category) {
        this._category = category;
    }

    setProducts(products) {
        this._products = products;
    }

    get products() {
        return this._products;
    }

    get category() {
        return this._category;
    }
}