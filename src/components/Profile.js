import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import queryString from 'query-string';
import { Panel, Col } from 'react-bootstrap';
import { API_URL_1 } from '../supports/api-url';

class Profile extends Component {
    state = { userdata: [], editState: false, username: "" }

    componentWillMount() {
        let name = (queryString.parse(this.props.location.search)).username;
        axios.get(API_URL_1 + '/userdata', {
            params: {
                username: name
            }
        })
        .then((res) => {
            this.setState({ userdata: res.data, username: name });
        })
        .catch((err) => {
            alert("Error Occured");
            console.log(err);
        })
    }

    onEditClick = () => {
        this.setState({ editState: true });
    }

    onBtnCancelClick = () => {
        this.setState({ editState: false });
    }

    onBtnSaveClick = (id) => {
        axios.put(API_URL_1 + `/userdata/${id}`, {
            username: this.state.username,
            alamat: this.refs.EditAddress.value
        }).then((res) => {
            this.setState({ userdata: res.data, editState: false });
            alert('Edit Address Success!');
        }).catch((err) => {
            alert('Error Editing Address');
            console.log(err);
        })
    }
        
    renderProfile = () => {
        const list = this.state.userdata.map((item, index) => {
            const { id, username, email, password, alamat } = item;
            if(this.state.editState === false) {
                return (
                    <div key={index}>
                        <Panel bsStyle="primary">
                            <Panel.Heading>
                                <Panel.Title componentClass="h3" style={{textAlign: 'left'}}>
                                    Profile Details <span className="glyphicon glyphicon-pencil" style={{float: 'right'}} onClick={this.onEditClick} />
                                </Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>     
                                <ul style={{textAlign: 'left'}}>
                                    <Col xs={6} md={4}>
                                        <li id="profile">Username</li>
                                        <li id="profile">Email</li>
                                        <li id="profile">Password</li>
                                        <li id="profile-details">Address</li>
                                    </Col>
                                    <Col xs={6} md={8}>
                                        <div id="profile">: {username}</div>
                                        <div id="profile">: {email}</div>
                                        <div id="profile">: {password}</div>
                                        <div id="profile">: {alamat}</div>
                                    </Col>
                                </ul>
                            </Panel.Body>
                        </Panel>
                    </div>
                );
            }
            return (
                <div key={index}>
                <Panel bsStyle="primary">
                    <Panel.Heading>
                        <Panel.Title componentClass="h3" style={{textAlign: 'left'}}>
                            Profile Details <span className="glyphicon glyphicon-pencil" style={{float: 'right'}} onClick={this.onEditClick} />
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>     
                        <ul style={{textAlign: 'left'}}>
                            <Col xs={6} md={4}>
                                <li id="profile-edit">Username</li>
                                <li id="profile-edit">Email</li>
                                <li id="profile-edit">Password</li>
                                <li id="profile-edit">Address</li>
                            </Col>
                            <Col xs={6} md={8}>
                                <div id="profile">: {username}</div>
                                <div id="profile">: {email}</div>
                                <div id="profile">: {password}</div>
                                <div id="profile">: <textarea rows="5" ref="EditAddress" defaultValue={alamat} style={{ width: '500px' }} /> <br/> </div>
                            </Col>
                        </ul>
                        <input type="button" className="btn btn-success" value="Save" onClick={() => this.onBtnSaveClick(id)} />
                        <span> <input type="button" className="btn btn-default" value="Cancel" onClick={() => this.onBtnCancelClick()} /></span>
                    </Panel.Body>
                </Panel>
            </div>
            )
        })
        return list;
    }

    render() { 
        return (
            <div style={{paddingTop: "50px", paddingBottom: '250px'}} className="container">
                <div className="row">
                <div className="col-xs-12">
                <div className="box">
                    <div className="box-header">
                        <h1 className="box-title">Your Profile</h1>
                    </div>
                    <div className="box-body">
                        <div>{this.renderProfile()}</div>
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
 
export default connect(mapStateToProps, {})(Profile);