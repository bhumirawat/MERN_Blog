import { handleError } from "../helper/handleError.js"
import BlogLike from "../models/bloglike.model.js"

export const doLike = async (req, res, next) => {
    try {
        const { user, blogid } = req.body

        if (!user || !blogid) {
            return res.status(400).json({
                success: false,
                message: "User and Blogid are Required"
            })
        }

        let like = await BlogLike.findOne({ user, blogid })

        if (!like) {
            const saveLike = new BlogLike({ user, blogid })
            await saveLike.save()
        } else {
            await BlogLike.findByIdAndDelete(like._id)
        }

        const likecount = await BlogLike.countDocuments({ blogid })

        res.status(200).json({
            success: true,
            likecount
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}


export const likeCount = async (req, res, next) => {
    try {
        const { blogid, userid } = req.params
        const likecount = await BlogLike.countDocuments({ blogid })

        let isUserliked = false
        if(userid){
            const getuserLike = await BlogLike.countDocuments({ blogid, user: userid })
            if(getuserLike > 0){
                isUserliked = true
            }
        }

        res.status(200).json({
            likecount,
            isUserliked
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}