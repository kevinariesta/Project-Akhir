import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { API_URL_1 } from '../supports/api-url';

class MenuList extends Component {
    state = { listtransaction: [], transDetail: [], show: false }

    componentWillMount() {
        axios.get(API_URL_1 + '/transaction')
        .then((res) => {
            this.setState({ listtransaction: res.data });
            console.log(res.data);
        })
        .catch((err) => {
            alert("Error Occured");
            console.log(err);
        })
    }

    getTransactionDetail = (id) => {
        axios.get(API_URL_1 + '/transDetail/' + id)
        .then((res) => {
            console.log(res.data);
            this.setState({ transDetail: res.data, show: true })
        })
        .catch(err => {
            alert('Error!');
            console.log(err);
        })
    }

    onTransDetailClick = (id) => {
        this.getTransactionDetail(id);
    }

    onHandleClose = () => {
        this.setState({ show: false });
    }

    renderTransactionList = () => {
        const list = this.state.listtransaction.map((item, index) => {
            const { idtrans, username, totalharga } = item;
            return (
                <tr key={index}>
                    <td>
                        <input type="button" className="btn btn-primary" value={idtrans}
                        onClick={() => this.onTransDetailClick(idtrans)} />
                    </td>
                    <td>{username}</td>
                    <td>{totalharga}</td>
                </tr>
            );
        })
        return list;
    }

    renderTransactionDetail = () => {
        const detailList = this.state.transDetail.map((item, index) => {
            const { idtransdetail, menu, jumlah, harga, images, alamat } = item;
            return (
                <tr key={index}>
                    <td>{idtransdetail}</td>
                    <td>
                        <img src={require('D:/JOB CONNECTOR PURWADHIKA/PROJECT AKHIR/express_API_Project/images/' + images)} 
                        alt="menu" className="img-responsive" style={{ height: "100px" }} />
                    </td>
                    <td>{menu}</td>
                    <td>{jumlah}</td>
                    <td>{harga}</td>
                    <td>{alamat}</td>
                </tr>
            )
        })
        return detailList;
    }

    renderTransactionPage = () => {
        if(this.state.transDetail.length > 0 && this.state.show === true) {
            return (
                <div className="box-body">
                    <Modal show={this.state.show}>
                        <Modal.Body style={{ paddingTop: '10px' }}>
                            <table id="example2" className="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Thumbnail</th>
                                        <th>Menu</th>
                                        <th>Jumlah</th>
                                        <th>Harga per Menu</th>
                                        <th>Alamat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderTransactionDetail()}
                                </tbody>
                            </table>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.onHandleClose}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                    <table id="example2" className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Transaction ID</th>
                                <th>Username</th>
                                <th>Total Harga</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTransactionList()}
                        </tbody>
                    </table>
                </div>
            );
        }
        return (
            <div className="box-body">
                <table id="example2" className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Transaction ID</th>
                            <th>Username</th>
                            <th>Total Harga</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTransactionList()}
                    </tbody>
                </table>
            </div>
        );
    }

    render() { ;
        return (
            <div style={{paddingTop: "50px"}} className="container">
                <div className="row">
                <div className="col-xs-12">
                <div className="box">
                    <div className="box-header">
                        <h1 className="box-title">Transaction History</h1>
                    </div>
                    {this.renderTransactionPage()}
                </div>
                </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;

    return { auth };
}
 
export default connect(mapStateToProps, {})(MenuList);