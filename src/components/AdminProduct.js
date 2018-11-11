import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { API_URL_1 } from '../supports/api-url';

class AdminProduct extends Component {
    state = { daftarmenu: [], kategori: [], sortCondition: 1, idmenu: 0, editedItemId: 0 }

    componentWillMount() {
        axios.get(API_URL_1 + '/listmenu')
        .then((res) => {
            this.setState({ daftarmenu: res.data.daftarmenu, kategori: res.data.kategori });
            console.log(res);
        })
        .catch((err) => {
            alert("Error Occured");
            console.log(err);
        })
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

    onEditClick = (id) => {
        this.setState({ editedItemId: id });
    }

    onCancelClick = () => {
        this.setState({ editedItemId: 0 });
    }

    onDeleteClick = (id) => {
        if(window.confirm('Are you sure to delete this item?')) {
            axios.delete(API_URL_1 + '/listmenu/' + id)
            .then((res) => {
                alert('Delete Menu Success!!');
                this.setState({ daftarmenu: res.data })
                console.log(res.data);
            })
            .catch((err) => {
                alert('Error Delete Menu!!');
                console.log(err);
            })
        }
    }

    onSaveClick = (id) => {
        if(this.refs.EditKategori.value !== "") {
            axios.put(API_URL_1 + `/listmenu/${id}`, {
                images: this.refs.EditImage.value,
                menu: this.refs.EditMenu.value,
                description: this.refs.EditDescription.value,
                harga: this.refs.EditHarga.value,
                idkategori: this.refs.EditKategori.value
            }).then((res) => {
                if(res.data.status === 'Error') {
                    console.log(res.data.err);
                    alert(res.data.err.sqlMessage);
                }
                else {
                    alert('Edit Menu Success!!');
                    this.setState({ daftarmenu: res.data, editedItemId: 0 });
                }
            }).catch((err) => {
                alert('Error Editing!!');
                console.log(err);
            })
        }
        else {
            return (
                alert(`"Kategori" cannot be empty. 
                \n Please choose from the option given.`)
            );
        }
    }

    onAddClick = () => {
        if(this.refs.Kategori.value !== "") {
            axios.post(API_URL_1 + '/listmenu', {
                images: this.refs.Image.value,
                menu: this.refs.Menu.value,
                description: this.refs.Description.value,
                harga: this.refs.Harga.value,
                idkategori: this.refs.Kategori.value
            }).then((res) => {
                alert('Add Menu Success!');
                this.setState({ daftarmenu: res.data })
            }).catch((err) => {
                alert('Error Adding Menu');
                console.log(err);
            })
        }
        else {
            return (
                alert(`"Kategori" cannot be empty. 
                \n Please choose from the option given.`)
            );
        }
    }

    renderOptionKategori = () => {
        const arrKtgr = this.state.kategori.map((item, index) => {
            return (<option key={index} value={item.id}>{item.nama}</option>);
        })
        return arrKtgr;
    }

    renderOptionKategoriSearch = () => {
        const arrKtgr = this.state.kategori.map((item, index) => {
            return (<option key={index} value={item.nama}>{item.nama}</option>);
        })
        return arrKtgr;
    }
    
    renderMenuList = () => {
        const list = this.state.daftarmenu.map((item, index) => {
            const { idmenu, menu, description, kategori, harga, images } = item;
            if(idmenu !== this.state.editedItemId) {
                return(
                    <tr key={index}>
                        <td>{idmenu}</td>
                        <td>
                            <img src={require('D:/JOB CONNECTOR PURWADHIKA/PROJECT AKHIR/express_API_Project/images/' + images)} 
                            alt="menu" className="img-responsive" style={{ height: "100px" }} />
                        </td>
                        <td>{menu}</td>
                        <td>{description}</td>
                        <td>{harga}</td>
                        <td>{kategori}</td> 
                        <td><input type="button" className="btn btn-success" value="Edit" onClick={() => this.onEditClick(idmenu)} style={{ marginBottom: '5px' }} /> <br/>
                            <input type="button" className="btn btn-danger" value="Delete" onClick={() => this.onDeleteClick(idmenu)} />
                        </td>
                    </tr>
                );
            }
            return (
                <tr key={index}>
                    <td>{idmenu}</td>
                    <td><input type="text" ref="EditImage" defaultValue={images} style={{ width: '150px'}} /></td>
                    <td><input type="text" ref="EditMenu" defaultValue={menu} style={{ width: '150px' }} /></td>
                    <td><input type="text" ref="EditDescription" defaultValue={description} style={{ width: '150px' }} /></td>
                    <td><input type="number" ref="EditHarga" defaultValue={harga} style={{ width: '150px' }} /></td> 
                    <td>
                        <select ref="EditKategori" defaultValue={kategori}>
                            <option value=""> -- Pilih Kategori -- </option>
                            {this.renderOptionKategori()}
                        </select>
                    </td>
                    <td><input type="button" className="btn btn-primary" value="Save" onClick={() => this.onSaveClick(idmenu)} style={{ marginBottom: '5px' }} /> <br/>
                        <input type="button" className="btn btn-default" value="Cancel" onClick={() => this.onCancelClick()} />
                    </td>
                </tr>
            );
        })
        return list;
    }

    render() { ;
        return (
            <div style={{paddingTop: "50px"}} className="container">
                <div className="row">
                <div className="col-xs-12">
                <div className="box">
                    <div className="box-header">
                        <h1 className="box-title">List Menu</h1>
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
                        <table id="example2" className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Image</th>
                                    <th>Menu</th>
                                    <th>Deskripsi</th>
                                    <th>Harga</th>
                                    <th>Kategori</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderMenuList()}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td><input type="text" ref="Image" style={{ width: '150px'}} /></td>
                                    <td><input type="text" ref="Menu" style={{ width: '150px'}} /></td>
                                    <td><input type="text" ref="Description"style={{ width: '150px'}} /></td>
                                    <td><input type="number" ref="Harga" style={{ width: '150px'}} /></td>
                                    <td>
                                        <select ref="Kategori" style={{ width: '150px'}}>
                                            <option value=""> -- Pilih Kategori -- </option>
                                            {this.renderOptionKategori()}
                                        </select>
                                    </td>
                                    <td><input type="button" value="Add" onClick={this.onAddClick} /></td>
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

const mapStateToProps = (state) => {
    const auth = state.auth;

    return { auth };
}
 
export default connect(mapStateToProps, {})(AdminProduct);