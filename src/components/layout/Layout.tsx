import { forwardRef, memo } from "react";
import { Outlet } from "react-router-dom";
import styles from "./layout.module.scss";
import Navbar from "../navbar/Navbar";
import { Container } from "@mui/material";

export const Layout = memo(forwardRef<HTMLElement>((props, ref) => {
    return <main className={styles.__} ref={ref}>
        <Navbar />
        <Container className={styles.__container} >
            <Outlet />
        </Container>

    </main>
}))