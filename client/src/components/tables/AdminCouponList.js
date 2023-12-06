import { useContext, useState, useEffect } from 'react';
import styles from './AdminCouponList.module.css';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';
import Button from '../Button';
import CreateCoupon from "../modals/Coupon/CreateCoupon";
import UpdateCoupon from '../modals/Coupon/UpdateCoupon';
import { deleteCoupon, getCoupons } from '../../http/userAPI';



function CouponItem(props) {
    const [isCouponUpdating, setIsCouponUpdating] = useState(false);
    const [coupon, setCoupon] = useState(props.coupon || null);
    const {userStore} = useContext(Context);
    
    return (
        (coupon &&
            <div
                {...props} 
                className={`${styles.couponItem} ${props.selected ? styles.selected : ''}`} 
                style={{display: 'flex', justifyContent: 'right'}}
            >
                <span style={{display: 'flex'}}>

                    <div style={{display: 'flex', whiteSpace: 'nowrap'}}>
                        <div style={{alignSelf: 'center', color: 'red'}}>-{coupon.discount}%</div>
                    </div>
                    
                    <Button 
                        style={{width: '50%', marginLeft: '10px', background: 'red'}} 
                        onClick={() => { deleteCoupon(coupon.id); setCoupon(null); }}
                    >
                        Delete
                    </Button>

                    <Button 
                        style={{width: '95%', marginLeft: '10px', background: 'purple'}} 
                        onClick={() => setIsCouponUpdating(true)}
                    >
                        Update
                    </Button>

                    <UpdateCoupon coupon={coupon} isOpen={isCouponUpdating} setIsOpen={setIsCouponUpdating} reload={setCoupon}/>
                    
                </span>
            </div>
        )
    );
}


const AdminCouponList = observer(() => {
    const [isCouponCreating, setIsCouponCreating] = useState(false);

    const {userStore} = useContext(Context);
    const coupons = userStore.coupons;

    useEffect(() => {
        getCoupons()
            .then(coupons => {
                userStore.setCoupons(coupons);
            });
    }, []);

    return (
        <div style={{display: 'block'}}>
            {userStore.coupons.map(c => 
                <CouponItem 
                    key={c.id} 
                    coupon={c}
                />
            )}

            <Button style={{width: '95%', background: 'cornflowerblue'}} onClick={() => {setIsCouponCreating(true)}}>
                Add coupon
            </Button>

            <CreateCoupon isOpen={isCouponCreating} setIsOpen={setIsCouponCreating} />
        </div>
    );
});

export default AdminCouponList;