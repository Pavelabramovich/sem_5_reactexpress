import { json, useNavigate } from "react-router-dom";
import Button from '../components/Button';
import { Context } from '../index';
import { InputGroup, Control, ErrorLabel } from '../components/Control';
import { NavLink } from 'react-router-dom';

import styles from './Orders.module.css';
import { LOGIN_URL, SHOP_URL } from "../utils/urls";
import { registration as registerUser, getOrders, getOrderInfo } from "../http/userAPI";

import { useEffect, useState, useContext } from "react";


function OrderItem(props) {
    return (
        <div
            {...props} 
            className={styles.orderItem} 
            style={{display: 'flex', justifyContent: 'space-between'}}
        >
            <span style={{display: 'flex'}}>

                <div style={{display: 'flex', whiteSpace: 'nowrap'}}>
                    <div style={{alignSelf: 'center'}}>{props.id}__</div>
                </div>

                <div style={{display: 'flex', whiteSpace: 'nowrap'}}>
                    <div style={{alignSelf: 'center'}}>{props.time}</div>
                </div>

                <div style={{display: 'flex', whiteSpace: 'nowrap'}}>
                    <div style={{alignSelf: 'center'}}>{props.info}</div>
                </div>

                {/* <div style={{display: 'flex', whiteSpace: 'nowrap', marginLeft: '10px'}}>
                    <div style={{alignSelf: 'center'}}>{props.text}</div>
                </div>           */}
            </span>
        </div>
    );
}


const Orders = () => {
    const {userStore} = useContext(Context);
    const user = userStore.user;

    const [orders, setOrders] = useState([]);
    const [orderInfos, setOrdersInfo] = useState([]);


    useEffect(() => {
        getOrders(user.id)
            .then(orders => {
                setOrders(orders);

                orders.forEach(o => {
                    getOrderInfo(o.id)
                        .then(oi => setOrdersInfo([...orderInfos, oi]))
                });
            });
        
        

        // getOrderInfo(1)
        //     .then(oi => alert(JSON.stringify(oi)));
    }, [])

    return (
        <div>
            {orders.map(o => 
                <OrderItem 
                    key={o.id} 
                    id={o.id}
                    time={o.time}
                    info={JSON.stringify(o.info)}
                />
            )}

        </div>
    )
}

export default Orders;