import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import queryString from 'query-string';
import { Modal, Button } from 'react-bootstrap';
import { API_URL_1 } from '../supports/api-url';

class TransHistory extends Component {
    state = { transactionDisp: [], transhistory: [], transdetail: [], show: false, username: "" }

    componentWillMount() {
        let name = (queryString.parse(this.props.location.search)).username;
        axios.get(API_URL_1 + '/transhistoryuser', {
            params: {
                username: name
            }
        })
        .then((res) => {
            this.setState({ transactionDisp: res.data.orderedTrans, transhistory: res.data.transaction, username: name });
        })
        .catch((err) => {
            alert("Error Occured");
            console.log(err);
        })
    }

    getTransactionDetail = (idtrans) => {
        axios.get(API_URL_1 + '/transdetailuser/' + idtrans)
        .then((res) => {
            this.setState({ transdetail: res.data, show: true });
            console.log(res.data);
        })
        .catch((err) => {
            alert('Error Get Transaction Detail!');
            console.log(err);
        })
    }

    onTransDetailClick = (id) => {
        this.getTransactionDetail(id);
    }

    onHandleClose = () => {
        this.setState({ show: false });
    }
        
    renderTransactionHistory = () => {
        const list = this.state.transactionDisp.map((item, index) => {
            const { TransactionID, totalharga } = item;
            return (
                <tr key={index}>
                    <td>
                        <input type="button" className="btn btn-primary" value={TransactionID}
                        onClick={() => this.onTransDetailClick(TransactionID)} />
                    </td>
                    <td>{totalharga}</td>
                </tr>
            );
        })
        return list;
    }

    renderTransactionDetail = () => {
        const detailList = this.state.transdetail.map((item, index) => {
            const { menu, jumlah, harga, images, alamat } = item;
            return (
                <tr key={index}>
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
        if(this.state.transdetail.length > 0 && this.state.show === true) {
            return (
                <div className="box-body">
                <Modal show={this.state.show}>
                    <Modal.Body style={{ paddingTop: '10px' }}>
                        <table id="example2" className="table table-bordered table-hover">
                            <thead>
                                <tr>
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
                            <th>Total Harga</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTransactionHistory()}
                    </tbody>
                </table>
            </div>
            )
        }
        return (
            <div className="box-body">
                <table id="example2" className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Total Harga</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderTransactionHistory()}
                </tbody>
                </table>
            </div>
        )
    }

    render() {
        return (
            <div className="container" style={{ padding: '50px 0'}}>
                <div className="row">
                <div className="col-xs-12">
                <div className="box">
                    <div className="box-header">
                        <h1 className="box-title">Your Transaction History</h1>
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
 
export default connect(mapStateToProps, {})(TransHistory);