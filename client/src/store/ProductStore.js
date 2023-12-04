import { makeAutoObservable } from 'mobx';


export default class ProductStore {
    constructor() {
        this._categories = [];
        this._products = [];
        this._pattern = "";

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

    setPattern(pattern) {
        this._pattern = pattern;
    }

    get products() {
        return this._products.filter(p => {
            return this._pattern === ""
                ? true
                : p.name.toUpperCase().startsWith(this._pattern.toUpperCase());
        });
    }

    get categories() {
        return this._categories;
    }

    get selectedCategory() {
        return this._selectedCategory;
    }

    get pattern() {
        return this._pattern;
    }
}