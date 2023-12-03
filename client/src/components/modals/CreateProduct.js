import styles from "./CreateProduct.module.css";
import { useState } from 'react'
import Modal from './Modal';
import Button from '../Button';
import Dropdown from '../Dropdown';
import { InputGroup, Control, ErrorLabel, TextControl } from '../Control';
import { Context } from '../../index';
import { useContext } from 'react';


const CreateProduct = (props) => {
    const {productStore} = useContext(Context);
    const categories = productStore.categories;

    const isOpen = props.isOpen;
    const setIsOpen = props.setIsOpen;

    const [name, setName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [price, setPrice] = useState(0);
    const [descriptionq, setDescription] = useState("");
    const [image, setImage] = useState("");

    const [nameError, setNameError] = useState("");

    function onAdd() {
        setName("");
        setIsOpen(false);

        ///adding..
    }

    function onCancel() {
        setName("");
        setSelectedCategory(null);
        setIsOpen(false);
    }
    

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} onClose={onCancel}>
            <div>
                <div className={styles.header}>
                    <h5 className={styles.heading}>Add product</h5>
                </div>
            
                <div className={styles.content}>
                    <InputGroup>
                        <Control
                            value={name}
                            placeholder="Enter new product name"
                            onChange={ev => {setName(ev.target.value); setNameError("");}} 
                        />
                        <ErrorLabel>{nameError}</ErrorLabel>
                    </InputGroup>

                    <Dropdown
                        trigger={<Control
                            value={selectedCategory?.name ?? ''}
                            placeholder="Select product category"
                            readOnly={true}
                            style={{cursor: 'pointer'}} 
                        />}

                        menu={categories.map(c => {
                            return <button onClick={() => setSelectedCategory(c)}>{c.name}</button>
                        })}
                    />

                    <InputGroup style={{marginTop: '20px'}}>
                        <Control
                            type="number"
                            min="0" max="1000" 
                            value={price}
                            placeholder="Enter price for new product"
                            onChange={ev => setPrice(ev.target.value)} 
                        />
                    </InputGroup>

                    <TextControl
                        placeholder="Enter product description"
                        onChange={ev => setDescription(ev.target.value)} 
                    />

                    <InputGroup style={{marginTop: '20px'}}>
                        <Control
                            type="file"
                            value={image}
                            placeholder="Select product image"
                            onChange={ev => setImage(ev.target.value)} 
                        />
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

export default CreateProduct;


// name: {type: DataTypes.STRING, unique: true},    

// description: {type: DataTypes.STRING, allowNull: false},    
// price: {type: DataTypes.INTEGER, allowNull: false},
// img: {type: DataTypes.STRING, allowNull: false},