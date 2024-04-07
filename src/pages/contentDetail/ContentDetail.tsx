import { Link, useParams } from "react-router-dom"
import styles from "./contentDetail.module.scss"
import { Box, Grid, Stack, Typography } from "@mui/material"
import { useQuery } from "react-query";
import { apiInstance, useHTTP } from "../../utils";
import { useEffect } from "react";
import { ContentDetailModel } from "../../models";
import { LazyLoadingImage, Loading } from "../../components";


export const ContentDetail = () => {
    const { id } = useParams()

    const { data: content, loading, error, get } = useHTTP<ContentDetailModel>(apiInstance)

    useEffect(() => {
        if (id) {
            get(`?i=${id}`)
        }
    }, [id])

    return <div className={styles.__}>
        {loading && <Loading />}
        {error ? <div className={styles.__error}>
            <h2>{error}</h2>
        </div> :
            <>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8} lg={9}>
                        <Typography variant="h1">{content?.Title}</Typography>
                        <Box className={styles.__info}>
                            <Typography color="gray">{content?.Year}</Typography>
                            <Typography color="gray">{content?.Rated}</Typography>
                            <Typography color="gray">{content?.Runtime}</Typography>
                        </Box>
                    </Grid>
                    <Grid className={styles.__ratings} item xs={12} md={4} lg={3}>
                        <Box>
                            <Typography>IMDb Rating</Typography>
                            <Typography>{content?.imdbRating}</Typography>
                        </Box>
                        <Box>
                            <Typography>Meta Score</Typography>
                            <Typography>{content?.Metascore}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4} >
                        <LazyLoadingImage className={styles.__poster} src={content?.Poster} />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Stack className={styles.__details} >
                            <Box>
                                <Typography>
                                    {content?.Plot}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography>
                                    Director:
                                </Typography>
                                <Typography>
                                    {content?.Director}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography>
                                    Writer:
                                </Typography>
                                <Typography>
                                    {content?.Writer}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography>
                                    Stars:
                                </Typography>
                                <Typography>
                                    {content?.Actors}
                                </Typography>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>
            </>}
    </div>
}