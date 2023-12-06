import { useEffect, useState, useContext } from "react";
import styles from './Cart.module.css';
import { Context } from '../index';
import Button from "../components/Button";
import useForceUpdate from "../utils/useForceUpdate";
import { getUserCartItems, addBookToCart, removeBookFromCart, fullOrder } from '../http/userAPI';
import CreateOrder from "../components/modals/Order/CreateOrder";

function CartItem(props) {
    const [isOrderCreating, setIsOrderCreating] = useState(false);

    const totalPrice = props.count * props.price;

    return (
        <div
            {...props} 
            className={styles.cartItem} 
            style={{display: 'flex', justifyContent: 'space-between'}}
        >
            <img 
                src={process.env.REACT_APP_API_URL + props.image} 
                alt={`${props.title}`} 
                style={{height: '100px', borderRadius: '15px', display: 'flex'}}
            />
            <span style={{display: 'flex'}}>

                <div style={{display: 'flex', whiteSpace: 'nowrap'}}>
                    <div style={{alignSelf: 'center'}}>{props.title}</div>
                </div>

                <div style={{display: 'flex', whiteSpace: 'nowrap', marginLeft: '10px'}}>
                    <div style={{alignSelf: 'center'}}>${props.price} x {props.count} = ${totalPrice}</div>
                </div>
                
                <Button 
                    style={{width: '50%', marginLeft: '10px', background: 'red'}} 
                    onClick={() => { removeBookFromCart(props.userid, props.bookid); props.onClick() }}
                >
                    RemoveOne
                </Button>

                <Button 
                    style={{width: '95%', marginLeft: '10px', background: 'purple'}} 
                    onClick={() =>{ addBookToCart(props.userid, props.bookid); props.onClick() }}
                >
                    AddOne
                </Button>

                {/* <Button 
                    style={{width: '95%', marginLeft: '10px', background: 'blue'}} 
                    onClick={() => setIsOrderCreating(true)}
                >
                    Create order
                </Button>

                <CreateOrder 
                    //category={category} 
                    isOpen={isOrderCreating} 
                    setIsOpen={setIsOrderCreating} 
                  //  reload={setCategory}
                /> */}
                
            </span>
        </div>
    );
}

const Cart = () => {
    const [isOrderCreating, setIsOrderCreating] = useState(false);

    const {userStore} = useContext(Context);
    const user = userStore.user;
    const [cartItems, setCatrItems] = useState([])

    const [trigger, setTrigger] = useState("");

    useEffect(() => {
        getUserCartItems(user.id)
            .then(cartItems => {
                setCatrItems(cartItems);
            })
    }, [trigger])


    return (
        <div>
           {cartItems.sort((a, b) => a.id - b.id).map(c => 
                <CartItem 
                    key={c.id} 

                    title={c.title} 
                    image={c.image}
                    bookid={c.id}
                    userid={user.id}
                    price={c.price}
                    count={c.count}
                    onClick={() => setTrigger(trigger + Math.random())} 
                />
            )}
            <Button 
                style={{width: '97%', background: 'blue'}} 
                onClick={() => setIsOrderCreating(true)}
            >
                Create order
            </Button>

            <CreateOrder 
                userid={user.id}
                isOpen={isOrderCreating} 
                setIsOpen={setIsOrderCreating} 
                reload={() => setTrigger(trigger + Math.random())}
            />
        </div>
    );
}

export default Cart;