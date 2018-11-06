import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Table } from 'react-bootstrap';
import { API_URL_1 } from '../supports/api-url';
import imagecart from "../images/empty-cart.jpg";

class CartPage extends Component {
    state = { cart: [], editedItemId: 0 };

    componentWillMount() {
        let name = (queryString.parse(this.props.location.search)).username;
        axios.get(API_URL_1 + '/cart', {
            params: {
                username: name
            }
        }).then((res) => {
            this.setState({ cart: res.data })
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
        let name = (queryString.parse(this.props.location.search)).username;
        if(window.confirm('Anda yakin untuk menghapus ini dari Cart?')) {
            axios.delete(API_URL_1 + '/cart/' + id, {
                params: {
                    username: name
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
            jumlah: this.refs.EditJumlah.value
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
        if(this.state.cart.length === 0) {
            return (
                <div style={{ paddingTop: '50px' }}>
                    <img src={imagecart} alt='Empty Cart' />
                </div>
            );
        }
        return (
            <div style={{ paddingTop: '50px', margin: '0 150px' }}>
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
                    <input type="button" className="btn btn-primary" value="CHECKOUT" />
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