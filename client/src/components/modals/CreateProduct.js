import styles from "./CreateProduct.module.css";
import { useState, useContext, useEffect } from 'react';
import Modal from './Modal';
import Button from '../Button';
import Dropdown from '../Dropdown';
import { InputGroup, Control, ErrorLabel, TextControl } from '../Control';
import { Context } from '../../index';
import { getCategories, getProducts,  createProduct } from '../../http/productAPI';
import { observer } from 'mobx-react-lite';


const CreateProduct = observer((props) => {
    const {productStore} = useContext(Context);
    const categories = productStore.categories;

    const isOpen = props.isOpen;
    const setIsOpen = props.setIsOpen;

    const [name, setName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    const [nameError, setNameError] = useState("");
    const [categoryError, setCategoryError] = useState("");
    const [priceError, setPriceError] = useState("");

    useEffect(() => {
        getCategories()
            .then(categories => {
                productStore.setCategories(categories);
            });

        getProducts()
            .then(products => {
                productStore.setProducts(products.rows);
            });
    }, [props]);


    const selectFile = (e) => {
        setImage(e.target.files[0]);
    }


    function onAdd() {
        var isError = false;

        if (!nameError) {
            if (name === "") {
                setNameError("Enter product name");
                isError = true;
            } else {
                setNameError("");
            }
        } else {
            isError = true;
        }

        if (!categoryError) {
            if (selectedCategory === null) {
                setCategoryError("Select category");
                isError = true;
            } else {
                setCategoryError("");
            }
        } else {
            isError = true;
        }

        if (!priceError) {
            if (!price) {
                setPriceError("Enter product price");
                isError = true;
            } else {
                setPriceError("");
            }
        } else {
            isError = true;
        }

        if (isError) {
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('categoryId', `${selectedCategory.id}`);
        formData.append('price', `${price}`);
        formData.append('description', description);
        formData.append('img', image);

        createProduct(formData)
            .then(product => {
                onCancel();
            })
            .catch(e => {
                setNameError("Product with this name already exists");
                //console.log(e);
            });
    }

    function onCancel() {
        setName("");
        setSelectedCategory(null);
        setPrice(0);
        setDescription("");
        setImage("");

        setNameError("");
        setCategoryError("");
        setPriceError("");

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

                    <InputGroup>
                        <Dropdown
                            trigger={<Control
                                value={selectedCategory?.name ?? ''}
                                placeholder="Select product category"
                                readOnly={true}
                                style={{cursor: 'pointer'}} 
                            />}

                            menu={productStore.categories.map(c => {
                                return (
                                    <button onClick={() => { setSelectedCategory(c); setCategoryError("")}}>
                                        {c.name}
                                    </button>
                                )
                            })}
                        />
                        <ErrorLabel>{categoryError}</ErrorLabel>
                    </InputGroup>

                    <InputGroup style={{marginTop: '20px'}}>
                        <Control
                            type="number"
                            min="1" max="1000" 
                            placeholder="Enter price for new product"
                            onChange={ev => { setPrice(+ev.target.value); setPriceError("")}} 
                        />
                        <ErrorLabel>{priceError}</ErrorLabel>
                    </InputGroup>

                    <TextControl
                        placeholder="Enter product description"
                        onChange={ev => setDescription(ev.target.value)} 
                    />

                    <InputGroup style={{marginTop: '20px'}}>
                        <Control
                            type="file"
                            placeholder="Select product image"
                            onChange={ev => {setImage(ev.target.value); selectFile(ev)}} 
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
});

export default CreateProduct;
