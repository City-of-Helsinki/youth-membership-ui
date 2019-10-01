import React from 'react';
import {RouteProps} from 'react-router';

import Header from '../common/header/Header';

type Props = RouteProps & {

};


function Home(props: Props) {
  return (
    <Header/>
  );
}

export default Home;
