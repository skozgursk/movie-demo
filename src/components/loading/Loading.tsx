import React, { ReactElement, forwardRef } from "react";
import LoadingProps from "./LoadingProps";
import styles from "./loading.module.scss";
import { CircularProgress } from "@mui/material";

export const Loading = ({ children }: LoadingProps) => {

    const renderLoadingCircle = () => {
        return <CircularProgress color="primary" />
    }

    return (<>
        {children ?
            React.Children.map(children, (child, index) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement((child as React.ReactElement<HTMLElement>), {
                        className: `${(child as React.ReactElement<HTMLElement>)?.props?.className} ${styles.__loading__parent}`,
                        key: index,
                    }, [
                        (child as ReactElement)?.props.children,
                        renderLoadingCircle()
                    ])
                } else {
                    return <div className={`${styles.__loading}`}>
                        {renderLoadingCircle()}
                    </div>
                }

            }) : <div className={`${styles.__loading}`}>
                {renderLoadingCircle()}
            </div>
        }

    </>)
}