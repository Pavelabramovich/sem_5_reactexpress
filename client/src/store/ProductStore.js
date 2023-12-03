import { makeAutoObservable } from 'mobx';


export default class ProductStore {
    constructor() {
        this._categories = [{id:1, name: "CATEGORY_LOLOOOLOL"}, {id:2, name: "Workloader"}, {id:3, name: "SpidermanTop"}];
        
        this._products = [
            {id:1, name: "lol", description: "desc", price: Math.random() * 1000, img: 'https://metanit.com/web/react/pics/2.16.png'}, 
            {id:2, name: "lalal", description: "desc", price: Math.random() * 1000, img: 'https://metanit.com/web/react/pics/2.16.png'},
            {id:3, name: "lol", description: "desc", price: Math.random() * 1000, img: 'https://metanit.com/web/react/pics/2.16.png'}, 
            {id:4, name: "lalal", description: "desc", price: Math.random() * 1000, img: 'https://metanit.com/web/react/pics/2.16.png'},
            {id:5, name: "lol", description: "desc", price: Math.random() * 1000, img: 'https://metanit.com/web/react/pics/2.16.png'}, 
            {id:6, name: "lalal", description: "desc", price: Math.random() * 1000, img: 'https://metanit.com/web/react/pics/2.16.png'},
            {id:7, name: "lol", description: "desc", price: Math.random() * 1000, img: 'https://metanit.com/web/react/pics/2.16.png'}, 
            {id:8, name: "lalal", description: "desc", price: Math.random() * 1000, img: 'https://metanit.com/web/react/pics/2.16.png'}
        ];

        // id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        // name: {type: DataTypes.STRING, unique: true},    
        // description: {type: DataTypes.STRING, allowNull: false},    
        // price: {type: DataTypes.INTEGER, allowNull: false},
        // img: {type: DataTypes.STRING, allowNull: false},

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