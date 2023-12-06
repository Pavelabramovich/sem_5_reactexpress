import styles from "./CreateOrder.module.css";
import { useState, useContext } from 'react'
import Modal from '../Modal';
import Button from '../../Button';
import { Context } from '../../../index';
import { InputGroup, Control, ErrorLabel } from '../../Control';
 import { fullOrder } from "../../../http/userAPI";


const CreateOrder = (props) => {
    const isOpen = props.isOpen;
    const setIsOpen = props.setIsOpen;

    const [cardNum, setCardNum] = useState(0);

    const {userStore} = useContext(Context);
    const user = userStore.user;

    const userId = user.id;


    function onAdd() {
        fullOrder(userId);
        props.reload();

        onCancel();
    }

    function onCancel() {
        setCardNum(0);
        setIsOpen(false);
    }

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} onClose={onCancel}>
            <div>
                <div className={styles.header}>
                    <h5 className={styles.heading}>Enter your card number</h5>
                </div>
            
                <div className={styles.content}>
                    <InputGroup>
                        <Control
                            type="number"
                            min="1" max="100" 
                            value={cardNum}
                            placeholder="Enter your card number"
                            onChange={ev => setCardNum(ev.target.value)} 
                        />
                    </InputGroup>
                </div>
                <div className={styles.actions}>
                    <div className={styles.container}>
                        <Button className={styles.btn} style={{background: '#13a4FD'}} onClick={onAdd}>
                            Order
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


export default CreateOrder;
