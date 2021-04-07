
import { signIn } from 'next-auth/client'
import Link from 'next/link'

export default function AccessDenied () {
  return (
    <>
      <h1>Access Denied</h1>

        <Link href={'/login'}>
            <a>You must be signed in to view this page</a>
        </Link>

        {/* <a href="/login"
           onClick={(e) => {
           e.preventDefault()
           signIn()
        }}>You must be signed in to view this page</a> */}
    </>
  )
}