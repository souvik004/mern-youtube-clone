import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import { format } from 'timeago.js'
import { apiPublicRequest } from "../apiRequest";

const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "300px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelInfo = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
  margin-top: 4px;
  line-height: 1.4;
  font-weight: 500;
`;

const Card = ({video}) => {
  const [channel, setChannel] = useState([])
  const [error, setError] = useState({})

  useEffect(() => {
    const fetchChannelInfo = async () => {
      try {
        const res = await apiPublicRequest.get(`/user/${video?.userId}`)
        setChannel(res.data?.data)
      } catch (error) {
        // console.log(error)
        setError(error?.response?.data)
      }
    }

    fetchChannelInfo()
  }, [video?.userId])

  // console.log(channel)
  
  return (
    <Link to={`/video/${video?._id}`} style={{ textDecoration: "none" }}>
      <Container type={video}>
        <Image type={video}
          src={video?.imgUrl} />
        <Details type={video}>
          <ChannelImage
            type={video}
            src={channel.img}
          />
          <div>
            <Title>{video?.title}</Title>
            <ChannelInfo>
              {channel.name} <br /> {video?.views} views • {video?.createdAt}
            </ChannelInfo>
          </div>
        </Details>
      </Container>
    </Link>
  )
}

export default Card