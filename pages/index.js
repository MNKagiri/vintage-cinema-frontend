import Link from 'next/link'
import { Card, CardBody, Image, Grid, Text} from '@chakra-ui/react'
import axios from "axios"
import Head from 'next/head'

export const getStaticProps = async () => {

  const res = await axios.get(process.env.LANDING_PAGE_API_CYCLIC)
  .catch(e => {
    console.log(e)
  })
return{
  props: {movies: res.data.movies},
}}

export default  function Home({movies}) {
 
  return (
    <Grid marginTop='10%' gridTemplateColumns="repeat(4, 1fr)" gap="5" >
      <Head> <title> {`Vintage Cinema`}</title></Head>
            {movies.map((result) => {
              return(
                <>
                <Link   key ={result._id} href = {`/id/${encodeURIComponent(result._id)}`} passHref>
                <Card bgColor= '#e8c599'>

                <CardBody>
                    <Image alt= 'movie_poster' key = {result._id} src={result.poster}/>
                  <Text hover color = '#b72818' fontSize={'2.0em'}> {result.title} </Text>  
                </CardBody>
        </Card> 
        </Link>
        
        </>
        )})}
                </Grid>
            )}
