import Link from 'next/link'
import ROUTES from '../../components/constants/routes';
import { useRouter } from 'next/router'

function StoreLayout({ children }) {
// const StoreLayout = ({ children }) => (
    const router = useRouter()
    const { param } = router.query

    return (

    <div className="news-page">

        <h2 className="bg-primary text-center">News Nav</h2>

        <div className="page">{children}</div>

    </div>

    )

};
  
export default StoreLayout;