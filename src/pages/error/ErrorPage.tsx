import { Link } from "react-router-dom"
import styles from "./errorPage.module.scss"


export const ErrorPage = () => {
    return <div className={styles.__}>
        <Link to={'/'}>Ana Sayfaya Dön</Link>
    </div>
}