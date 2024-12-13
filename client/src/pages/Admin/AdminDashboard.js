import React from 'react'
import Layout from './../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';

import { useAuth } from '../../context/auth';

const Admindashboard = () => {
  
  const [auth] = useAuth();

  return (
    <Layout title={"Admin dashboard"}>
    {/* m-3: Adds margin of 3 units (Bootstrap's spacing scale) on all
     sides: top, right, bottom, and left. 
     p-3: Adds padding of 3 units on all sides: top, right, bottom, and
     left. 
     */}
     <div className="container-fluid m-3 p-3">

     <div className="row">

      <div className="col-md-3">
             <AdminMenu/>
      </div>

  {/* Takes 9 out of 12 columns (75% width) when the screen
   size is medium or larger. */}
      <div className="col-md-9">
            <div className="card w-75 p-3">

            <h3>Admin Name: {auth?.user?.name}</h3>
            <h3>Admin Email: {auth?.user?.email}</h3>
            <h3>Admin Contact: {auth?.user?.phone}</h3>
            </div>
      </div>
     </div>
     
     
     </div>
    </Layout>
  )
}

export default Admindashboard
