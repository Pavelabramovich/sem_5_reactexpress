import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../index';
import styles from './BookDetails.module.css';
import { getBook, getBookProviders } from '../http/bookAPI';
import { getCouponByUserId, addBookToCart, getReviews } from '../http/userAPI';
import Button from '../components/Button';
import CreateReview from '../components/modals/Review/CreateReview';


function ReviewItem(props) {
    return (
        <div
            {...props} 
            className={styles.cartItem} 
            style={{display: 'flex', justifyContent: 'space-between'}}
        >
            <span style={{display: 'flex'}}>

                <div style={{display: 'flex', whiteSpace: 'nowrap'}}>
                    <div style={{alignSelf: 'center'}}>{props.login}</div>
                </div>

                <div style={{display: 'flex', whiteSpace: 'nowrap', marginLeft: '10px'}}>
                    <div style={{alignSelf: 'center'}}>{props.text}</div>
                </div>          
            </span>
        </div>
    );
}



const BookDetails = () => {
    const {userStore} = useContext(Context);
    const user = userStore.user;
    const [book, setBook] = useState({});
    const {id} = useParams();

    const [coupon, setCoupon] = useState(null);
    const [providers, setProviders] = useState([]);
    const [trigger, setTrigger] = useState("");
    const [reviews, setReviews] = useState([]);

    const [isReviewCreating, setIsReviewCreating] = useState(false);

    useEffect(() => {
        getBookProviders(id)
            .then(providers => {
                setProviders(providers);
        })

        

        getBook(id)
            .then(book => {
                getReviews(id)
                     .then(r => {
                        setReviews(r);
                     });

                setBook(book);    

                if (book?.id) {
                    getBookProviders(book?.id)
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

    }, [trigger])

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

                {user.id && 
                    <>
                        <Button 
                            style={{background: 'green'}}
                            onClick={() => {onAdd()}}
                        >
                            Add to cart
                        </Button>

                        <Button 
                            style={{background: 'blue'}} 
                            onClick={() => setIsReviewCreating(true)}
                        >
                            Create review
                        </Button>

                        <CreateReview
                            book={book}
                            isOpen={isReviewCreating} 
                            setIsOpen={setIsReviewCreating} 
                            reload={() => {setTrigger(trigger + Math.random())}}
                        />
                    </>
                }

                <h2>{providers.length ? 'Providers' : ''}</h2>

                <span style={{fontSize: '20px', wordWrap: 'break-word', wordBreak: 'break-all', marginTop: '35px'}}>
                    {providers.map(p => p.login).join(', ')}
                </span>

                {reviews.sort((a, b) => a.title.length -  b.title.length).map(r => 
                <ReviewItem 
                    key={r.title} 

                    login={r.login}
                    text={r.text}
                />
            )}
            </div>
        </div>
    );
}

export default BookDetails;