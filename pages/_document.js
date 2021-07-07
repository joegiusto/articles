import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
        <Html>

            <Head>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link rel="stylesheet" href="https://use.typekit.net/wvo0uze.css"/>
                <link rel="stylesheet" href="/fonts/fontawsome/css/all.min.css"/>
                {/* <link rel="stylesheet" href="public/fonts/fontawsome/css/all.min.css" ></link> */}
                {/* <script src="https://kit.fontawesome.com/d1a2586c98.js" crossOrigin="anonymous"></script> */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        
                        gtag('config', 'G-1FY263JYMM', { page_path: window.location.pathname });
                        `,
                    }}
                />
            </Head>

            <body>
                <Main />
                <NextScript />
            </body>

        </Html>
        )
    }
}

export default MyDocument