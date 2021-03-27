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
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link rel="stylesheet" href="https://use.typekit.net/wvo0uze.css"/>
                <script src="https://kit.fontawesome.com/d1a2586c98.js" crossorigin="anonymous"></script>
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