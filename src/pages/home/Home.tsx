import { Link, useSearchParams } from "react-router-dom"
import styles from "./home.module.scss"
import { Autocomplete, Box, Grid, MenuItem, Pagination, Select, Stack, TextField, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { ContentTypes, StateModel } from "../../models"
import { apiInstance, useHTTP } from "../../utils"
import { useEffect, useMemo, useRef, useState } from "react"
import { SearchResponse } from "../../models/SearchResponse"
import { LazyLoadingImage, Loading } from "../../components"
import MovieIcon from '@mui/icons-material/Movie';
import LiveTv from '@mui/icons-material/LiveTv';

export const Home = () => {
    const searchText = useSelector((state: StateModel) => state?.search?.value)
    const [page, setPage] = useState(1)
    const [year, setYear] = useState<string | null>("")
    const [type, setType] = useState<ContentTypes | "all">("all")
    const isMounted = useRef(false)

    const years = useMemo(() => {
        const currentYear = new Date().getFullYear();
        const yearsArray = [];
        for (let year = 1900; year <= currentYear; year++) {
            yearsArray.push(year.toString());
        }
        return yearsArray
    }, [])

    let [searchParams, setSearchParams] = useSearchParams();

    const { data: contents, loading, error, get } = useHTTP<SearchResponse>(apiInstance)

    useEffect(() => {
        setPage(1)
        setType("all")
        setYear("")
        get(`?s=${searchText}`)
    }, [searchText])

    useEffect(() => {
        setSearchParams({
            page: page.toString(),
            ...(year ? { year: year.toString() } : null),
            ...(type && type !== "all" ? { type: type.toString() } : null)
        })
    }, [page, year, type])

    useEffect(() => {
        if (isMounted.current) {
            const filters = [
                `page=${searchParams.get('page')}`,
                ...(searchParams.get('year') ? [`y=${searchParams.get('year')}`] : []),
                ...(searchParams.get('type') ? [`type=${searchParams.get('type')}`] : [])
            ]
            get(`?s=${searchText}&${filters.join('&')}`)
        }
    }, [searchParams])

    useEffect(() => {
        if (contents) {
            isMounted.current = true
        }
    }, [contents])

    return <div className={styles.__}>
        {loading && <Loading />}
        <h1>Search results for {searchText}</h1>
        <Box className={styles.__filters}>
            <Typography variant="h6" color="white">
                Filters:
            </Typography>
            <Select
                value={type}
                label="Type"
                className={styles.__filters__type}
                onChange={(e, v) => { setType(e.target.value as (ContentTypes | "all")) }}
            >
                <MenuItem value={"all"}>All</MenuItem>
                <MenuItem value={ContentTypes.Movie}>Movies</MenuItem>
                <MenuItem value={ContentTypes.Series}>Series</MenuItem>
                <MenuItem value={ContentTypes.Episode}>Episode</MenuItem>
            </Select>
            <Autocomplete
                value={year}
                onChange={(e, v) => { setYear(v) }}
                disablePortal
                className={styles.__filters__year}
                options={years}
                renderInput={(params) => <TextField {...params} label="Year" />}
            />

        </Box>
        {error ? <div className={styles.__error}>
            <h2>{error}</h2>
        </div> :
            <>
                <Box className={styles.__results}>
                    <Stack spacing={2}>
                        {contents?.Search?.map(item => {
                            return <Link className={styles.__link} key={item.imdbID} to={`/content/${item.imdbID}`}>
                                <Grid container>
                                    <Grid item xs={4} sm={3} md={2} className={styles.__poster__container}>
                                        <LazyLoadingImage className={styles.__poster} src={item.Poster} />
                                    </Grid>
                                    <Grid item xs={8} sm={9} md={10} className={styles.__info__container}>
                                        <Typography variant="subtitle2" color="gray">
                                            {item.Year}
                                        </Typography>
                                        <Typography color="black" variant="h5">
                                            {item.Type === ContentTypes.Movie && <MovieIcon />}
                                            {item.Type === ContentTypes.Series && <LiveTv />}
                                            {item.Title}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Link>
                        })}
                    </Stack>
                </Box>
                <Pagination className={styles.__pagination} page={page} onChange={(e, v) => { setPage(v) }} count={contents ? Math.ceil(parseInt(contents?.totalResults) / 10) : 1} />
            </>}
    </div>
}