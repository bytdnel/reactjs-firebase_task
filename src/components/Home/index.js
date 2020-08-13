import React from 'react';
 
import { withAuthorization } from '../Session';
 
const HomePage = () => (
  <div>
    <h1>Домашняя страница</h1>
    <p>Тут что-то типа дашборда</p>
  </div>
);
 
const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(HomePage)