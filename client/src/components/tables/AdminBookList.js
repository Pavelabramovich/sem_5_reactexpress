import { useContext, useState, useEffect } from 'react';
import styles from './AdminBookList.module.css';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';
import Button from '../Button';
import UpdateBook from '../modals/Book/UpdateBook';
import { getAuthors, getBooks,  createBook } from '../../http/bookAPI';
import { deleteBook } from '../../http/bookAPI';
import CreateBook from "../modals/Book/CreateBook";


function BookItem(props) {
    const [isBookUpdating, setIsBookUpdating] = useState(false);
    const [book, setBook] = useState(props.book || null);
    

    return (
        (book &&
            <div
                {...props} 
                className={`${styles.bookItem} ${props.selected ? styles.selected : ''}`} 
                style={{display: 'flex', justifyContent: 'space-between'}}
            >
                <img 
                    src={process.env.REACT_APP_API_URL + book.image} 
                    alt={`${book.title}`} 
                    style={{height: '100px', borderRadius: '15px', display: 'flex'}}
                />
                <span style={{display: 'flex'}}>

                    <div style={{display: 'flex', whiteSpace: 'nowrap'}}>
                        <div style={{alignSelf: 'center'}}>{book.title}</div>
                    </div>
                    
                    <Button 
                        style={{width: '50%', marginLeft: '10px', background: 'red'}} 
                        onClick={() => { deleteBook(book.id); setBook(null); }}
                    >
                        Delete
                    </Button>

                    <Button 
                        style={{width: '95%', marginLeft: '10px', background: 'purple'}} 
                        onClick={() => setIsBookUpdating(true)}
                    >
                        Update
                    </Button>

                    <UpdateBook book={book} isOpen={isBookUpdating} setIsOpen={setIsBookUpdating} reload={setBook}/>
                    
                </span>
            </div>
        )
    );
}


const AdminBookList = observer(() => {
    const [isBookCreating, setIsBookCreating] = useState(false);

    const {bookStore} = useContext(Context);

    useEffect(() => {
        getAuthors()
            .then(authors => {
                bookStore.setAuthors(authors);
            });

        getBooks()
            .then(newBooks => {
               bookStore.setBooks(newBooks.rows);
            });
    }, []);


    return (
        <div style={{display: 'block'}}>
            {bookStore.books.map(b => 
                <BookItem 
                    key={b.id} 
                    book={b}
                />
            )}

            <Button style={{width: '95%', background: 'cornflowerblue'}} onClick={() => {setIsBookCreating(true)}}>
                Add book
            </Button>

            <CreateBook isOpen={isBookCreating} setIsOpen={setIsBookCreating} />
        </div>
    );
});

export default AdminBookList;