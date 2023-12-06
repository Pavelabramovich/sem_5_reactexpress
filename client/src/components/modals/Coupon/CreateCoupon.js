import styles from "./CreateCoupon.module.css";
import { useState, useContext } from 'react'
import Modal from '../Modal';
import Button from '../../Button';
import { Context } from '../../../index';
import { InputGroup, Control, ErrorLabel } from '../../Control';
import { createCoupon, getCoupons } from "../../../http/userAPI";


const CreateCoupon = (props) => {
    const {userStore} = useContext(Context);
    const isOpen = props.isOpen;
    const setIsOpen = props.setIsOpen;

    const [discount, setDiscount] = useState(0);
    const [discountError, setDiscountError] = useState("");

    function onAdd() {
        if (discount === "") {
            setDiscountError("Enter discount");
            return;
        }

        createCoupon(discount)
            .then(coupon => {
                getCoupons()
                    .then(coupons => {
                        userStore.setCoupons(coupons);
                    });

                setDiscount("");
                setIsOpen(false);
            })
            .catch(e => {
                setDiscountError("Coupon wuth same discount already exists");
            });
    }

    function onCancel() {
        setDiscount("");
        setDiscountError("");
        setIsOpen(false);
    }

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} onClose={onCancel}>
            <div>
                <div className={styles.header}>
                    <h5 className={styles.heading}>Add coupon</h5>
                </div>
            
                <div className={styles.content}>
                    <InputGroup>
                        <Control
                            type="number"
                            min="1" max="100" 
                            placeholder="Enter discount"
                            onChange={ev => { setDiscount(+ev.target.value); setDiscountError("")}} 
                        />
                        <ErrorLabel>{discountError}</ErrorLabel>
                    </InputGroup>
                </div>
                <div className={styles.actions}>
                    <div className={styles.container}>
                        <Button className={styles.btn} style={{background: '#13a4FD'}} onClick={onAdd}>
                            Add
                        </Button>
                        <Button className={styles.btn} style={{background: '#ff4050'}} onClick={onCancel}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}


export default CreateCoupon;
