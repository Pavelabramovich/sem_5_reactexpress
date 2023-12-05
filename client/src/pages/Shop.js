import React, { useContext, useEffect, useState } from 'react';
import AuthorBar from '../components/AuthorBar';
import BookList from '../components/BookList';
import { InputGroup, Control, ErrorLabel, TextControl } from '../components/Control';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import { getAuthors, getBooks } from '../http/bookAPI';

const Shop = observer(() => {
    const {bookStore} = useContext(Context);

    const [search, setSearch] = useState("");

    useEffect(() => {
        getAuthors()
            .then(authors => {
                bookStore.setAuthors(authors);
            });

        getBooks()
            .then(books => {
                bookStore.setBooks(books.rows);
            });
    }, []);

    useEffect(() => {
        getBooks(bookStore.selectedAuthor?.id)
            .then(books => {
                bookStore.setBooks(books.rows);
            });
    }, [bookStore.selectedAuthor])

    return (
        <div style={{display: 'flex'}}>
            <div style={{width: 'calc(100% /4)'}}>
                <InputGroup >
                    <Control style={{width: '90%', margin: '15px'}}
                        value={search}
                        placeholder="Search"
                        onChange={ev => {setSearch(ev.target.value); bookStore.setPattern(ev.target.value);}} 
                    />
                </InputGroup>

                <AuthorBar />
            </div>

            <div style={{width: 'calc(100% * 3/4)'}}>
                <BookList />
            </div>
        </div>
    );
});

export default Shop;