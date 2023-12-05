import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './BookDetails.module.css';
import { getBook } from '../http/bookAPI';

const BookDetails = () => {
    const [book, setBook] = useState({});
    const {id} = useParams();

    useEffect(() => {
        getBook(id)
            .then(book => {
                setBook(book);
            });
    }, [])

    return (
        <div style={{display: 'flex'}}>
            <div style={{width: 'calc(100% /2)'}}>
                <div style={{padding: '25px'}}>
                    <img 
                        src={process.env.REACT_APP_API_URL + book.image} 
                        alt={book.title} 
                        style={{borderRadius: '20px', width: '100%'}}
                    />
                </div>
                
            </div>

            <div style={{width: 'calc(100% /2)'}}>
                <div style={{padding: '25px'}}>
                    <h1 style={{marginBottom: '45px'}}>{book.title}</h1>
                    <p style={{fontSize: '30px'}}>Price: ${book.price}</p>
                </div>
            </div>
        </div>
    );
}

export default BookDetails;