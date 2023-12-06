import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../index';
import styles from './BookDetails.module.css';
import { getBook, getBookProviders } from '../http/bookAPI';
import { getCouponByUserId, addBookToCart } from '../http/userAPI';
import Button from '../components/Button';

const BookDetails = () => {
    const {userStore} = useContext(Context);
    const user = userStore.user;
    const [book, setBook] = useState({});
    const {id} = useParams();

    const [coupon, setCoupon] = useState(null);
    const [providers, setProviders] = useState([]);

    useEffect(() => {
        getBookProviders(id)
            .then(providers => {
                setProviders(providers);
        })

        getBook(id)
            .then(book => {
                setBook(book);    

                if (book.id) {
                    getBookProviders(book.id)
                        .then(providers => {
                            setProviders(providers);
                        })
                }
            });
        
        if (user?.id) {
            getCouponByUserId(user.id)
                .then(coupon => {
                    if (coupon)
                        setCoupon(coupon);
                })
        }

    }, [])

    function onAdd() {
        addBookToCart(user.id, book.id).then(r => {});

        alert("Book added to cart successfully")
    }

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
                    {coupon 
                        ? <p style={{fontSize: '30px',}}>Price: <span style={{color: 'red'}}>
                            ${Math.round(book.price * coupon.discount / 100)}
                          </span></p>
                        : <p style={{fontSize: '30px'}}>Price: ${book.price}</p>}
                    
                </div>

                

                {user.id && <Button 
                    style={{background: 'green'}}
                    onClick={() => {onAdd()}}
                >
                    Add to cart
                </Button>}

                <h2>{providers.length ? 'Providers' : ''}</h2>

                <span style={{fontSize: '20px', wordWrap: 'break-word', wordBreak: 'break-all', marginTop: '35px'}}>
                    {providers.map(p => p.login).join(', ')}
                </span>
            </div>
        </div>
    );
}

export default BookDetails;