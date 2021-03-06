import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { withFirebase } from '../Firebase'
 
import * as ROUTES from '../../constants/routes'

const SignUpPage = () => (
    <div>
        <h1>SignUp page</h1>
        <SignUpForm/>
    </div>
)

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

class SignUpFormBase extends Component {
    constructor(props) {
        super(props)
        this.state = { ...INITIAL_STATE }
    }

    onSubmit = event => {
        const { username, email, passwordOne } = this.state
 
        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                this.setState({ ...INITIAL_STATE })
                console.log('Creating document in db for user.uid', authUser.user.uid )
                this.props.firebase.doCreateNewInstanceBasedOnAuthUid(authUser.user.uid)
                console.log({user: authUser.user.uid})
                localStorage.setItem('uid', authUser.user.uid)
                this.props.history.push(ROUTES.HOME)
            })
            .catch(error => {
                this.setState({ error });
            })
    
        event.preventDefault()
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value })
        console.log({ [event.target.name]: event.target.value }, 'state')
    }

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error
        } = this.state

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === ''

        return (
        <form onSubmit={this.onSubmit}>
            <input
                name="username"
                value={username}
                onChange={this.onChange}
                type='text'
                placeholder="Full Name"
            />

            <input
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
            />
            <input
                name="passwordOne"
                value={passwordOne}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
            />
            <input
                name="passwordTwo"
                value={passwordTwo}
                onChange={this.onChange}
                type="password"
                placeholder="Confirm Password"
            />
            <button
                disabled={isInvalid} 
                type="submit">
                    Sign Up
            </button>
            {error && <p>{error.message}</p>}
        </form>
        )
    }
}

const SignUpForm = compose(
    withRouter,
    withFirebase
)(SignUpFormBase)

const SignUpLink = () => (
    <p>
      Нет аккаунта? <Link to={ROUTES.SIGN_UP}>Зарегистрироваться</Link>
    </p>
  )

export default SignUpPage
export { SignUpForm, SignUpLink }