import React, { Component } from 'react';
 
import { withFirebase } from '../Firebase'

class SignOutButton extends Component{
    signOut = (signOutFunc) => {
        return function() {
            signOutFunc()
            localStorage.removeItem('uid')
        }
    }

    render() {
        return(
            <button type="button" onClick={this.signOut(this.props.firebase.doSignOut)}>
                Выход
            </button>
        )
    }
}
 
export default withFirebase(SignOutButton)