import styles from "./UpdateUser.module.css";
import { useState, useContext, useEffect } from 'react';
import Modal from '../Modal';
import Button from '../../Button';
import Dropdown from '../../Dropdown';
import { InputGroup, Control, ErrorLabel, TextControl } from '../../Control';
import { Context } from '../../../index';
import { getUsers } from '../../../http/userAPI';
import { updateUser, getRoles, addProvider, removeProvider, isProvider, getCoupons } from '../../../http/userAPI';
import { observer } from 'mobx-react-lite';


const UpdateUser = observer((props) => {
    const {userStore} = useContext(Context);
    const user = props.user || {};

    const isOpen = props.isOpen;
    const setIsOpen = props.setIsOpen;

    let [selectedRole, setSelectedRole] = useState(userStore.roles.find(r => r.id === user.roleId));
    let [selectedCoupon, setSelectedCoupon] = useState(null);
    const [roleError, setRoleError] = useState("");


    useEffect(() => {
        getRoles()
            .then(roles => {
                userStore.setRoles(roles);
                setSelectedRole(userStore.roles.find(r => r.id === user.roleId));
            });
        
        isProvider(user.id)
            .then(res => {
                if (res) setSelectedRole({id:3, name: "Provider"});
            });

        getCoupons()
            .then(coupons => {
                userStore.setCoupons(coupons);
                setSelectedCoupon(userStore.coupons.find(c => c.id === user.coupon_id));
            });
    }, [props]);




    function onUpdate() {
        if (selectedRole.id == 3) {
            selectedRole.id = 1;
            
            addProvider(user.id).then(u => {});
        } else {
            removeProvider(user.id).then(u => {});
        }

        let newUser = {roleId: selectedRole.id}
        if (selectedCoupon.id != -1) {
            newUser['couponId'] = selectedCoupon.id;
        } else {
            newUser['couponId'] = null;
        }

        updateUser(user.id, newUser)
            .then(newUser => {
                if (props.reload) {
                    props.reload(newUser);
                }

                getUsers()
                    .then(users => {
                        userStore.setUsers(users);
                    });

                setIsOpen(false);
            })
            .catch(e => {
                setRoleError(e?.response?.data?.message);
                removeProvider(user.id).then(u => {});
                console.log(e);
            });
    }

    function onCancel() {
        setSelectedRole(userStore.roles.find(r => r.id == user.roleId));
        setSelectedCoupon(userStore.coupons.find(c => c.id == user.coupon_id));
        setRoleError("");

        setIsOpen(false);
    }
    

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} onClose={onCancel}>
            <div>
                <div className={styles.header}>
                    <h5 className={styles.heading}>Update user</h5>
                </div>
            
                <div className={styles.content}>
                    <InputGroup>
                        <Dropdown
                            trigger={<Control
                                value={selectedRole?.name ?? ''}
                                placeholder="Change user role"
                                readOnly={true}
                                style={{cursor: 'pointer'}} 
                            />}

                            menu={
                                [...userStore.roles, {id:3, name: "Provider"}].map(r => {
                                return (
                                    <button onClick={() => {setSelectedRole(r); setRoleError("")}}>
                                        {r.name}
                                    </button>
                                )
                            })}
                        />
                        <ErrorLabel>{roleError}</ErrorLabel>
                    </InputGroup>

                    <InputGroup>
                        <Dropdown
                            trigger={<Control
                                
                                value={selectedCoupon?.discount ? `-${selectedCoupon?.discount}%`  : ''}
                                placeholder="Change user coupon"
                                readOnly={true}
                                style={{cursor: 'pointer', color: 'red'}} 
                            />}

                            menu={
                                [{id: -1}, ...userStore.coupons].map(c => {
                                    return (
                                        <button onClick={() => { setSelectedCoupon(c) }}>
                                            <div style={{color: 'red'}}>{c.id == -1 ? 'None' : `-${c.discount}%`}</div>
                                        </button>
                                    )
                                })}
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

export default UpdateUser;
