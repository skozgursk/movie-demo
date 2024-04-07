import { useEffect, useRef, useState } from 'react';
import styles from './lazyLoadingImage.module.scss';
import LazyLoadingImageProps from './LazyLoadingImageProps'
import { Loading } from '../loading/Loading';

export const LazyLoadingImage = (lazyLoadingImageProps: LazyLoadingImageProps) => {

    const imageContainerRef = useRef(null)
    const [isOnScreen, setIsOnScreen] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [isImageNotLoading, setIsImageNotLoading] = useState(false);

    const observerRef = useRef<IntersectionObserver>(new IntersectionObserver((entry) => {
        if (entry[0].isIntersecting) {
            setIsOnScreen(true)
        }
    }));

    useEffect(() => {
        if (imageContainerRef.current) {
            observerRef.current?.observe(imageContainerRef.current)
        }
    }, [imageContainerRef])

    return <div className={styles.__} ref={imageContainerRef}>
        {isImageNotLoading && <div className={styles.__error}>
            Something Went Wrong On Image Loading
        </div>}
        {!isImageLoaded && <Loading />}
        {isOnScreen && <img className={`${styles.__image} ${lazyLoadingImageProps.className}`}
            onError={() => { setIsImageNotLoading(true); setIsImageLoaded(true); }}
            onLoad={() => { setIsImageLoaded(true) }}
            loading='lazy'
            alt={lazyLoadingImageProps.alt}
            src={lazyLoadingImageProps.src} />}

    </div>
}