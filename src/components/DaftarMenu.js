import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';
import axios from 'axios';
import { API_URL_1 } from '../supports/api-url';
import image1 from '../images/thumbnaildiv.png';

class MenuList extends Component {
    state = { daftarmenu: [], kategori: [], sortCondition: 1 }
            
    getMenuList = () => {
        axios.get(API_URL_1 + '/listmenu')
        .then((res) => {
            this.setState({ daftarmenu: res.data.daftarmenu, kategori: res.data.kategori });
            // console.log(res);
        })
        .catch((err) => {
            alert("Error Occured");
            console.log(err);
        })
    }

    componentWillMount() {
        this.getMenuList();
    }

    onSelectSearch = () => {
        axios.get(API_URL_1 + '/searchmenu', {
            params: {
                namakategori: this.refs.KategoriSearch.value
            }
        }).then((res) => {
            this.setState({ daftarmenu: res.data })
            // console.log(res.data);
        }).catch((err) => {
            alert('Error!');
            console.log(err);
        })
    }

    onSortingMethod = () => {
        const method = this.refs.SortingMenu.value;
        const level = this.refs.JenisUrutan.value;
        if(method === "Harga" && level === "Asc") {
            this.setState({ sortCondition: 1 })
        }
        else if(method === "Harga" && level === "Desc") {
            this.setState({ sortCondition: 2 })
        }
        else if(method === "Kategori" && level === "Asc") {
            this.setState({ sortCondition: 3 })
        }
        else if(method === "Kategori" && level === "Desc") {
            this.setState({ sortCondition: 4 })
        }
    }

    onBtnSortClick = () => {
        if(this.state.sortCondition == 1) {
            axios.get(API_URL_1 + '/sortinghargaAsc', {
                params: {
                    namakategori: this.refs.KategoriSearch.value
                }
            }).then((res) => {
                this.setState({ daftarmenu: res.data })
                console.log(res.data);
                alert("Sorting Success!");
            }).catch((err) => {
                alert("Error in Sorting!");
                console.log(err);
            })
        }
        else if(this.state.sortCondition == 2) {
            axios.get(API_URL_1 + '/sortinghargaDesc', {
                params: {
                    namakategori: this.refs.KategoriSearch.value
                }
            }).then((res) => {
                this.setState({ daftarmenu: res.data })
                console.log(res.data);
                alert("Sorting Success!");
            }).catch((err) => {
                alert("Error in Sorting!");
                console.log(err);
            })
        }
        else if(this.state.sortCondition == 3) {
            axios.get(API_URL_1 + '/sortingKtgAsc', {
                params: {
                    namakategori: this.refs.KategoriSearch.value
                }
            }).then((res) => {
                this.setState({ daftarmenu: res.data })
                console.log(res.data);
                alert("Sorting Success!");
            }).catch((err) => {
                alert("Error in Sorting!");
                console.log(err);
            })
        }
        else if(this.state.sortCondition == 4) {
            axios.get(API_URL_1 + '/sortingKtgDesc', {
                params: {
                    namakategori: this.refs.KategoriSearch.value
                }
            }).then((res) => {
                this.setState({ daftarmenu: res.data })
                console.log(res.data);
                alert("Sorting Success!");
            }).catch((err) => {
                alert("Error in Sorting!");
                console.log(err);
            })
        }
    }

    renderMenuList = () => {
        const list = this.state.daftarmenu.map((item, index) => {
            return(
                // <tr key={index}>
                //     <td>{item.iddaftarmenu}</td>
                //     <td>{item.menu}</td>
                //     <td>{item.description}</td>
                //     <td>{item.harga}</td>
                //     <td>{item.kategori}</td>
                //     {/* <td><img style={{ height: "100px" }} className="img-responsive" src={item.image} alt="image" /></td> */}
                // </tr>
                <div className="col-xs-6 col-md-4">
                    <div className="thumbnail img-thumbnail">
                        <img src={image1} alt="242x200" />
                        <h4>{item.menu}</h4>
                        {/* <p>{item.description}</p> */}
                        <p>Kategori: {item.kategori}</p>
                        <p>Rp {item.harga},-
                            &nbsp;
                            <input type="button" className="btn btn-primary" value="Button" />
                            &nbsp;
                            <input type="button" className="btn btn-default" value="Button" />
                        </p>
                    </div>
                </div>
            )
        })
        return list;
    }

    renderOptionKategoriSearch = () => {
        const arrKtgr = this.state.kategori.map((item, index) => {
            return (<option key={index} value={item.nama}>{item.nama}</option>);
            })
            return arrKtgr;
    }

    render() { 
        return (
            <div style={{paddingTop: "50px"}} className="container">
                <div className="row">
                <div className="col-xs-12">
                <div className="box">
                    <div className="box-header">
                        <h1 className="box-title">Menu Makanan</h1>
                    </div>
                    <div style={{ padding: '25px' }}>
                        <select ref="KategoriSearch" onChange={this.onSelectSearch} style={{ margin: '0 10px 10px 0' }}>
                            <option value=""> -- Pilih Kategori -- </option>
                            {this.renderOptionKategoriSearch()}
                        </select>
                        <label style={{ marginRight: '10px' }}>Sorting by :</label>
                        <select ref="SortingMenu" style={{ marginRight: '10px' }} onChange={this.onSortingMethod} >
                            <option value="Harga">Harga</option>
                            <option value="Kategori">Kategori</option>
                        </select>
                        <select ref="JenisUrutan" style={{ marginRight: '10px' }} onChange={this.onSortingMethod} >
                            <option value="Asc">Ascending</option>
                            <option value="Desc">Descending</option>
                        </select>
                        <input type="button" value="Submit" onClick={this.onBtnSortClick} />
                    </div>
                    <div className="box-body">
                        {/* <table id="example2" className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Menu</th>
                                    <th>Deskripsi</th>
                                    <th>Harga</th>
                                    <th>Kategori</th>
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
                        <div className="col-xs-6 col-md-4">
                            <div className="thumbnail img-thumbnail">
                                <img src={image1} alt="242x200" />
                                <h3>Thumbnail label</h3>
                                <p>Description</p>
                                <p>
                                <input type="button" className="btn btn-primary" value="Button" />
                                &nbsp;
                                <input type="button" className="btn btn-default" value="Button" />
                                </p>
                            </div> */}
                        <div>
                            {this.renderMenuList()}
                        </div>
                    </div>
                </div>
                </div>
                </div>
            </div>
        );
    }
}
 
export default MenuList;