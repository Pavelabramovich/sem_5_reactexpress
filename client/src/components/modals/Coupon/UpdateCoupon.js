import styles from "./UpdateCoupon.module.css";
import { useState, useContext, useEffect } from 'react';
import Modal from '../Modal';
import Button from '../../Button';
import { InputGroup, Control, ErrorLabel } from '../../Control';
import { updateCoupon } from "../../../http/userAPI";
import { observer } from 'mobx-react-lite';
import { Context } from '../../../index';
import { getCoupons, updateBook, getBooks } from '../../../http/userAPI';


const UpdateCoupon = observer((props) => {
    const isOpen = props.isOpen;
    const setIsOpen = props.setIsOpen;
    const {userStore} = useContext(Context);
    const coupon = props.coupon || {};

    const [discount, setDiscount] = useState(coupon.discount || "");
    const [discountError, setDiscountError] = useState("");

    function onUpdate() {
        if (discount === "") {
            setDiscountError("Enter discount");
            return;
        }

        updateCoupon(coupon.id, {discount})
            .then(newCoupon => {
                if (props.reload) {
                    props.reload(newCoupon)
                }

                setDiscount(newCoupon.discount);
                setDiscountError("");
                setIsOpen(false);
            })
            .catch(e => {
                setDiscountError(JSON.stringify(e));
            });
    }

    function onCancel() {
        setDiscount(coupon.discount);
        setDiscountError("");
        setIsOpen(false);
    }

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} onClose={onCancel}>
            <div>
                <div className={styles.header}>
                    <h5 className={styles.heading}>Update coupon</h5>
                </div>
            
                <div className={styles.content}>
                    <InputGroup>
                        <Control
                            value={discount}
                            type="number"
                            min="1" max="100" 
                            placeholder="Enter discount"
                            onChange={ev => {setDiscount(ev.target.value); setDiscountError("");}} 
                        />
                        <ErrorLabel>{discountError}</ErrorLabel>
                    </InputGroup>
                </div>
                <div className={styles.actions}>
                    <div className={styles.container}>
                        <Button className={styles.btn} style={{background: '#13a4FD'}} onClick={onUpdate}>
                            Save
                        </Button>
                        <Button className={styles.btn} style={{background: '#ff4050'}} onClick={onCancel}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
});


export default UpdateCoupon;
