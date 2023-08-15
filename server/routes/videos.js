import express from "express";
import { deleteVideo, dislikeVideo, editVideo, getRandomVideos, getSearchedVideos, getSubscriptionVideos, getTrendingVideos, getVideo, getVideosByTag, likeVideo, uploadVideo } from "../controller/video.js";
import { verifyToken, verifyUser } from "../middlewares/verifyToken.js";

const videoRouter = express.Router();

videoRouter.get('/featured', getRandomVideos)
videoRouter.get('/trending', getTrendingVideos)
videoRouter.get('', getVideosByTag)
videoRouter.get('/search', getSearchedVideos)
videoRouter.get('/subscriptions', verifyToken, getSubscriptionVideos)
videoRouter.get('/:id', getVideo)

videoRouter.post('/upload', verifyToken, uploadVideo)
videoRouter.delete('/:id', verifyToken, deleteVideo)
videoRouter.put('/like/:id', verifyToken, likeVideo)
videoRouter.put('/dislike/:id', verifyToken, dislikeVideo)
videoRouter.put('/:id', verifyToken, editVideo)

export default videoRouter