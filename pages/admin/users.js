import { useState, useEffect, Component } from 'react';

import Head from 'next/head'
import Link from 'next/link'

import { useRouter } from 'next/router'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { DateTimePicker } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";

import axios from 'axios'

import AdminLayout from 'components/layouts/admin.js';
import ConfirmDelete from 'components/ConfirmDelete';
import AdminViewUserModal from 'components/admin/AdminViewUserModal';
import articlesTheme from 'components/material_ui/articlesTheme'
import ROUTES from 'components/constants/routes'
function AdminUsersPage() {
    const router = useRouter()
    const { param } = router.query

    const [ users, setUsers ] = useState([])
    const [ user, setUser ] = useState({})

    const [ zips, setZips ] = useState({
        None: 0
    })
    const [ zipsToTown, setZipsToTown ] = useState({})

    const [ outsetComplete, setOutsetComplete ] = useState(0)

    const [ genderTotals, setGenderTotals ] = useState(0)

    const [ partyTotals, setPartyTotals ] = useState({})

    const [searchFilter, setSearchFilter] = useState('')

    const [modalShow, setModalShow] = useState(false);

    const [selectedDate, handleDateChange] = useState(new Date());

    function checkZipName(zip) {

        // console.log(zip)
    
        if ( Object.keys(zipsToTown).indexOf(zip) > -1 ) {
    
            return(  Object.values(zipsToTown)[Object.keys(zipsToTown).indexOf(zip)].city )
    
        } else {
    
            return( zip )
          
        }
    }

    useEffect( () => {

        axios.get('/api/admin/users')
        .then(function (response) {
            
            console.log(response.data)
            setUsers(response.data.users)
            // console.log(users)

        })
        .catch(function (error) {
            console.log(error);
        });

	}, [] );

    useEffect(() => {

        if ( Array.isArray(users) && users.length ) {
            // console.log("Users Updated")
            // console.log(users)

            // Geographical Related
            var zipsToGet = users.map(user => user.address?.zip)
            var zipTotals = {
                None: 0
            }
            zipsToGet.map(zip => {

                if ( zipTotals[zip] ) {
                    // console.log("Add")
                    zipTotals[zip] = zipTotals[zip] + 1
                } else {
                    // console.log("Set")
                    zipTotals[zip] = 1
                }

            }) 
            setZips(zipTotals)
            calculateThings(zipTotals)

            // Outset Related
            var outsetTotal = 0;
            users.map(user => {

                if (user.outset === true) {
                    outsetTotal++
                }

            })
            setOutsetComplete(outsetTotal)

            // Gender Related
            var genderTotal = {
                male: 0,
                female: 0,
                other: 0
            };
            users.map(user => {

                if (user.gender == 'male') {
                    genderTotal.male++
                } else if (user.gender == 'female') {
                    genderTotal.female++
                } else {
                    genderTotal.other++
                }

            })
            setGenderTotals(genderTotal)

            // Party Related
            var partyTotal = {
                articles: 0,
                democrat: 0,
                republican: 0,
                independent: 0,
                green: 0,
                libertarian: 0,
                constitution: 0,
                reform: 0,
                'legal-marijuana-now': 0,
                'socialist-equality': 0,
                justice: 0,
                other: 0
            };
            users.map(user => {

                switch(user.political?.party) {
                    case 'articles':
                        partyTotal.articles++
                        break;
                    case 'democrat':
                        partyTotal.democrat++
                        break;
                    case 'republican':
                        partyTotal.republican++
                        break;
                    case 'independent':
                        partyTotal.independent++
                        break;
                    case 'green':
                        partyTotal.green++
                        break;
                    case 'libertarian':
                        partyTotal.libertarian++
                        break;
                    case 'constitution':
                        partyTotal.constitution++
                        break;
                    case 'reform':
                        partyTotal.reform++
                        break;
                    case 'legal-marijuana-now':
                        partyTotal.legal-marijuana-now++
                        break;
                    case 'socialist-equality':
                        partyTotal.socialist-equality++
                        break;
                    case 'justice':
                        partyTotal.justice++
                        break;
                    default:
                        partyTotal.other++
                }

            })
            setPartyTotals(partyTotal)
        }

	}, [users]);

    const handleUserChange = e => {
		const { name, value } = e.target;

		setUser(prevState => ({
			...prevState,
			[name]: value
		}));
	};

    function calculateThings(zipTotals) {

        console.log("Zip to towns called (calculateThings)")

        axios.post('/api/admin/zipsToTowns', {
            zips: zipTotals,
            format: 'tally'
        })
        .then((response) => {
            setZipsToTown(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });

    }

    const editUser = (id) => {
		// console.log(`Edit user called ${id}`);

        axios.post('/api/admin/user', {
            user_id: id,
        })
        .then((response) => {
            setUser(response.data.user)
            setModalShow(true);
        })
        .catch(function (error) {
            console.log(error);
            setModalShow(false);
            setUser({})
        });
	}

    const handleClose = () => {
        setModalShow(false); 
    }

    function removeUser(id) {
        console.log( `Remove user of id ${id} called, Please do this in mongoDB Compass for now.` )
    }

    function returnGenderBadge(gender) {
        if (user.gender == 'male') {
            return <span className="badge badge-articles mx-1">Male</span>
        } else if (user.gender == 'female') {
            return <span className="badge badge-articles mx-1">Female</span>
        } else {
            return <span className="badge badge-articles mx-1">Other</span>
        }
    }
  
    return(
        <section className="admin-page admin-users">

            <Head>
                <title>Admin Users - Articles</title>
            </Head>

            <Modal show={modalShow} className="user-modal articles-modal" centered onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>User Info</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <div className="user-form">

                        <h3 className="text-center">{user.email}</h3>
                        <p className="text-center mb-1">{user._id}</p>

                        <div className="mb-3 d-flex justify-content-center">

                            {user.outset ?
                                <div className="badge badge-articles mx-1">
                                    Outset Complete
                                </div>
                                :
                                <div className="badge badge-danger mx-1">
                                    Outset Not Complete
                                </div>
                            }

                            {returnGenderBadge(user.gender)}

                        </div>

                        <div className="row mb-3">

                            <div className="col-lg-6">
                                <ThemeProvider theme={articlesTheme}>
                                    <MuiPickersUtilsProvider utils={MomentUtils}>
                                        <DateTimePicker
                                            label="Birth Date"
                                            inputVariant="outlined"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            className="form-group articles mb-3 w-100"
                                        />
                                    </MuiPickersUtilsProvider>
                                </ThemeProvider>
                            </div>

                            <div className="col-lg-6">
                                <ThemeProvider theme={articlesTheme}>
                                    <MuiPickersUtilsProvider utils={MomentUtils}>
                                        <DateTimePicker
                                            label="Sign Up Date"
                                            inputVariant="outlined"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            className="form-group articles mb-3 w-100"
                                        />
                                    </MuiPickersUtilsProvider>
                                </ThemeProvider>
                            </div>

                            <div className="col-lg-6">

                                <div className="form-group articles">
                                    <label className="d-flex justify-content-between" for="address">
                                        <span>First Name</span>
                                        {/* <span>${ numberWithCommas( (donation.amount / 100).toFixed(2) ) }</span> */}
                                    </label>
                                    <input 
                                        className="form-control with-label"
                                        onChange={handleUserChange}
                                        name="first_name"
                                        id="first_name" 
                                        type="text" 
                                        autoComplete='off'
                                        value={user.first_name}
                                    />
                                </div>

                            </div>

                            <div className="col-lg-6">

                                <div className="form-group articles">
                                    <label className="d-flex justify-content-between" for="address">
                                        <span>Last Name</span>
                                        {/* <span>${ numberWithCommas( (donation.amount / 100).toFixed(2) ) }</span> */}
                                    </label>
                                    <input 
                                        className="form-control with-label"
                                        onChange={handleUserChange}
                                        name="last_name"
                                        id="last_name" 
                                        type="text" 
                                        autoComplete='off'
                                        value={user.last_name}
                                    />
                                </div>

                            </div>

                        </div>

                        <div className="mb-3">

                            <h3>Address Details</h3>

                            <div className="row">
    
                                <div className="col-lg-6">
    
                                    <div className="form-group articles">
                                        <label className="d-flex justify-content-between" for="lineOne">
                                            <span>Address Line One</span>
                                            {/* <span>${ numberWithCommas( (donation.amount / 100).toFixed(2) ) }</span> */}
                                        </label>
                                        <input 
                                            className="form-control with-label"
                                            onChange={handleUserChange}
                                            name="lineOne"
                                            id="lineOne" 
                                            type="text" 
                                            autoComplete='off'
                                            value={user.address?.lineOne}
                                        />
                                    </div>
    
                                </div>

                                <div className="col-lg-6">
    
                                    <div className="form-group articles">
                                        <label className="d-flex justify-content-between" for="lineTwo">
                                            <span>Address Line Two</span>
                                            {/* <span>${ numberWithCommas( (donation.amount / 100).toFixed(2) ) }</span> */}
                                        </label>
                                        <input 
                                            className="form-control with-label"
                                            onChange={handleUserChange}
                                            name="lineTwo"
                                            id="lineTwo" 
                                            type="text" 
                                            autoComplete='off'
                                            value={user.address?.lineTwo}
                                        />
                                    </div>
    
                                </div>
    
                                <div className="col-lg-6">
    
                                    <div className="form-group articles">
                                        <label className="d-flex justify-content-between" for="city">
                                            <span>City</span>
                                            {/* <span>${ numberWithCommas( (donation.amount / 100).toFixed(2) ) }</span> */}
                                        </label>
                                        <input 
                                            className="form-control with-label"
                                            onChange={handleUserChange}
                                            name="city"
                                            id="city" 
                                            type="text" 
                                            autoComplete='off'
                                            value={user.address?.city}
                                        />
                                    </div>
    
                                </div>

                                <div className="col-lg-6">
    
                                    <div className="form-group articles">
                                        <label className="d-flex justify-content-between" for="state">
                                            <span>State</span>
                                            {/* <span>${ numberWithCommas( (donation.amount / 100).toFixed(2) ) }</span> */}
                                        </label>
                                        <input 
                                            className="form-control with-label"
                                            onChange={handleUserChange}
                                            name="state"
                                            id="state" 
                                            type="text" 
                                            autoComplete='off'
                                            value={user.address?.state}
                                        />
                                    </div>
    
                                </div>

                                <div className="col-lg-6">
    
                                    <div className="form-group articles">
                                        <label className="d-flex justify-content-between" for="zip">
                                            <span>Zip</span>
                                            {/* <span>${ numberWithCommas( (donation.amount / 100).toFixed(2) ) }</span> */}
                                        </label>
                                        <input 
                                            className="form-control with-label"
                                            onChange={handleUserChange}
                                            name="zip"
                                            id="zip" 
                                            type="text" 
                                            autoComplete='off'
                                            value={user.address?.zip}
                                        />
                                    </div>
    
                                </div>
    
                            </div>
                        </div>
                        
                        <div className="card d-flex mb-3">

                            <div className="card-header d-flex flex-row justify-content-between align-items-center">
                                <h5 className="mb-0">Is Employee</h5>
    
                                <label className="articles-switch mb-0" onClick={ () => null }>
                                    <input type="checkbox" checked={ user.employee?.bool }/>
                                    <span className="slider" onClick={ () => null }></span>
                                </label>
                            </div>

                            {user.employee?.bool &&
                            <div className="card-body">
                                <div className="row">

                                    <div className="col-lg-12">
                                        <div className="card p-3 d-flex flex-row justify-content-between align-items-center mb-3">
                                            <h5 className="mb-0">Privacy Mode</h5>
                
                                            <label className="articles-switch mb-0" onClick={ () => null }>
                                                <input type="checkbox" checked={ user.employee?.privacy }/>
                                                <span className="slider" onClick={ () => null }></span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group articles">
                                            <label for="address">Bio</label>
                                            <textarea className="form-control with-label" rows="5" onChange={handleUserChange} name="message" id="message" type="text">
                                                {user.employee?.bio}
                                            </textarea>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group articles">
                                            <label for="address">Quote</label>
                                            <textarea className="form-control with-label" rows="5" onChange={handleUserChange} name="message" id="message" type="text">
                                                {user.employee?.quote}
                                            </textarea>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 d-none">
        
                                        <div className="form-group articles">
                                            <label className="d-flex justify-content-between" for="state">
                                                <span>Instagram</span>
                                                {/* <span>${ numberWithCommas( (donation.amount / 100).toFixed(2) ) }</span> */}
                                            </label>
                                            <input 
                                                className="form-control with-label"
                                                onChange={handleUserChange}
                                                name="state"
                                                id="state" 
                                                type="text" 
                                                autoComplete='off'
                                                value={user.address?.state}
                                            />
                                        </div>
        
                                    </div>

                                    <div className="col-lg-6 d-none">
        
                                        <div className="form-group articles">
                                            <label className="d-flex justify-content-between" for="state">
                                                <span>Facebook</span>
                                                {/* <span>${ numberWithCommas( (donation.amount / 100).toFixed(2) ) }</span> */}
                                            </label>
                                            <input 
                                                className="form-control with-label"
                                                onChange={handleUserChange}
                                                name="state"
                                                id="state" 
                                                type="text" 
                                                autoComplete='off'
                                                value={user.address?.state}
                                            />
                                        </div>
        
                                    </div>

                                    <div className="col-lg-6 d-none">
        
                                        <div className="form-group articles">
                                            <label className="d-flex justify-content-between" for="state">
                                                <span>Instagram</span>
                                                {/* <span>${ numberWithCommas( (donation.amount / 100).toFixed(2) ) }</span> */}
                                            </label>
                                            <input 
                                                className="form-control with-label"
                                                onChange={handleUserChange}
                                                name="state"
                                                id="state" 
                                                type="text" 
                                                autoComplete='off'
                                                value={user.address?.state}
                                            />
                                        </div>
        
                                    </div>
                                    
                                </div>
                            </div>
                            }

                        </div>

                        <div className="card p-3 d-flex flex-row justify-content-between align-items-center mb-3">

                            <h5 className="mb-0">Ban Commenting</h5>

                            <label className="articles-switch mb-0" onClick={ () => null }>
                                <input type="checkbox" checked={ false }/>
                                <span className="slider" onClick={ () => null }></span>
                            </label>

                        </div>

                        <div className="card p-3 d-flex flex-row justify-content-between align-items-center mb-3">

                            <h5 className="mb-0">Ban Photo Uploads</h5>

                            <div className="d-flex justify-content-md-center align-items-center">

                                <button className="btn btn-danger btn-sm mr-3">Remove</button>

                                <label className="articles-switch mb-0" onClick={ () => null }>
                                    <input type="checkbox" checked={ false }/>
                                    <span className="slider" onClick={ () => null }></span>
                                </label>

                            </div>

                        </div>

                    </div>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>

            </Modal>

            <div className="side-panel">

                <div className="card mb-3">

                    <div className="card-header d-flex justify-content-between">
                        <span>Outset</span>
                        <span>{outsetComplete}/{users.length} Users</span>
                    </div>

                    <div className="card-body">
                        <div>Outset Complete: {outsetComplete} | {(Math.floor((outsetComplete / users.length) * 100))}%</div>
                        <div>Not Complete (1 Week): 0 | 0%</div>
                        <div>Not Complete (1 Month): 0 | 0%</div>
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
                        <div>Female: {genderTotals.female}</div>
                        <div>Male: {genderTotals.male}</div>
                        <div>Other: {genderTotals.other}</div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">Political Data</div>

                    <div className="card-body">

                        {Object.entries(partyTotals).map(([key, val]) => 
                                <div key={key}>{key}: {val}</div>
                        )}

                    </div>
                </div>

            </div>

            <div className="main-panel">
                
                <div className="card manage-card">

                    <div className="card-header flex-column flex-lg-row justify-content-sm-between">

                        <div className="d-flex align-items-center justify-content-between mb-1 mb-lg-0 flex-fill flex-lg-grow-0">
                            <i className="fas fa-edit fa-2x"></i>

                            <h3 className="mb-0">Users</h3>
                            <div className="total">({users.length})</div>
                        </div>

                        <div className={'d-flex align-items-center justify-content-between mb-1 mb-lg-0'}>

                            <div className="form-group articles flex-shrink-0 mr-3 mb-0">
                                <label for="searchFilter">Search Names</label>
                                <input 
                                    className="form-control with-label" 
                                    onChange={ e => setSearchFilter(e.target.value) }
                                    name="searchFilter" 
                                    id="searchFilter" 
                                    type="text"
                                    autoComplete='off'
                                    placeholder=""
                                    value={searchFilter}
                                />

                                {searchFilter != '' &&
                                    <div onClick={ () => setSearchFilter('') } className="clear-search">
                                        <i className="far fa-times-circle mr-0"></i>
                                    </div>
                                }

                            </div>

                            <button onClick={() => setModalShow(true)} className="btn btn-articles-light btn-sm">Add User</button>
                        </div>


                    </div>

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
                
                                {users
                                .filter(user => {
    
                                    if (searchFilter != '') {
                                        return ( user.first_name.includes(searchFilter) || user.last_name.includes(searchFilter) || (`${user.first_name} ${user.last_name}`).includes(searchFilter) || (`${user.last_name} ${user.first_name}`).includes(searchFilter) )
                                    } else {
                                        return user
                                    }
            
                                })
                                .map(user => (
                
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
                                    <td>
                                        <ConfirmDelete afterConfirm={() => removeUser(user._id)}></ConfirmDelete>
                                        <div style={{cursor: 'pointer'}} onClick={() => editUser(user._id)} className="badge badge-dark noselect ml-1">Edit</div>
                                    </td>
                                </tr>
                                
                                ))}
                
                            </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="card-footer text-center">
                        <div className="text-muted">{users.length} / {users.length} Users being shown</div>
                    </div>

                </div>


            </div>



        </section>
    )
}

AdminUsersPage.Layout = AdminLayout;
export default AdminUsersPage;