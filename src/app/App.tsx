import React from 'react';
import { AppRoutes } from './AppRoutes';
import { Helmet } from 'react-helmet';
import { App } from 'antd';
import '../index.css'

export function MyApp() {
  return (
    <App className=''>
      <Helmet title={'Личный Кабинет Gracey'}>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta
          name="description"
          content="Закажи сиделку в один клик"
        />
      </Helmet>
      <AppRoutes />
    </App>
  );
}