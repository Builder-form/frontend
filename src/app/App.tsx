import React from 'react';
import { AppRoutes } from './AppRoutes';
import { Helmet } from 'react-helmet';
import { App } from 'antd';
import '../index.css'

export function MyApp() {
  return (
    <App className=''>
      <Helmet title={'Builder form'}>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta
          name="description"
          content="Make your own project right now!"
        />
      </Helmet>
      <AppRoutes />
    </App>
  );
}