import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Col, Thumbnail } from 'react-bootstrap';
import axios from 'axios';
import queryString from 'query-string';
import { API_URL_1 } from '../supports/api-url';

class MenuList extends Component {
    state = { daftarmenu: [], kategori: [], sortCondition: 1, idmenu: 0, search: "" }

    getSearchList = () => {
        let SearchVal = (queryString.parse(this.props.location.search)).value;
        console.log(SearchVal);
        axios.get(API_URL_1 + '/searchmenu', {
            params: {
                searchValue: SearchVal
            }
        })
        .then((res) => {
            this.setState({ daftarmenu: res.data.daftarmenu, kategori: res.data.kategori, search: SearchVal });
            // console.log(res);
            // console.log(`Search State = ${this.state.search}`);
        })
        .catch((err) => {
            alert("Error Occured");
            console.log(err);
        })
    }

    componentWillMount() {
        this.getSearchList();
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps);
        let newValue = (queryString.parse(newProps.location.search)).value;
        console.log(newValue);
        
        if(newValue !== this.state.search) {
            axios.get(API_URL_1 + '/searchmenu', {
                params: {
                    searchValue: newValue
                }
            })
            .then((res) => {
                this.setState({ daftarmenu: res.data.daftarmenu, kategori: res.data.kategori, search: newValue });
                // console.log(res);
                // console.log(`Search State = ${this.state.search}`);
            })
            .catch((err) => {
                alert("Error Occured");
                console.log(err);
            })
        }
    }

    onSelectSearch = () => {
        axios.get(API_URL_1 + '/filterCatgr', {
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
        else if(method === "Menu" && level === "Asc") {
            this.setState({ sortCondition: 3 })
        }
        else if(method === "Menu" && level === "Desc") {
            this.setState({ sortCondition: 4 })
        }
    }

    onBtnSortClick = () => {
        if(this.state.sortCondition === 1) {
            axios.get(API_URL_1 + '/sorthargaAsc', {
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
        else if(this.state.sortCondition === 2) {
            axios.get(API_URL_1 + '/sorthargaDesc', {
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
        else if(this.state.sortCondition === 3) {
            axios.get(API_URL_1 + '/sortmenuAsc', {
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
        else if(this.state.sortCondition === 4) {
            axios.get(API_URL_1 + '/sortmenuDesc', {
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

    onSelectMenu = (id) => {
        console.log('idmenu = ' + id);
        this.setState({ idmenu: id });
    }

    renderMenuList = () => {
        const list = this.state.daftarmenu.map((item, index) => {
            const { idmenu, menu, kategori, harga, images } = item;
            return(
                <Col xs={6} md={4} key={index}>
                    <Thumbnail src={require('D:/JOB CONNECTOR PURWADHIKA/PROJECT AKHIR/express_API_Project/images/' + images)} alt="242x200" className="img-responsive">
                        <h3>{menu}</h3>
                        <p>Kategori: {kategori}</p>
                        <p>Rp {harga},-
                            &nbsp;
                            <input type="button" className="btn btn-warning" value="Tambah" onClick={() => this.onSelectMenu(idmenu)} />
                        </p>
                    </Thumbnail>
                </Col>
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
        console.log(this.state.idmenu);
        if(this.state.idmenu === 0) {
            return (
                <div style={{paddingTop: "50px"}} className="container">
                    <div className="row">
                    <div className="col-xs-12">
                    <div className="box">
                        <div className="box-header">
                            <h1 className="box-title">Search Result</h1>
                        </div>
                        <div style={{ padding: '25px' }}>
                            <select ref="KategoriSearch" onChange={this.onSelectSearch} style={{ margin: '0 10px 10px 0' }}>
                                <option value=""> -- Pilih Kategori -- </option>
                                {this.renderOptionKategoriSearch()}
                            </select>
                            <label style={{ marginRight: '10px' }}>Sorting by :</label>
                            <select ref="SortingMenu" style={{ marginRight: '10px' }} onChange={this.onSortingMethod} >
                                <option value="Harga">Harga</option>
                                <option value="Menu">Menu</option>
                            </select>
                            <select ref="JenisUrutan" style={{ marginRight: '10px' }} onChange={this.onSortingMethod} >
                                <option value="Asc">Ascending</option>
                                <option value="Desc">Descending</option>
                            </select>
                            <input type="button" value="Submit" onClick={this.onBtnSortClick} />
                        </div>
                        <div className="box-body">
                            <div>{this.renderMenuList()}</div>
                        </div>
                    </div>
                    </div>
                    </div>
                </div>
            );
        }
        else if(this.state.idmenu !== 0 && this.props.auth.username === "") {
            return <Redirect to={'/login'} />;
        }
        return <Redirect to={`/menudetails?id=${this.state.idmenu}`} />;
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;

    return { auth };
}
 
export default connect(mapStateToProps, {})(MenuList);