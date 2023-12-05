import styles from "./UpdateBook.module.css";
import { useState, useContext, useEffect } from 'react';
import Modal from './Modal';
import Button from '../Button';
import Dropdown from '../Dropdown';
import { InputGroup, Control, ErrorLabel, TextControl } from '../Control';
import { Context } from '../../index';
import { getAuthors, updateBook, getBooks } from '../../http/bookAPI';
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

    const [titleError, setTitleError] = useState("");
    const [authorError, setAuthorError] = useState("");
    const [priceError, setPriceError] = useState("");

    useEffect(() => {
        getAuthors()
            .then(authors => {
                bookStore.setAuthors(authors);
            });
    }, [props]);


    const selectFile = (e) => {
        setImage(e.target.files[0]);
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
                if (props.reload) {
                    props.reload(newBook);
                }

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
                setTitleError("Book with this title already exists");
                console.log(e);
            });
    }

    function onCancel() {
        setTitle(book.title);
        setSelectedAuthor(bookStore.authors.find(a => a.id === book.authorId));
        setPrice(book.price);
        setImage("");

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

export default UpdateBook;
