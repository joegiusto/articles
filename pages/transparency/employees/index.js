import Head from 'next/head'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import { connectToDatabase } from '../../../util/mongodb'
import ROUTES from '../../../components/constants/routes'

import TransparencyLayout from '../../../components/layouts/transparency';

function TransparencyEmployeesPage(props) {
    const [employees, setEmployees] = useState( JSON.parse(props.employees) )
    const [searchTerm, setSearchTerm] = useState('all')
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

    return (
        <div className="employees-page">
                
            <Head>
                <title>Employees - Articles</title>
            </Head>
    
            <div className="search-bar">

                <span className={"search-letter mr-3" + (searchTerm === "all" ? ' active' : '')} onClick={() => setSearchTerm('all')}>
                    <span>All</span>
                </span>

                {/* <span className={"search-letter" + (searchTerm === "anonymous" ? ' active' : '')} onClick={() => (this.setState({searchTerm: "anonymous"}))}>
                    <i className="fas fa-eye-slash" aria-hidden="true"></i>
                </span> */}

                {alphabet.map(letter => (
                    <span className={"search-letter"  + (searchTerm === letter ? ' active' : '')} onClick={() => setSearchTerm(letter)}>{letter}</span>
                ))}

            </div>

            <div className="employees-list-head card card-block">
                <h1>Employee Directory</h1>
                <p>As part of our transparency efforts we provide a directory of our employees to the public along with some details about them.</p>
            </div>

            <div className="employees-list">
                {employees
                .filter(
                    employee => {
                    console.log( employee?.last_name.charAt(0) );
                    console.log( searchTerm.charAt(0).toLowerCase() );

                    if (employee.last_name.charAt(0).toLowerCase() === searchTerm.charAt(0).toLowerCase()) {
                        return employee
                    } else if (searchTerm === 'all') {
                        return employee
                    } else {
                        return null
                    }
                    }
                )
                .map(employee => (
                    <Link href={ROUTES.TRANSPARENCY_EMPLOYEES + '/' + (employee.employee.friendly_url ? employee.employee.friendly_url : employee._id)}>
                        <a>
                            <div className="employee-card card">
                                <div>{employee.last_name + (employee.first_name !== 'Anonymous' ? ', ' + employee.first_name : ' Anonymous')}</div>
                                <div>
                                <span className="badge badge-articles">Founder</span>
                                <span className="badge badge-articles ml-2">Developer</span>
                                </div>
                            </div>
                        </a>
                    </Link>
                ))}
            </div>


        </div>
    )
}

export async function getStaticProps() {
    const { db } = await connectToDatabase()

    // Fetch data from external API
    // const res = await fetch(`REQUEST_URL`)

    const projection = { 'employee': 1, 'first_name': 1, 'last_name': 1, 'birth_date': 1 };

    const result = await db
    .collection("articles_users")
    .find( { "roles.employee.bool": true }, { projection: projection } )
    .toArray();
    const employees = JSON.stringify(result)
  
    // Pass data to the page via props - revalidate every 10 minutes
    return { props: { employees }, revalidate: ( 60 * 10 ) }
}

TransparencyEmployeesPage.Layout = TransparencyLayout;
export default TransparencyEmployeesPage;