import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';
import axios from 'axios';
import queryString from 'query-string';
import { API_URL_1 } from '../supports/api-url';
import image from '../images/noresultsfound.jpg';

class MenuList extends Component {
    state = { daftarmenu: [], kategori: [], sortCondition: 1, idmenu: 0, search: "" }

    getSearchList = () => {
        let SearchKey = (queryString.parse(this.props.location.search)).value;
        console.log(SearchKey);
        axios.get(API_URL_1 + '/searchmenu', {
            params: {
                searchValue: SearchKey
            }
        })
        .then((res) => {
            this.setState({ daftarmenu: res.data.daftarmenu, kategori: res.data.kategori, search: SearchKey });
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
        let newSearchKey = (queryString.parse(newProps.location.search)).value;
        console.log(newSearchKey);
        
        if(newSearchKey !== this.state.search) {
            axios.get(API_URL_1 + '/searchmenu', {
                params: {
                    searchValue: newSearchKey
                }
            })
            .then((res) => {
                this.setState({ daftarmenu: res.data.daftarmenu, kategori: res.data.kategori, search: newSearchKey });
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
                    <div className="thumbnail">
                        <img src={require('D:/JOB CONNECTOR PURWADHIKA/PROJECT AKHIR/express_API_Project/images/' + images)}
                        alt="menu" className="img-responsive" id="imgthumbnail" />
                        <h3>{menu}</h3>
                        <p>Kategori: {kategori}</p>
                        <p>Rp {harga},-
                            &nbsp;
                            <input type="button" className="btn btn-warning" value="Tambah" onClick={() => this.onSelectMenu(idmenu)} />
                        </p>
                    </div>
                </Col>
            )
        })
        return list;
    }

    // renderOptionKategoriSearch = () => {
    //     const arrKtgr = this.state.kategori.map((item, index) => {
    //         return (<option key={index} value={item.nama}>{item.nama}</option>);
    //     })
    //     return arrKtgr;
    // }

    render() { 
        // console.log(this.state.idmenu);
        if(this.state.idmenu === 0 && this.state.daftarmenu.length > 0) {
            return (
                <div id="search-background">
                    <div className="container">
                    <div className="row">
                    <div className="col-xs-12">
                    <div className="box">
                        <div className="box-header">
                            <h1 className="box-title" id="searchtitle">Search Result</h1>
                        </div>
                        <div className="box-body">
                            <div>{this.renderMenuList()}</div>
                        </div>
                    </div>
                    </div>
                    </div>
                    </div>
                </div>
            );
        }
        else if(this.state.idmenu !== 0 && this.props.auth.username === "" && this.state.daftarmenu.length > 0) {
            return <Redirect to={'/login'} />;
        }
        else if(this.state.idmenu !== 0 && this.props.auth.username !== "" && this.state.daftarmenu.length > 0) {
            return <Redirect to={`/menudetails?id=${this.state.idmenu}`} />;
        }
        return (
            <div id="search-background">
                <div className="container">
                <div className="row">
                <div className="col-xs-12">
                <div className="box">
                    <div className="box-header">
                        <h1 className="box-title" id="searchtitle">Search Result</h1>
                    </div>
                    <img src={image} alt="No Results Found" />
                </div>
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