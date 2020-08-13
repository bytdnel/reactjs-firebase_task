import React from 'react'
import { Link } from 'react-router-dom'
import SignOutButton from '../SignOut'
import * as ROUTES from '../../constants/routes'
import { AuthUserContext } from '../Session'

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => authUser ? <NavigationAuth /> : <NavigationNonAuth />}
    </AuthUserContext.Consumer>
    
  </div>
)

const NavigationAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing / Главная</Link>
    </li>
    <li>
      <Link to={ROUTES.HOME}>Home / Домашняя страница | dashboard |</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>Account / Аккаунт</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
)

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing / Главная</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Вход</Link>
    </li>
  </ul>
)
 
export default Navigation