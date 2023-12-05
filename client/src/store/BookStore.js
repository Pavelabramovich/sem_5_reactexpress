import { makeAutoObservable } from 'mobx';


export default class BookStore {
    constructor() {
        this._authors = [];
        this._books = [];
        this._pattern = "";

        this._selectedAuthor = null;

        makeAutoObservable(this);
    }

    setAuthors(authors) {
        this._authors = authors;
    }

    setBooks(books) {
        this._books = books;
    }

    selectAuthor(author) {
        this._selectedAuthor = author;
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

    get selectedAuthor() {
        return this._selectedAuthor;
    }

    get pattern() {
        return this._pattern;
    }
}