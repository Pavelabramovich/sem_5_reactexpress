import { makeAutoObservable } from 'mobx';


export default class BookStore {
    constructor() {
        this._books = [];

        this._authors = [];
        this._categories = [];
        this._providers = [];
        this._pattern = "";

        this._selectedAuthor = null;
        this._selectedCategory = null;

        makeAutoObservable(this);
    }

    setAuthors(authors) {
        this._authors = authors;
    }

    setCategories(categories) {
        this._categories = categories;
    }

    setProviders(providers) {
        this._providers = providers;
    }

    setBooks(books) {
        this._books = books;
    }

    selectAuthor(author) {
        this._selectedAuthor = author;
    }

    selectCategory(category) {
        this._selectedCategory = category;
    }

    setPattern(pattern) {
        this._pattern = pattern;
    }

    get books() {
        return this._books;
    }

    get authors() {
        return this._authors;
    }

    get categories() {
        return this._categories;
    }

    get selectedAuthor() {
        return this._selectedAuthor;
    }

    get selectedCategory() {
        return this._selectedCategory;
    }

    get pattern() {
        return this._pattern;
    }

    get providers() {
        return this._providers;
    }
}