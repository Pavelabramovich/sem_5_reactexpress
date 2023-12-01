import { makeAutoObservable } from 'mobx';


export default class ProductStore {
    constructor() {
        this._categories = [{id:1, name: "CATEGORY_LOLOOOLOL"}, {id:2, name: "Workloader"}, {id:3, name: "SpidermanTop"}];
        
        this._products = [{name: "lol"}, {name: "lalal"}];

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