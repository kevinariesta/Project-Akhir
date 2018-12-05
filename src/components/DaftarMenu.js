import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';
import axios from 'axios';
import Select from 'react-select';
import { API_URL_1 } from '../supports/api-url';

class MenuList extends Component {
    state = { daftarmenu: [], kategori: [], sortState: 0, levelState: 0, idmenu: 0, valueKategori: "" }

    componentWillMount() {
        this.getAllMenuList()
    }

    getAllMenuList = () => {
        axios.get(API_URL_1 + '/listmenu')
        .then((res) => {
            this.setState({ daftarmenu: res.data.daftarmenu, kategori: res.data.kategori, valueKategori: "All Menu" });
            // console.log(res);
        })
        .catch((err) => {
            alert("Error Occured");
            console.log(err);
        })
    }
    
    onSelectSearch = (value) => {
        if (value === "All Menu") {
            this.getAllMenuList()
        }
        else {
            axios.get(API_URL_1 + '/filterCatgr', {
                params: {
                    namakategori: value
                }
            }).then((res) => {
                this.setState({ daftarmenu: res.data, valueKategori: value })
                // console.log(res.data);
                console.log(this.state.valueKategori);
            }).catch((err) => {
                alert('Error!');
                console.log(err);
            })
        }
    }

    onSortingSelect = (method) => {
        if(method === "harga") {
            this.setState({ sortState: 1 })
        }
        else if(method === "menu") {
            this.setState({ sortState: 2 })
        }
    }

    onLevelSelect = (level) => {
        if(level === "Asc") {
            this.setState({ levelState: 1 })
        }
        else if(level === "Desc") {
            this.setState({ levelState: 2 })
        }
    }

    onBtnSortClick = () => {
        const sorting = this.state.sortState;
        const level = this.state.levelState;
        if(sorting === 1 && level === 1) {
            axios.get(API_URL_1 + '/sorthargaAsc', {
                params: {
                    namakategori: this.state.valueKategori
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
        else if(sorting === 1 && level === 2) {
            axios.get(API_URL_1 + '/sorthargaDesc', {
                params: {
                    namakategori: this.state.valueKategori
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
        else if(sorting === 2 && level === 1) {
            axios.get(API_URL_1 + '/sortmenuAsc', {
                params: {
                    namakategori: this.state.valueKategori
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
        else if(sorting === 2 && level === 2) {
            axios.get(API_URL_1 + '/sortmenuDesc', {
                params: {
                    namakategori: this.state.valueKategori
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
                <Col xs={6} xsOffset={6} sm={4} smOffset={2} md={3} mdOffset={1} lg={3} lgOffset={1} key={index}>
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

    OptionKategori = () => {
        const arrKtgr = this.state.kategori.map((item) => {
            return (
                { value: item.nama, label: item.nama }
            );
        })
        return arrKtgr;
    }

    render() { 
        // console.log(this.state.idmenu);
        const SortingOption = [
            { value: "harga", label: "Harga" },
            { value: "menu", label: "Menu" }
        ];

        const LevelOption = [
            { value: "Asc", label: "Ascending" },
            { value: "Desc", label: "Descending" }
        ]

        if(this.state.idmenu === 0) {
            return (
                <div style={{paddingTop: "50px"}} id="menu-background">
                    <div className="container">
                    <div className="row">
                    <div className="col-xs-12">
                    <div className="box">
                        <div className="box-header">
                            <h1 className="box-title" style={{ color: '#ff7200', fontWeight: 'bold' }}>Menu Makanan</h1>
                        </div>
                        <div className="sidenav">
                            <p>Kategori</p>
                                <Select options={this.OptionKategori()} onChange={opt => this.onSelectSearch(opt.value)} />
                            <p>Sort by:</p>
                                <Select options={SortingOption} onChange={opt => this.onSortingSelect(opt.value)} />
                                <Select options={LevelOption} onChange={opt => this.onLevelSelect(opt.value)} />
                            <input type="button" value="Submit" className="btn btn-success" onClick={this.onBtnSortClick} style={{ marginTop: '10px' }}/>
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