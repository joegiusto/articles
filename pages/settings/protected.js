import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
// import Layout from '../components/layout'

import AccessDenied from '../../components/access-denied'
import SettingsLayout from '../../components/layouts/settings.js';

function SettingsProtectedPage () {
  const [ session, loading ] = useSession()
  const [ content , setContent ] = useState()

  // Fetch content from protected route
  useEffect(()=>{
    const fetchData = async () => {
      const res = await fetch('/api/examples/protected')
      const json = await res.json()
      if (json.content) { setContent(json.content) }
    }
    fetchData()
  },[session])

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display access denied message
  if (!session) { return  <AccessDenied/> }

  console.log(session)

  // If session exists, display content
  return (
    // <Layout>
    <div className="">

        <h1>Protected Page</h1>
        <p className="mb-3"><strong>{content || "\u00a0"}</strong></p>

        <div className="p-3">
            <h1>API Example</h1>
            <p>The examples below show responses from the example API endpoints.</p>
            <p><em>You must be signed in to see responses.</em></p>

            <div className="d-flex flex-column flex-lg-row">

                <div>
                    <h2>Session</h2>
                    <p>/api/examples/session</p>
                    <iframe src="/api/examples/session"/>
                </div>

                <div className="ml-lg-3">
                    <h2>JSON Web Token</h2>
                    <p>/api/examples/jwt</p>
                    <iframe src="/api/examples/jwt"/>
                </div>

            </div>

        </div>

    </div>
    // </Layout>
  )
}

SettingsProtectedPage.Layout = SettingsLayout;
export default SettingsProtectedPage;