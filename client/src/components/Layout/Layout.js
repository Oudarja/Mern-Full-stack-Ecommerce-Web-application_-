import React from 'react'
import Header from './Header'
import Footer from './footer'
// Layout component using react-helmet is quite
// SEO-friendly, as it dynamically sets meta tags
// and the page title. 
import {Helmet} from "react-helmet"

import {Toaster} from 'react-hot-toast';



const Layout = ({ children ,title,description,keywords,author}) => 
{
  return (
    <div>

<Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
    </Helmet>
      <Header/>
       <main style={{minHeight:'76vh'}}>
       <Toaster/>
       {children}
       </main>
       <Footer/>
    </div>
  )
}
// Default props ensure that even if specific metadata
//  isn’t passed, the page still has meaningful SEO tags.
Layout.defaultProps={

  title: 'Ecommerece app',
  description: 'mern stack project',
  keywords:'mern,react,node,mongodb',
  author:'Oudarja Barman Tanmoy'
}

export default Layout
