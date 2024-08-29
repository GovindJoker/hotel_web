import React from 'react'
import { Link } from 'react-router-dom'

const Signin = () => {
    let height = window.innerHeight
    return (

        <div class="d-lg-flex half" style={{ height: '640px' }}>
            <div class="bg order-1 order-md-2" style={{ "background-image": "url('assets/images/slider_2.jpg')" }}></div>
            <div class="contents order-2 order-md-1">

                <div class="container">
                    <div class="row align-items-center justify-content-center">
                        <div class="col-md-7">
                            <div class="mb-4">
                                <h3>Sign In</h3>
                                <p class="mb-4">Lorem ipsum dolor sit amet elit. Sapiente sit aut eos consectetur adipisicing.</p>
                            </div>
                            <form action="#" method="post">
                                <div class="form-group first">
                                    {/* <label for="username">Username</label> */}
                                    <input type="text" class="form-control" placeholder='Email/Phone' id="username" />

                                </div>
                                <div class="form-group last mb-3">
                                    {/* <label for="password">Password</label> */}
                                    <input type="password" class="form-control" placeholder='Password' id="password" />

                                </div>

                                <div class="d-flex mb-5 align-items-center">
                                    <Link to={'/sign-up'} >Sign Up</Link>
                                    <span class="ml-auto"><a href="#" class="forgot-pass">Forgot Password</a></span>
                                </div>

                                <input type="submit" value="Log In" class="btn btn-block btn-primary" />

                                {/* <span class="d-block text-center my-4 text-muted">&mdash; or &mdash;</span> */}

                                {/* <div class="social-login">
              <a href="#" class="facebook btn d-flex justify-content-center align-items-center">
                <span class="icon-facebook mr-3"></span> Login with Facebook
              </a>
              <a href="#" class="twitter btn d-flex justify-content-center align-items-center">
                <span class="icon-twitter mr-3"></span> Login with  Twitter
              </a>
              <a href="#" class="google btn d-flex justify-content-center align-items-center">
                <span class="icon-google mr-3"></span> Login with  Google
              </a>
            </div> */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </div>

    )
}

export default Signin