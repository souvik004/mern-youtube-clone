import styled from "styled-components";
import {RiThumbUpFill, RiThumbDownFill, RiShareForwardLine} from 'react-icons/ri'
import {MdAddTask} from 'react-icons/md'
import Comments from "../components/Comments";
import Card from "../components/Card";
import { useLocation } from "react-router-dom";
import { apiPublicRequest } from "../apiRequest";
import { useEffect, useState } from "react";
import { selectCurrentUser } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideo, selectCurrentVideo } from "../features/videoSlice";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Recommendation = styled.div`
  flex: 2;
`;
const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`

const Video = () => {
  const videoId = useLocation().pathname.split('/')[2]

  // const [videoInfo, setVideoInfo] = useState({})
  const [channelInfo, setChannelInfo] = useState({})
  const [error, setError] = useState()

  const currentUser = useSelector(selectCurrentUser)
  const currentVideo = useSelector(selectCurrentVideo)

  const dispatch = useDispatch()
  const axiosPrivate = useAxiosPrivate()
  
  useEffect(() => {
    dispatch(fetchVideo(videoId))
  }, [dispatch, videoId])
  

  useEffect(() => {
    const fetchChannelInfo = async () => {
      try {
        // const res = await apiPublicRequest.get(`/video/${videoId}`)
        // setVideoInfo(res.data?.video)

        const channelRes = await apiPublicRequest.get(`/user/${currentVideo?.userId}`)
        setChannelInfo(channelRes.data?.data)

      } catch (error) {
        // console.log(error)
        setError(error?.response?.data)
      }
    }

    fetchChannelInfo()
  }, [])
  
  const likeHandler = async () => {
    try {
      const res = await axiosPrivate.put(`/video/like/${videoId}`)
    } catch (error) {
      console.log(error)
    }
  }

  const dislikeHandler = () => {

  }

  const videoCreated = new Date(currentVideo?.createdAt).toLocaleDateString()
  const viewsCount = currentVideo?.views < 1000 
                      ? currentVideo?.views
                      : currentVideo?.views >= 1000000
                        ? `${(currentVideo?.views / 1000000).toFixed(1)}M`
                        : `${(currentVideo?.views / 1000).toFixed(1)}K`


  return (
    <Container>
      <Content>
      <div>
        <iframe
          width="100%"
          height="540"
          src="https://www.youtube.com/embed/k3Vfj-e1Ma4"
          title={`${currentVideo?.title}`}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>{viewsCount} views • {videoCreated}</Info>
          <Buttons>
            <Button onClick={likeHandler}>
              {currentUser?.likes?.includes(currentUser?._id) ? <RiThumbUpFill /> : <RiThumbUpFill style={{color: 'steelblue'}} />} {currentVideo?.likes?.length}
            </Button>
            <Button onClick={dislikeHandler}>
              {currentUser?.dislikes?.includes(currentUser?._id) ? <RiThumbDownFill style={{color: 'steelblue'}} /> : <RiThumbDownFill />} {currentVideo?.dislikes?.length}
            </Button>
            <Button>
              <RiShareForwardLine /> Share
            </Button>
            <Button>
              <MdAddTask /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={`${currentVideo?.imgUrl}`} />
            <ChannelDetail>
              <ChannelName>{channelInfo.name}</ChannelName>
              <ChannelCounter>{channelInfo.subscribers} subscribers</ChannelCounter>
              <Description>{currentVideo?.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe>SUBSCRIBE</Subscribe>
        </Channel>
        <Hr />
        <Comments />
      </Content>

      {/* <Recommendation>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
      </Recommendation> */}
    </Container>
  )
}

export default Video