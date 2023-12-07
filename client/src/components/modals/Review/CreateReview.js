import styles from "./CreateReview.module.css";
import { useState, useContext } from 'react'
import Modal from '../Modal';
import Button from '../../Button';
import { Context } from '../../../index';
import { InputGroup, Control, ErrorLabel, TextControl } from '../../Control';
 import { fullOrder, createReview } from "../../../http/userAPI";


const CreateReview = (props) => {
    const isOpen = props.isOpen;
    const setIsOpen = props.setIsOpen;
    const book = props.book;

    const [text, setText] = useState("");

    const {userStore} = useContext(Context);
    const user = userStore.user;

    const userId = user.id;
    const bookId = book.id;


    function onAdd() {
        createReview(userId, bookId, text);
        
        if (props.reload)
            props.reload(Math.random());

        onCancel();
    }

    function onCancel() {
        setText("")
        setIsOpen(false);
    }

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} onClose={onCancel}>
            <div>
                <div className={styles.header}>
                    <h5 className={styles.heading}>Enter your review</h5>
                </div>
            
                <div className={styles.content}>
                    <TextControl
                        placeholder="Enter your review"
                        onChange={ev => setText(ev.target.value)} 
                    />
                </div>
                <div className={styles.actions}>
                    <div className={styles.container}>
                        <Button className={styles.btn} style={{background: '#13a4FD'}} onClick={onAdd}>
                            Review
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


export default CreateReview;
