import { makeAutoObservable } from 'mobx';


export default class ProductStore {
    constructor() {
        this._categories = [];
        this._products = [];

        this._selectedCategory = null;

        makeAutoObservable(this);
    }

    setCategories(categories) {
        this._categories = categories;
    }

    setProducts(products) {
        this._products = products;
    }

    selectCategory(category) {
        this._selectedCategory = category;
    }

    get products() {
        return this._products;
    }

    get categories() {
        return this._categories;
    }

    get selectedCategory() {
        return this._selectedCategory;
    }
}