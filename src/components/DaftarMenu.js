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
                    <td><input type="button" className="btn btn-primary" value="Pesan" onClick={() => this.onBtnPesanClick(item.id)} /> </td>
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
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>URL</th>
                                    <th>Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderMovieList()}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th> <input ref="inputAddTitle" type="text" className="form-control" /> </th>
                                    <th> <input ref="inputAddDesc" type="text" className="form-control" /> </th>
                                    <th> <input ref="inputAddURL" type="text" className="form-control" /> </th>
                                    <th> <input ref="inputAddImage" type="text" className="form-control" /> </th>
                                    <th> <input type="button" className="btn btn-primary" value="Add" onClick={this.onBtnAddClick} /> </th>
                                    {/* di onClick, onBtnAddClick ga boleh dikasih () karena kalo dikasih itu, dia bakal ngisi return apa yg ada di dlm function, bukan function keseluruhan */}
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