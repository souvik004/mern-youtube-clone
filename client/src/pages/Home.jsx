import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { apiPublicRequest } from '../apiRequest';
import Card from '../components/Card';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Greet from '../components/Greet/Greet';

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 12px;
`;

const Home = ({type}) => {
  const [videos, setVideos] = useState([])
  const [error, setError] = useState({})

  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    const fetchFeaturedVideos = async () => {
      try {
        const res = await axiosPrivate.get(`/video/${type}`)
        setVideos(res.data)
        console.log(`/video/${type}`)
      } catch (error) {
        // console.log(error)
        setError(error?.response?.data)
      }
    }

    fetchFeaturedVideos()
  }, [type])


  // useEffect(() => {
  //   const getGoogleUser = async () => {
  //     try {
  //       const res = await axios.get('http://localhost:3500/auth/login/success', 
  //       {
  //         withCredentials: true,
  //         credentials: "include"
  //       })
  //       console.log(res.data)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
    
  //   getGoogleUser()
  // }, [])

  

  console.log(videos)
  console.log(error)
  
  return (
    <Container>
      <Greet />
      {videos?.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  )
}

export default Home