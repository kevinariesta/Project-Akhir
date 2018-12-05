import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Table, Button, Modal, FormGroup, ControlLabel } from 'react-bootstrap';
import { API_URL_1 } from '../supports/api-url';
import imagecart from "../images/empty-cart.jpg";
import thanks from '../images/thanks.gif';

class CartPage extends Component {
    state = { cart: [], editedItemId: 0, username: "", show: false };

    componentWillMount() {
        let name = (queryString.parse(this.props.location.search)).username;
        axios.get(API_URL_1 + '/cart', {
            params: {
                username: name
            }
        }).then((res) => {
            this.setState({ cart: res.data, username: name })
            console.log('Get Cart Data!!');
            console.log(res.data);
        }).catch((err) => {
            alert('Error in Cart!!');
            console.log(err);
        })
    }

    onBtnEditClick = (id) => {
        this.setState({ editedItemId: id });
    }

    onBtnCancelClick = () => {
        this.setState({ editedItemId: 0 });
    }

    onBtnDeleteClick = (id) => {
        if(window.confirm('Anda yakin untuk menghapus ini dari Cart?')) {
            axios.delete(API_URL_1 + '/cart/' + id, {
                params: {
                    username: this.state.username
                }
            })
            .then((res) => {
                alert('Delete Item Cart Success!!');
                this.setState({ cart: res.data });
            }).catch((err) => {
                alert('Error Delete Cart!');
                console.log(err);
            })
        }
    }

    onBtnSaveClick = (id) => {
        axios.put(API_URL_1 + `/cart/${id}`, {
            jumlah: this.refs.EditJumlah.value,
            username: this.state.username
        }).then((res) => {
            if(res.data.status === 'Error'){
                console.log(res.data.err);
                alert(res.data.err.sqlMessage);
            }
            else{
                alert('Edit Cart Success!!');
                this.setState({ cart: res.data, editedItemId: 0 });
            }
        }).catch((err) => {
            alert('Error Cart Editing!!');
            console.log(err);
        })
    }

    onCheckOutClick = () => {
        axios.post(API_URL_1 + '/checkout', {
            username: this.state.username,
            totalharga: this.renderTotalPrice(),
            address: this.refs.inputAddress.value
        })
        .then((res) => {
            console.log(res.data);
            this.setState({ cart: "checkout", show: true });
        })
        .catch((err) => {
            alert('Error Checkout!');
            console.log(err);
        })
    }

    onHandleClose = () => {
        this.setState({ show: false });
    }
    
    renderTotalPrice = () => {
        let totalPrice = 0;
        this.state.cart.map((item) => {
            totalPrice += item.jumlah * item.harga;
        });
        return totalPrice;
    }

    renderCartList = () => {
        const cartList = this.state.cart.map((item, index) => {
            const { idcart, menu, jumlah, harga, images } = item;
            if(idcart !== this.state.editedItemId){
                return (
                    <tr key={index}>
                        <td style={{ verticalAlign: 'middle' }}> <img src={require('D:/JOB CONNECTOR PURWADHIKA/PROJECT AKHIR/express_API_Project/images/' + images)} alt="Gambar Menu" width={100} height={60} /> </td>
                        <td style={{ verticalAlign: 'middle' }}>{menu}</td>
                        <td style={{ verticalAlign: 'middle' }}>{jumlah}</td>
                        <td style={{ verticalAlign: 'middle' }}>Rp. {(harga).toLocaleString('id')},-</td>
                        <td style={{ verticalAlign: 'middle' }}> 
                            <input type="button" className="btn btn-success" value="Edit" onClick={() => this.onBtnEditClick(idcart)} style={{ marginBottom: '5px' }}/><br/>
                            <input type="button" className="btn btn-danger" value="Delete" onClick={() => this.onBtnDeleteClick(idcart)} />
                        </td>
                    </tr>
                );
            }
            return(
                <tr key={index}>
                    <td style={{ verticalAlign: 'middle' }}> <img src={require('D:/JOB CONNECTOR PURWADHIKA/PROJECT AKHIR/express_API_Project/images/' + images)} alt="Gambar Menu" width={100} height={60} /> </td>
                    <td style={{ verticalAlign: 'middle' }}>{menu}</td>
                    <td style={{ verticalAlign: 'middle' }}> <input type="number" ref="EditJumlah" defaultValue={jumlah} style={{ width: '50px' }}/> </td>
                    <td style={{ verticalAlign: 'middle' }}>Rp. {(harga).toLocaleString('id')},-</td>
                    <td style={{ verticalAlign: 'middle' }}> 
                        <input type="button" className="btn btn-primary" value="Save" onClick={() => this.onBtnSaveClick(idcart)} style={{ marginBottom: '5px' }}/><br/>
                        <input type="button" className="btn btn-default" value="Cancel" onClick={() => this.onBtnCancelClick()} />
                    </td>
                </tr>
            )
        })
        return cartList;
    }

    render() { 
        if(this.state.cart === "checkout" && this.state.show === true) {
            return (
                <div className="container" style={{ margin: '100px' }}>
                    <Modal show={this.state.show}>
                        <Modal.Header>
                            <Modal.Title><h1>Your Transaction is Completed!!!</h1></Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ paddingTop: '10px' }}>Please Wait while your Order is being Processed..</Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.onHandleClose}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                    <div style={{ paddingTop: '50px' }}>
                        <img src={thanks} alt="Thank you" />
                    </div>
                </div>
            );
        }
        else if(this.state.cart === "checkout" && this.state.show === false) {
            return (
                <div style={{ paddingTop: '50px' }}>
                    <img src={thanks} alt="Thank you" />
                </div>
            );
        }
        else if(this.state.cart.length === 0) {
            return (
                <div style={{ paddingTop: '50px' }}>
                    <img src={imagecart} alt='Empty Cart' />
                </div>
            );
        }
        return (
            // <div style={{ paddingTop: '50px', margin: '0 150px' }}>
            <div id="cartpage">
                <h1>Cart List</h1>
                <div condensed='true'>
                    <Table condensed hover style={{ width: '1000px' }}>
                        <thead>
                            <tr>
                                <th></th>
                                <th style={{ textAlign: 'center' }}>Menu</th>
                                <th style={{ textAlign: 'center' }}>Jumlah</th>
                                <th style={{ textAlign: 'center' }}>Harga</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderCartList()}
                            <tr>
                                <td></td>
                                <td></td>
                                <td><b>Total Harga : </b></td>
                                <td><b>Rp. {(this.renderTotalPrice()).toLocaleString('id')},-</b></td>
                            </tr>
                        </tbody>
                    </Table>

                    <FormGroup controlId="formControlsTextarea" style={{textAlign: 'left'}}>
                        <ControlLabel>Input Address:</ControlLabel>
                        <textarea className="form-control" rows="3" ref="inputAddress" placeholder="Please Input Your Address" />
                    </FormGroup>

                    <input type="button" className="btn btn-primary" value="CHECKOUT" onClick={this.onCheckOutClick} style={{marginBottom: '100px'}} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;

    return { auth };
}
 
export default connect(mapStateToProps, {})(CartPage);