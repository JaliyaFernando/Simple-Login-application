// login.js

import React, { Component } from 'react';
import axios from 'axios';
import {
    getFromStorage,
    setInStorage,
} from "../utils/storage";
export default class login extends Component {

    constructor(props) {
        super(props);

        //signup form
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSignUpSubmit = this.onSignUpSubmit.bind(this);

        //loginform
        this.onChangeLoginEmail = this.onChangeLoginEmail.bind(this);
        this.onChangeLoginPassword = this.onChangeLoginPassword.bind(this);
        this.onSignInSubmit = this.onSignInSubmit.bind(this);

        this.state = {
            isLoading: false,
            token:'',
            firstName: '',
            lastName: '',
            email:'',
            password:'',
            loginEmail:'',
            loginPassword:'',
            signUpError:'',
            signInError:''
        };
    }

    componentDidMount() {
        const obj = getFromStorage('axios');
        if(obj && obj.token){
            const { token } = obj;
            axios.post('http://localhost:4000/user/verify?token='+token)
                .then(res =>  {
                    if(res.data.success){
                        this.setState({
                            token,
                            isLoading: false
                        });
                    }
                    else{
                        this.setState({
                            isLoading: false
                        });
                    }
                });
        }else{
            this.setState({
                isLoading:false,
            })
        };
    }

    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }
    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        })
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onSignUpSubmit(e) {
        /*const{
            firstName,
            lastName,
            email,
            password
        }= this.state;

        this.setState({
            isLoading:true,
        });

        fetch('http://localhost:4000/user/signup',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                firstName : firstName,
                lastName: lastName,
                email: email,
                password: password
            }),
        }).then(res => res.json())
            .then(json => {
                this.setState({
                    signUpError:json.message,
                    isLoading: false,
                });
            });
        console.log(this.state.signUpError);
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        });*/
        e.preventDefault();
        const obj = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        };

        this.setState({
            isLoading:true,
        });
        axios.post('http://localhost:4000/user/signup', obj)
            .then(res => {
                this.setState({
                    signUpError:res.data.message,
                    isLoading: false
                });
            });;

        console.log(this.state.signUpError);
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        });
    }


    onChangeLoginEmail(e) {
        this.setState({
            loginEmail: e.target.value
        })
    }
    onChangeLoginPassword(e) {
        this.setState({
            loginPassword: e.target.value
        })
    }
    onSignInSubmit(e) {
        e.preventDefault();
        const obj = {
            email: this.state.loginEmail,
            password: this.state.loginPassword
        };

        this.setState({
            isLoading:true,
        });

        axios.post('http://localhost:4000/user/signin', obj)
            .then(res => {
                if(res.data.success){
                    setInStorage('axios', { token: res.data.token});
                    this.setState({
                        signInError:res.data.message,
                        isLoading: false
                    });
                }
                else{
                    this.setState({
                        signInError:res.data.message,
                        isLoading: false
                    });
                }
            });;

        console.log(this.state.signInError);
        console.log(this.state.token);

        this.setState({
            email: '',
            password: ''
        });
    }



    render() {
        const {
            isLoading,
            token,
        } = this.state;

        /*if(isLoading){
            return(
                <div><p>Loading ......</p></div>
            )
        }*/
        if (!token) {
            return (
                <div>
                    <h3>Sign in</h3>

                    {
                        (this.state.signInError) ? (
                            <h5> {this.state.signInError} </h5>
                        ) : (null)
                    }
                    <form onSubmit={this.onSignInSubmit}>
                        <div className="form-group">
                            <label>Email : </label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.loginEmail}
                                   onChange={this.onChangeLoginEmail}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password : </label>
                            <input type="password"
                                   className="form-control"
                                   value={this.state.loginPassword}
                                   onChange={this.onChangeLoginPassword}
                            />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Login" className="btn btn-primary"/>
                        </div>
                    </form>


                    <h3>Sign up</h3>
                    {
                        (this.state.signUpError) ? (
                            <h5> {this.state.signUpError} </h5>
                        ) : (null)
                    }
                    <form onSubmit={this.onSignUpSubmit}>
                        <div className="form-group">
                            <label>First Name: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.firstName}
                                onChange={this.onChangeFirstName}
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name: </label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.lastName}
                                   onChange={this.onChangeLastName}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email : </label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.email}
                                   onChange={this.onChangeEmail}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password : </label>
                            <input type="password"
                                   className="form-control"
                                   value={this.state.password}
                                   onChange={this.onChangePassword}
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password : </label>
                            <input type="password"/>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Register Student" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
            )
        }
        return (
            <div> Account </div>
        )
    }
}