import { useContext } from 'react';
import styles from './BookList.module.css';
import { Context } from '../index';
import { useNavigate } from 'react-router-dom';
import { BOOK_URL } from '../utils/urls';
import { observer } from 'mobx-react-lite';


function BookItem(props) {
    const navigate = useNavigate();

    return (
        <div 
            {...props} 
            className={`${styles.bookItem} ${props.selected ? styles.selected : ''}`} 
            onClick={() => navigate(BOOK_URL.replace(':id', props.book.id))}
            style={{display: 'grid', alignItems: 'end'}}
        >
            <img 
                src={process.env.REACT_APP_API_URL + props.book.image} 
                alt={`${props.book.title}`} 
                style={{width: '100%', borderRadius: '15px'}}
            />
            <div>
                <p style={{whiteSpace: 'nowrap'}}>{props.book.title}</p>
                <br/>
                <p style={{fontWeight: 'bold'}}>${props.book.price}</p>
            </div>
        </div>
    );
}


const BookList = observer(() => {
    const {bookStore} = useContext(Context);
    let books = bookStore.books;
    const pattern = bookStore.pattern;
    const selectedAuthor = bookStore.selectedAuthor;

    books = books.filter(b => (pattern === "")
                            ? true
                            : b.title.toUpperCase().startsWith(pattern.toUpperCase()));
    
    books = books.filter(b => selectedAuthor ? b.authorId === selectedAuthor.id : true);
    
    return (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)'}}>
            {books.map(b => 
                <BookItem 
                    key={b.id} 
                    book={b}
                />
            )}
        </div>
    );
});

export default BookList;