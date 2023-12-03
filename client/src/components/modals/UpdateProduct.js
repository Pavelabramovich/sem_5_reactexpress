import styles from "./UpdateProduct.module.css";
import { useState, useContext, useEffect } from 'react';
import Modal from './Modal';
import Button from '../Button';
import Dropdown from '../Dropdown';
import { InputGroup, Control, ErrorLabel, TextControl } from '../Control';
import { Context } from '../../index';
import { getCategories, updateProduct, getProducts } from '../../http/productAPI';
import { observer } from 'mobx-react-lite';


const UpdateProduct = observer((props) => {
    const {productStore} = useContext(Context);
    const product = props.product || {};

    const isOpen = props.isOpen;
    const setIsOpen = props.setIsOpen;

    const [name, setName] = useState(product.name || "");
    const [selectedCategory, setSelectedCategory] = useState(productStore.categories.find(c => c.id === product.categoryId));
    const [price, setPrice] = useState(product.price || 100);
    const [description, setDescription] = useState(product.description || "");
    const [image, setImage] = useState("");

    const [nameError, setNameError] = useState("");
    const [categoryError, setCategoryError] = useState("");
    const [priceError, setPriceError] = useState("");

    useEffect(() => {
        getCategories()
            .then(categories => {
                productStore.setCategories(categories);
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
            if (price === null) {
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

        if (image !== "") {
            formData.append('img', image);
        }

        alert(product.id, formData)

        updateProduct(product.id, formData)
            .then(newProduct => {
                if (props.reload) {
                    props.reload(newProduct);
                }


                setName(newProduct.name);
                setSelectedCategory(productStore.categories.find(c => c.id === newProduct.categoryId));
                setPrice(newProduct.price);
                setDescription(newProduct.description);
                setImage("");

                setNameError("");
                setCategoryError("");
                setPriceError("");

                setIsOpen(false);
            })
            .catch(e => {
                setNameError("Product with this name already exists");
                console.log(e);
            });
    }

    function onCancel() {
        setName(product.name);
        setSelectedCategory(productStore.categories.find(c => c.id === product.categoryId));
        setPrice(product.price);
        setDescription(product.description);
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
                    <h5 className={styles.heading}>Update product</h5>
                </div>
            
                <div className={styles.content}>
                    <InputGroup>
                        <Control
                            value={name}
                            placeholder="Change product name"
                            onChange={ev => {setName(ev.target.value); setNameError("");}} 
                        />
                        <ErrorLabel>{nameError}</ErrorLabel>
                    </InputGroup>

                    <InputGroup>
                        <Dropdown
                            trigger={<Control
                                value={selectedCategory?.name ?? ''}
                                placeholder="Change product category"
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
                            min="0" max="1000" 
                            value={price}
                            placeholder="Change product price"
                            onChange={ev => { setPrice(+ev.target.value); setPriceError("")}} 
                        />
                        <ErrorLabel>{priceError}</ErrorLabel>
                    </InputGroup>

                    <TextControl
                        placeholder="Enter product description"
                        value={description}
                        onChange={ev => setDescription(ev.target.value)} 
                    />

                    <InputGroup style={{marginTop: '20px'}}>
                        <Control
                            type="file"
                            placeholder="Change product image"
                            onChange={ev => {setImage(ev.target.value); selectFile(ev)}} 
                        />
                    </InputGroup>

                </div>
                <div className={styles.actions}>
                    <div className={styles.container}>
                        <Button className={styles.btn} style={{background: '#13a4FD'}} onClick={onAdd}>
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

export default UpdateProduct;
