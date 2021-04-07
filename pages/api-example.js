// import Layout from '../components/layout'

export default function Page () {
    return (
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
    )
}