import { ErrorHandler } from "../middlewares/errorHandler.js";
import Comment from "../model/Comment.js";
import Video from "../model/Video.js";

//get all comments of a video
export const getComments = async (req, res, next) => {
    try {
      const comments = await Comment.find({ videoId: req.params.videoId });
      res.status(200).json(comments);
    } catch (err) {
      next(err);
    }
  };

//add comment in a video
export const addComment = async (req, res, next) => {
    try {
      const comment = await Comment.create({ userId: req.user.id, ...req.body });
      res.status(200).json({msg: "Your comment has been added", comment});
    } catch (err) {
      next(err);
    }
};

//delete comment 
export const deleteComment = async (req, res, next) => {
    try {
      const comment = await Comment.findById(req.params.id);
      if(req.user.id === comment.userId){
          await Comment.findByIdAndDelete(req.params.id);
          res.status(200).json({msg: "Your comment has been deleted"});
      }else{
        return next(ErrorHandler(403, 'You are not allowed to delete'))
      }
    } catch (err) {
      next(err);
    }
};