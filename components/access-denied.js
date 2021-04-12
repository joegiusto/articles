import { signIn } from 'next-auth/client'
import Link from 'next/link'

export default function AccessDenied () {
    return (
        <>
            <h2>Access Denied</h2>
            <p>You must be signed in to view this page.</p>
        
            <Link href={'/login'}>
                <a className="btn btn-articles-light">Login</a>
            </Link>

            {/* <a href="/login"
            onClick={(e) => {
            e.preventDefault()
            signIn()
            }}>You must be signed in to view this page</a> */}
        </>
    )
}