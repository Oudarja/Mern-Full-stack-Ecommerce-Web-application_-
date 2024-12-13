import React from 'react'
import Layout from '../../components/Layout/Layout.js'
import { useAuth } from '../../context/auth.js'
import UserMenu from '../../components/Layout/UserMenu.js';

const Dashboard = () => {

  const[auth]=useAuth();


  return (
 <Layout title={"User Dashboard-Ecommerce App"}>

<div className="container-fluid m-3 p-3">

<div className="row">

 <div className="col-md-3">
        <UserMenu/>
 </div>

{/* Takes 9 out of 12 columns (75% width) when the screen
size is medium or larger. */}
 <div className="col-md-9">
       <div className="card w-75 p-3">

       <h3>User Name: {auth?.user?.name}</h3>
       <h3>User Email: {auth?.user?.email}</h3>
       <h3>User Contact: {auth?.user?.address}</h3>
       </div>
 </div>
</div>


</div>
 </Layout>

  )
}

export default Dashboard
