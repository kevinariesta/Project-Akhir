import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { API_URL_1 } from '../supports/api-url/apiurl';

class MenuList extends Component {
    state = { menu: [] }
            
    getMenuList = () => {
        axios.get(API_URL_1 + '/listmenu')
        .then((response) => {
            this.setState({ menu: response.data });
            console.log(response);
        })
        .catch((err) => {
            alert("Error Occured");
            console.log(err);
        })
    }

    componentWillMount() {
        this.getMenuList();
    }

    renderMenuList = () => {
        const list = this.state.menu.map((item) => {
            return(
                <tr>
                    <td>{item.id}</td>
                    <td>{item.menu}</td>
                    <td>{item.description}</td>
                    <td>{item.harga}</td>
                    <td><img style={{ height: "100px" }} className="img-responsive" src={item.image} alt="image" /></td>
                </tr>
            )
        })
        return list;
    }

    render() { 
        return (
            <div style={{paddingTop: "50px"}} className="container">
                <div className="row">
                <div className="col-xs-12">
                <div className="box">
                    <div className="box-header">
                        <h1 className="box-title">Ini Movie List</h1>
                    </div>
                    <div className="box-body">
                        <table id="example2" className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Menu</th>
                                    <th>Deskripsi</th>
                                    <th>Harga</th>
                                    <th>Gambar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderMenuList()}
                            </tbody>
                            <tfoot>
                                <tr>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                </div>
                </div>
            </div>
        );
    }
}
 
export default MenuList;