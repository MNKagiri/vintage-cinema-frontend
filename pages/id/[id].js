import {Text, Box, Textarea, Button, Image, Heading, Container, Grid} from '@chakra-ui/react'
import {useState} from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Head from 'next/head';
import axiosinstance from '../../instance/instance'



export async function getStaticPaths(){
 const response = await axios.get(process.env.LANDING_PAGE_API_CYCLIC)

 const paths =  await response.data.movies.map(post => {
    return {
     
      params: { 
        id: `${post._id}`
      },
    }})

  return {
    paths,
    fallback: false
  }}

export async function getStaticProps(context){
     const id = context.params.id;  
     const variable = process.env.GET_MOVIE_URL_CYCLIC;
     const get_link = variable + id;
     const res = await axios.get(get_link);
    return{
        props: {
           movie: res.data
        }
    }
}


export default function BookDetails({movie}){

  const router = useRouter()
  const [add, setAdd] = useState(false)
  const [review, setReview ]  = useState() 
  const {data: session} = useSession()

  const SubmitReview = async () => {    
      await axiosinstance.post(`https://shy-tan-shrimp-robe.cyclic.app/api/v1/movies/review`,   {
        userId: session.user.email,
        movieTitle: movie.title,
        movieId: movie._id,
        review: review,
      }).then(() => setAdd(false))
      .catch((e) => console.log(e) );
     
      router.reload();    
    }

    return(
        <>
            <Box marginTop='11%' marginBottom = '10%' key={movie._id}>
            <Head>  <title> {`${movie.title}`}</title></Head>
            <Grid templateColumns="repeat(2, 1fr)"  /* alignItems="center" */ justifyItems="center">
              <Container maxW = 'md' maxH = 'md'>  <Image alt='movie poster'  src= {movie.poster}/> </Container>
              <Box>  <Text fontSize='1.5em'> {movie.directors.map((dir) => <>{dir}</>)}&apos;s  <Heading> {movie.title}</Heading></Text>
                <Text fontSize='2em'>{movie.fullplot} </Text> 
                { add ? <>
            <Box>                    
            <Textarea onChange={(e) => {setReview(e.target.value) }} />
            <Button onClick={SubmitReview} > Submit</Button>
            <Button onClick={() => setAdd(false)}> Close</Button>
            </Box>
            </>
            :
             session ? <Button onClick={() => setAdd(true)} colorScheme = 'messenger'>Add Review</Button>
             : <> <Button colorScheme='messenger'>Sign In To Add Review </Button></> 
            }
            <h2> Starring</h2>
            {movie.cast.map((member) => 
             <Box key={member}>
                {member}
             </Box>)}
                
                </Box>
                </Grid>
            </Box>
              
            <Heading  marginTop='5%' marginLeft = '8%'> Reviews </Heading>
              <Box marginTop='2%' >

                {movie.movie_reviews.map((comment) => 
                <Box  key = {comment.userId} marginTop = '1%' width='50%'  boxShadow= 'dark-lg'  rounded='xl' marginLeft='8%' padding='1%'>
                  
             <Box > <Text > {comment.userId} </Text>  </Box>    
                <Text color = '#b72818'> {comment.review} </Text>      
                  </Box>)
                }
              </Box>
        </>

    )
}