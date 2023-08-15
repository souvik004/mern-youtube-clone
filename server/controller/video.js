import User from "../model/User.js";
import Video from "../model/Video.js";

//get a video
export const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findOne({ _id: req.params.id });
        if (!video) {
            return next(ErrorHandler(404, 'There is no video'))
        }
        res.status(200).json({video})
    }catch(err){
        next(err)
    }
}

//get random videos
export const getRandomVideos = async (req, res, next) => {
    try {
        const videos = await Video.aggregate([{$sample: {size: 40}}])
        res.status(200).json(videos.sort((a,b) => b.createdAt - a.createdAt))
    }catch(err){
        next(err)
    }
}

//get trending videos
export const getTrendingVideos = async (req, res, next) => {
    try {
        const videos = await Video.find().sort({views: -1})
        res.status(200).json(videos)
    }catch(err){
        next(err)
    }
}

//get Subscription Videos 
export const getSubscriptionVideos = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        const subscriptionList = user.subscribedUsers

        const videos = await Promise.all(subscriptionList.map(async (channelId) => (await Video.find({ userId: channelId })))) 
        res.status(200).json(videos.flat().sort((a,b) => b.createdAt - a.createdAt))
    }catch(err){
        next(err)
    }
}

//get videos by tag
export const getVideosByTag = async (req, res, next) => {
    const tags = req.query.tags.split(",")

    try {
        const videos = await Video.find({tags: { $in: tags }})   
        if(videos.length === 0) return res.status(200).json({msg: "No videos found" })
        res.status(200).json(videos)
    }catch(err){
        next(err)
    }
}

//get videos by search term
export const getSearchedVideos = async (req, res, next) => {
    const query = req.query.q

    try {
        const videos = await Video.find({title: { $regex: query, $options: 'i'}}) // i for case insensitive
        if(videos.length === 0) return res.status(200).json({msg: "No videos found" })
        res.status(200).json(videos)
    }catch(err){
        next(err)
    }
}

//create/upload a new video
export const uploadVideo = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).lean()
        const newVideo = await Video.create({ userId: req.user.id, ...req.body });
        res.status(200).json({data: {newVideo, user: user.name}})
    } catch (error) {
        next(error)
    }
}

//edit video
export const editVideo = async (req, res, next) => {

    try {
        const video = await Video.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});
        if (!video) {
            return next(ErrorHandler(404, 'Video not found'))
        }
        if(video.userId !== req.user.id){
            return next(ErrorHandler(403, 'You are not allowed to delete the video'))
        }

        res.status(200).json({msg: "Video is edited successfully", video})
    } catch (error) {
        next(error)
    }
}

//delete video
export const deleteVideo = async (req, res, next) => {

    try {
        const video = await Video.findByIdAndDelete(req.params.id);
        if (!video) {
            return next(ErrorHandler(404, 'Video not found'))
        }
        if(video.userId !== req.user.id){
            return next(ErrorHandler(403, 'You are not allowed to delete the video'))
        }

        res.status(200).json({msg: "Video is deleted successfully"})
    } catch (error) {
        next(error)
    }
}

//like a video
export const likeVideo = async (req, res, next) => {
    console.log(req.params.id, req.user.id)
    try {
        await Video.findByIdAndUpdate(req.params.id, {
            $addToSet: { likes: req.user.id },
            $pull: { dislikes: req.user.id }
        })
        res.status(200).json({msg: "You have liked the video"})
    } catch (error) {
        next(error)
    }
}

//dislike a video
export const dislikeVideo = async (req, res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id, {
            $addToSet: { dislikes: req.user.id },
            $pull: { likes: req.user.id }
        })
        res.status(200).json({msg: "You have disliked the video"})
    } catch (error) {
        next(error)
    }
}