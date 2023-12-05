import styles from "./CreateAuthor.module.css";
import { useState } from 'react'
import Modal from './Modal';
import Button from '../Button';
import { InputGroup, Control, ErrorLabel } from '../Control';
import { createAuthor } from "../../http/bookAPI";


const CreateAuthor = (props) => {
    const isOpen = props.isOpen;
    const setIsOpen = props.setIsOpen;

    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");

    function onAdd() {
        if (name === "") {
            setNameError("Enter author name");
        }

        createAuthor(name)
            .then(author => {
                setName("");
                setIsOpen(false);
            })
            .catch(e => {
                setNameError("Author with this name already exists");
            });
    }

    function onCancel() {
        setName("");
        setNameError("");
        setIsOpen(false);
    }

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} onClose={onCancel}>
            <div>
                <div className={styles.header}>
                    <h5 className={styles.heading}>Add author</h5>
                </div>
            
                <div className={styles.content}>
                    <InputGroup>
                        <Control
                            value={name}
                            placeholder="Enter new author name"
                            onChange={ev => {setName(ev.target.value); setNameError("");}} 
                        />
                        <ErrorLabel>{nameError}</ErrorLabel>
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


export default CreateAuthor;
