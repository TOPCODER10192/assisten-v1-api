import React from 'react';
import 'antd/dist/antd.css';

function AssistenApp({ Component, pageProps, router }) {
  return <Component {...pageProps} key={router.route} />
}

export default AssistenApp
