import styles from "./UpdateBook.module.css";
import { useState, useContext, useEffect } from 'react';
import Modal from '../Modal';
import Button from '../../Button';
import Dropdown from '../../Dropdown';
import { InputGroup, Control, ErrorLabel, TextControl } from '../../Control';
import { Context } from '../../../index';
import { getAuthors, updateBook, getBooks, getCategories, updateBookCategories, getBookCategories } from '../../../http/bookAPI';
import { observer } from 'mobx-react-lite';


const UpdateBook = observer((props) => {
    const {bookStore} = useContext(Context);
    const book = props.book || {};

    const isOpen = props.isOpen;
    const setIsOpen = props.setIsOpen;

    const [title, setTitle] = useState(book.title || "");
    const [selectedAuthor, setSelectedAuthor] = useState(bookStore.authors.find(a => a.id === book.authorId));
    const [price, setPrice] = useState(book.price || "");
    const [image, setImage] = useState("");
    // const [categories, setCategories] = useState(Object.fromEntries(getBookCategories(book.id).map(c => {
    //     return [c.id, c.name];
    // })) || {});
    const [categories, setCategories] = useState({});

    const [titleError, setTitleError] = useState("");
    const [authorError, setAuthorError] = useState("");
    const [priceError, setPriceError] = useState("");

    useEffect(() => {
        getAuthors()
            .then(authors => {
                bookStore.setAuthors(authors);
            });

        getCategories()
            .then(categories => {
                bookStore.setCategories(categories);
            })

        getBookCategories(book.id)
            .then(categories => {
                setCategories(Object.fromEntries((categories).map(c => {
                    return [c.id, c.name];
                })))
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


    function onUpdate() {
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
            if (price === null) {
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

        if (image !== "") {
            formData.append('image', image);
        }

        updateBook(book.id, formData)
            .then(newBook => {
                updateBookCategories(newBook.id, Object.keys(categories))
                    .then(newBookCategories => {});

                if (props.reload) {
                    props.reload(newBook);
                }

                getBooks()
                    .then(books => {
                        bookStore.setBooks(books.rows);
                    });

                setTitle(newBook.title);
                setSelectedAuthor(bookStore.authors.find(a => a.id === newBook.authorId));
                setPrice(newBook.price);
                setImage("");

                setTitleError("");
                setAuthorError("");
                setPriceError("");

                setIsOpen(false);
            })
            .catch(e => {
                setTitleError(JSON.stringify(e));
                console.log(e);
            });
    }

    function onCancel() {
        setTitle(book.title);
        setSelectedAuthor(bookStore.authors.find(a => a.id === book.authorId));
        setPrice(book.price);
        setImage("");
        // setCategories(Object.fromEntries(getBookCategories(book.id).map(c => {
        //     return [c.id, c.name];
        // })));

        setCategories({});

        setTitleError("");
        setAuthorError("");
        setPriceError("");

        setIsOpen(false);
    }
    

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} onClose={onCancel}>
            <div>
                <div className={styles.header}>
                    <h5 className={styles.heading}>Update book</h5>
                </div>
            
                <div className={styles.content}>
                    <InputGroup>
                        <Control
                            value={title}
                            placeholder="Change book title"
                            onChange={ev => {setTitle(ev.target.value); setTitleError("");}} 
                        />
                        <ErrorLabel>{titleError}</ErrorLabel>
                    </InputGroup>

                    <InputGroup>
                        <Dropdown
                            trigger={<Control
                                value={selectedAuthor?.name ?? ''}
                                placeholder="Change book author"
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
                            min="0" max="1000" 
                            value={price}
                            placeholder="Change book price"
                            onChange={ev => { setPrice(+ev.target.value); setPriceError("")}} 
                        />
                        <ErrorLabel>{priceError}</ErrorLabel>
                    </InputGroup>

                    <InputGroup style={{marginTop: '20px'}}>
                        <Control
                            type="file"
                            placeholder="Change book image"
                            onChange={ev => {setImage(ev.target.value); selectFile(ev)}} 
                        />
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

export default UpdateBook;
