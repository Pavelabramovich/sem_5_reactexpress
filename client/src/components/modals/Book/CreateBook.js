import styles from "./CreateBook.module.css";
import { useState, useContext, useEffect } from 'react';
import Modal from '../Modal';
import Button from '../../Button';
import Dropdown from '../../Dropdown';
import { InputGroup, Control, ErrorLabel, TextControl } from '../../Control';
import { Context } from '../../../index';
import { getAuthors, getBooks,  createBook, getCategories, updateBookCategories } from '../../../http/bookAPI';
import { observer } from 'mobx-react-lite';


const CreateBook = observer((props) => {
    const {bookStore} = useContext(Context);

    const isOpen = props.isOpen;
    const setIsOpen = props.setIsOpen;

    const [title, setTitle] = useState("");
    const [selectedAuthor, setSelectedAuthor] = useState(null);
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [categories, setCategories] = useState({});

    const [titleError, setTitleError] = useState("");
    const [authorError, setAuthorError] = useState("");
    const [priceError, setPriceError] = useState("");

    useEffect(() => {
        getAuthors()
            .then(authors => {
                bookStore.setAuthors(authors);
            });

        getBooks()
            .then(books => {
               bookStore.setBooks(books.rows);
            });

        getCategories()
            .then(categories => {
                bookStore.setCategories(categories);
            })
    }, [props]);


    const selectFile = (e) => {
        setImage(e.target.files[0]);
    }

    const addCategory = (category) => {
        setCategories({...categories, [category.id]: category.name})
    }

    const removeCategory = (category) => {
        let newCategories = {...categories};
        delete newCategories[category.id];
        setCategories(newCategories);
    }


    function onAdd() {
        var isError = false;

        if (!titleError) {
            if (title === "") {
                setTitleError("Enter book title");
                isError = true;
            } else {
                setTitleError("");
            }
        } else {
            isError = true;
        }

        if (!authorError) {
            if (selectedAuthor === null) {
                setAuthorError("Select author");
                isError = true;
            } else {
                setAuthorError("");
            }
        } else {
            isError = true;
        }

        if (!priceError) {
            if (!price) {
                setPriceError("Enter book price");
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
        formData.append('title', title);
        formData.append('authorId', `${selectedAuthor.id}`);
        formData.append('price', `${price}`);
        formData.append('image', image);

        createBook(formData)
            .then(book => {
                updateBookCategories(book.id, Object.keys(categories))
                    .then(newBookCategories => {

                    });
                onCancel();
            })
            .catch(e => {
                console.log(JSON.stringify(e));
                if (typeof e === 'object' && e !== null) {
                    setTitleError(e.text);
                } else {
                    setTitleError(e);
                }
            });
    }

    function onCancel() {
        setTitle("");
        setSelectedAuthor(null);
        setPrice(0);
        setImage("");
        setCategories([]);

        setTitleError("");
        setAuthorError("");
        setPriceError("");

        setIsOpen(false);
    }
    

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} onClose={onCancel}>
            <div>
                <div className={styles.header}>
                    <h5 className={styles.heading}>Add book</h5>
                </div>
            
                <div className={styles.content}>
                    <InputGroup>
                        <Control
                            value={title}
                            placeholder="Enter new book title"
                            onChange={ev => {setTitle(ev.target.value); setTitleError("");}} 
                        />
                        <ErrorLabel>{titleError}</ErrorLabel>
                    </InputGroup>

                    <InputGroup>
                        <Dropdown
                            trigger={<Control
                                value={selectedAuthor?.name ?? ''}
                                placeholder="Select book author"
                                readOnly={true}
                                style={{cursor: 'pointer'}} 
                            />}

                            menu={bookStore.authors.map(a => {
                                return (
                                    <button onClick={() => { setSelectedAuthor(a); setAuthorError("")}}>
                                        {a.name}
                                    </button>
                                )
                            })}
                        />
                        <ErrorLabel>{authorError}</ErrorLabel>
                    </InputGroup>

                    <InputGroup>
                        <Dropdown
                            trigger={<Control
                                value={Object.values(categories).join()}
                                placeholder="Select book categories"
                                readOnly={true}
                                style={{cursor: 'pointer'}} 
                            />}

                            menu={bookStore.categories.map(c => {
                                return (
                                    <button 
                                        onClick={() => {(c.id in categories) ? removeCategory(c) : addCategory(c)}} 
                                        style={{background: (c.id in categories ? 'gray' : 'inherit')}}
                                    >
                                        {c.name}
                                    </button>
                                )
                            })}

                            closeOnClick={false}
                        />
                    </InputGroup>

                    <InputGroup style={{marginTop: '20px'}}>
                        <Control
                            type="number"
                            min="1" max="1000" 
                            placeholder="Enter price for new book"
                            onChange={ev => { setPrice(+ev.target.value); setPriceError("")}} 
                        />
                        <ErrorLabel>{priceError}</ErrorLabel>
                    </InputGroup>

                    <InputGroup style={{marginTop: '20px'}}>
                        <Control
                            type="file"
                            placeholder="Select book image"
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

export default CreateBook;
