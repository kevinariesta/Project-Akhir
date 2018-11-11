import React, { Component } from 'react';
import { Media } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { API_URL_1 } from '../supports/api-url';

class MenuDetails extends Component {
    state = { menu: [], count: 1 };

    componentWillMount() {
        let idMenu = queryString.parse(this.props.location.search);
        axios.get(API_URL_1 + '/getMenuDetails', {
            params: {
                id: idMenu.id
            }
        }).then((res) => {
            this.setState({ menu: res.data })
            console.log('Get Details Success!!');
            // console.log(res.data);
        }).catch((err) => {
            alert('Error Get Specific Menu!!');
            console.log(err);
        });
    }

    onIncrementClick = () => {
        this.setState({ count: this.state.count +1 })
    }

    onDecrementClick = () => {
        this.setState({ count: this.state.count -1 })
        if(this.state.count < 2) {
            this.setState({ count: 1 })
        }
    }

    onCartSubmit = () => {
        const { idmenu, menu, harga, images } = this.state.menu[0];
        const { username } = this.props.auth;
        const { count } = this.state;
        axios.post(API_URL_1 + '/cart', {
            username: username,
            idmenu: idmenu,
            menu: menu,
            jumlah: count,
            harga: harga,
            images: images
        }).then((res) => {
            alert('Add To Cart Success!!');
            console.log(res.data);
        }).catch((err) => {
            alert('Cart Error!!');
            console.log(err);
        })
    }

    renderMenuDetails = () => {
        const details = this.state.menu.map((item, index) => {
            const { images, menu, description, harga } = item;
            return (
                <Media style={{ marginLeft: '50px' }} key={index}>
                    <Media.Left>
                        <img src={require('D:/JOB CONNECTOR PURWADHIKA/PROJECT AKHIR/express_API_Project/images/' + images)} alt="Gambar Menu" width={600} height={400} />
                    </Media.Left>
                    <Media.Body style={{ verticalAlign: 'middle' }}>
                        <Media.Heading><h1>{menu}</h1></Media.Heading>
                        <p>{description}</p>
                        <h3>HARGA: Rp. {(harga).toLocaleString('id')},-</h3>
                        <span>
                            <input type="button" className="btn btn-success" value="-" style={{ borderRadius: '10px 0 0 10px', width: '33px'}} onClick={this.onDecrementClick} />
                            <input type="text" value={this.state.count} style={{maxWidth: '30px', height: '33px', paddingTop: 0, textAlign: 'center' }} />
                            <input type="button" className="btn btn-success" value="+" style={{ borderRadius: '0 10px 10px 0', marginRight: '10px'}} onClick={this.onIncrementClick} />
                            <input type="button" className="btn btn-primary" value="TAMBAH KE CART" onClick={this.onCartSubmit} />
                        </span>
                    </Media.Body>
                </Media>
            );
        })
        return details;
    }

    render() { 
        return (
            <div style={{ paddingTop: '50px' }}>
                <h1>Menu Details</h1>
                {this.renderMenuDetails()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;

    return { auth };
}
 
export default connect(mapStateToProps, {})(MenuDetails);