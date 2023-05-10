import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import { base_url } from '../../Config';


  export default class LoginOwner extends React.Component {
        constructor(){
            super()
            this.state = {
                username: "",
                password: "",
                massage: "",
                logged: true
            }
        }
        Login = event => {
            event.preventDefault()
            let sendData = {
                username: this.state.username ,
                password: this.state.password
            }

            let url = base_url + "user/auth"

            axios.post(url, sendData)
            .then(response => {
                this.setState({logged: response.data.logged})
                if (this.state.logged){
                    let user = response.data.data
                    let token = response.data.token
                    localStorage.setItem("user", JSON.stringify(user))
                    localStorage.setItem("token", token)
                    this.props.history.push("/owner/dashboard")
                }else{
                    this.setState({massage: response.data.massage})
                }
            })
            .catch(error => console.log(error))
        }


    render() {
        return (
            <div className="container">
            {/* <!-- Outer Row --> */}
            <div className="row justify-content-center login">

              <div className="col-lg-6">

                <div className="card o-hidden border-0 shadow-lg my-5">
                  <div className="card-body p-0">
                    {/* <!-- Nested Row within Card Body --> */}
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="p-5">
                          <div className="text-center">
                            <h1 className="h4 text-gray-900 mb-4">Login Owner</h1>
                          </div>
                          <form onSubmit={ev => this.Login(ev)} className="user">
                            <div className="form-group">
                              <input type="text" className="form-control form-control-user" value={this.state.username}
                              onChange={ev => this.setState({username: ev.target.value})} placeholder="Username"/>
                            </div>
                            <div className="form-group">
                              <input type="password" className="form-control form-control-user" value={this.state.password}
                              onChange={ev => this.setState({password: ev.target.value})}
                              autoComplete="false" placeholder="Password"/>
                            </div>
                            { !this.state.logged ?
                            (
                                <div className="alert alert-danger mt-1 text-center">
                                    Your username or password is not registered{ this.state.message }
                                </div>
                            ) : null }
                            <button  type="submit" className="btn btn-primary btn-user btn-block">
                              Login
                            </button>
                            <hr />
                            <center>
                            <div class="btn-group" role="group" aria-label="Basic example">
                              <a class="btn btn-outline-success" href="/"> Login Admin </a>
                              <a class="btn btn-outline-danger" href="/kasir"> Login Kasir </a>
                              <a class="btn btn-outline-warning active"> Login Owner </a>
                            </div>
                            </center>
                          </form>
                          <hr/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )
    }
}
