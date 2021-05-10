import { useState, useEffect, Component } from 'react';

import Head from 'next/head'
import Link from 'next/link'

import { useRouter } from 'next/router'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

import axios from 'axios'

import AdminLayout from 'components/layouts/admin.js';
import ConfirmDelete from 'components/ConfirmDelete';
import AdminViewUserModal from 'components/admin/AdminViewUserModal';
function AdminUsersPage() {
    const router = useRouter()
    const { param } = router.query
    const [ users, setUsers ] = useState([])

    const [ zips, setZips ] = useState({
        None: 0
    })
    const [ zipsToTown, setZipsToTown ] = useState({})

    const [ outsetComplete, setOutsetComplete ] = useState(0)

    // console.log(router.pathname)
    // console.log(param);

    function checkZipName(zip) {

        // Old way, MongoDB now has collection of every US Zip code
        // const directory = {
        //   12508: "Beacon",
        //   12524: 'Fishkill',
        //   12533: "Hopewell Junction",
        //   12561: "New Paltz"
        // }
    
        if ( Object.keys(zipsToTown).indexOf(zip) > -1 ) {
    
            return(  Object.values(zipsToTown)[Object.keys(zipsToTown).indexOf(zip)].city )
    
        } else {
    
            return( zip )
          
        }
    }

    useEffect(() => {

        axios.get('/api/admin/users')
        .then(function (response) {
            
            console.log(response.data)
            setUsers(response.data.users)

        })
        .catch(function (error) {
            console.log(error);
        });

	}, []);

    useEffect(() => {

        for (var i=0; i < users.length; i++) {

            console.log(users[i])

            if (users[i].outset === true ) {
                // setOutsetComplete( outsetComplete + 1 )
                setOutsetComplete( prevTotal => prevTotal + 1 )
            }

            const currentUserZip = users[i].address.zip

            if (currentUserZip === undefined || currentUserZip === null || currentUserZip === "") {

                setZips({
                    ...zips,
                    None: zips.None + 1
                })

                // self.setState({
                //   zips: {
                //     ...self.state.zips,
                //     None: self.state.zips.None + 1
                //   }
                // })
      
            } else {

                console.log("Logging")
                console.log(users[i].address.zip)
                let currentZip = users[i].address.zip;
                
                if ( !isNaN(zips[currentUserZip]) ) {
                    // console.log("Add One")

                    // setZips( prevZips => ({
                    //     ...prevZips,
                    //     [currentZip]: (prevZips[currentUserZip] + 1)
                    // }) )

                } else {
                    // console.log("Set One")

                    setZips( prevZips => ({
                        ...prevZips,
                        [currentZip]: 1
                    }) )
                }
      
            }

        }

        setTimeout( calculateThings, 2000 )

	}, [users]);

    function calculateThings() {
        if ( users.length > 0 ) {
            axios.post('/api/admin/zipsToTowns', {
                zips: zips,
                format: 'tally'
            })
            .then((response) => {
                console.log(response.data)
    
                setZipsToTown(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

    // useEffect(() => {

    //     if ( users.length > 0 ) {
    //         axios.post('/api/admin/zipsToTowns', {
    //             zips: zips,
    //             format: 'tally'
    //         })
    //         .then((response) => {
    //             console.log(response.data)
    
    //             setZipsToTown(response.data)
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    //     }

	// }, [users]);
  
    return(
        <section className="admin-page admin-users">

            <Head>
                <title>Admin Users - Articles</title>
            </Head> 

            <div className="side-panel">

                <div className="card mb-3">
                    <div className="card-header">Outset {outsetComplete}</div>

                    <div className="card-body">
                        <div>Outset Complete: {(Math.floor((outsetComplete / users.length) * 100))}%</div>
                    </div>
                </div>

                <div className="card mb-3">
                    <div className="card-header">Geographical Data</div>

                    <div className="card-body">
                        {
                            Object.entries(zips).map(([key, val]) => 
                                <div key={key}>{checkZipName(key)}: {val}</div>
                            )
                        }
                    </div>
                </div>

                <div className="card mb-3">
                    <div className="card-header">Gender Data</div>

                    <div className="card-body">
                        {/* <div>Outset Complete: 0%</div> */}
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">Political Data</div>

                    <div className="card-body">
                        {/* <div>Outset Complete: 0%</div> */}
                    </div>
                </div>

            </div>

            <div className="main-panel">
                
                <div className="card manage-card">

                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-sm mb-0">
                            <thead className="thead-dark">
                                <tr>
                                {/* <th scope="col">User ID</th> */}
                                <th scope="col">Name</th>
                                <th scope="col">Stripe</th>
                                <th scope="col">Membership</th>
                                <th scope="col">State</th>
                                <th scope="col">Party</th>
                                <th scope="col">Outset</th>
                                <th scope="col">Admin</th>
                                <th scope="col">Dev</th>
                                <th scope="col">Writer</th>
                                <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                
                                {users.map(user => (
                
                                <tr key={user._id}>
                
                                    {/* <th scope="row">{user._id}</th> */}
                                    {/* <td>{`${user.first_name} ${user.last_name}`}</td> */}
                
                                    <td className="">
                                    <img alt="" className="profile-photo" style={{borderRadius: '100px'}} width="100%" height="100%" src={`https://articles-website.s3.amazonaws.com/profile_photos/${user._id}.jpg` || ''}/>
                                    <AdminViewUserModal user_id={user._id} name={`${user.first_name} ${user.last_name}`} buttonType={'badge'} />
                                    {/* <span style={{width: '150px', display: 'inline-block'}}>{user.first_name} {user.last_name}</span> <span className="badge badge-light">{user._id}</span> */}
                                    </td>
                
                                    {/* <td>{user.stripe?.customer_id === undefined ? <span>No<span onClick={() => this.createCustomer(user._id)} className="btn btn-sm btn-articles-light">Create</span></span> : 'Yes'}</td> */}
                                    <td>
                
                                        {/* Production Customer ID */}
                                        {user.stripe?.customer_id ? 
                
                                        <OverlayTrigger
                                            key={'customer_id'}
                                            placement={'bottom'}
                                            overlay={
                                            <Tooltip id={`tooltip-${'bottom'}`}>
                                                <i className="far fa-clipboard"></i>{user.stripe?.customer_id}
                                            </Tooltip>
                                            }
                                        >
                                            <div style={{cursor: 'pointer'}} onClick={() => {navigator.clipboard.writeText(user.stripe?.customer_id)}} className="badge badge-primary mr-1">Prod</div>
                                        </OverlayTrigger>
                
                                        :
                
                                        <div style={{cursor: 'pointer'}} onClick={() => this.createCustomer(user._id)} className="badge badge-success">Add Customer</div>
                
                                        }
                
                                        {/* Development Customer ID */}
                                        {user.stripe?.customer_test_id && 
                
                                        <OverlayTrigger
                                            key={'customer_test_id'}
                                            placement={'bottom'}
                                            overlay={
                                            <Tooltip id={`tooltip-${'bottom'}`}>
                                                <i className="far fa-clipboard"></i>{user.stripe?.customer_test_id}
                                            </Tooltip>
                                            }
                                        >
                                            <div style={{cursor: 'pointer'}} onClick={() => {navigator.clipboard.writeText(user.stripe?.customer_test_id)}} className="badge badge-warning">Dev</div>
                                        </OverlayTrigger>
                
                                        }
                
                                    </td>
                
                                    <td>
                                    <span className="badge badge-danger">No</span>
                                    <span onClick={() => this.createCustomer(user._id, user.email)} className="badge badge-dark ml-2">Edit</span>
                                    </td>
                
                                    <td>{user.address.state}</td>
                                    <td>{user.political?.party || 'None'}</td>
                                    <td>{user.outset === true ? 'True' : 'False'}</td>
                                    <td>{user.roles?.isAdmin === true ? <div onClick={() => this.toggleRole(user._id, 'isAdmin', false )} className="badge badge-danger">True</div> : <div onClick={() => this.toggleRole(user._id, 'isAdmin', true )} className="badge badge-success">False</div>}</td>
                                    <td>{user.roles?.isDev === true ? <div onClick={() => this.toggleRole(user._id, 'isDev', false )} className="badge badge-danger">True</div> : <div onClick={() => this.toggleRole(user._id, 'isDev', true )} className="badge badge-success">False</div>}</td>
                                    <td>{user.roles?.isWriter === true ? <div onClick={() => this.toggleRole(user._id, 'isWriter', false )} className="badge badge-danger">True</div> : <div onClick={() => this.toggleRole(user._id, 'isWriter', true )} className="badge badge-success">False</div>}</td>
                                    <td><ConfirmDelete afterConfirm={() => this.removeUser(user._id)}></ConfirmDelete></td>
                                </tr>
                                
                                ))}
                
                            </tbody>
                            </table>
                        </div>
                    </div>

                </div>


            </div>



        </section>
    )
}

AdminUsersPage.Layout = AdminLayout;
export default AdminUsersPage;