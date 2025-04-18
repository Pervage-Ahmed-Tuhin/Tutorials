import { RequestHandler } from "express";
import { isValidObjectId, ObjectId } from "mongoose";
import User from "#/models/user";
import { paginationQuery } from "#/@types/misc";
import Audio, { AudioDocument } from "#/models/audio";
import { error } from "console";
import Playlist from "#/models/playlist";

export const updateFollower: RequestHandler = async (req, res) => {

    const { profileId } = req.params;
    let status: "added" | "removed";

    if (!isValidObjectId(profileId)) {
        res.status(422).json({ message: "Invalid profile ID" });
        return;
    }


    const profile = await User.findById(profileId)


    if (!profile) {
        res.status(404).json({ message: "profile not found" });
        return;
    }

    const alreadyAFollower = await User.findOne({ _id: profileId, followers: req.user.id });

    if (alreadyAFollower) {
        await User.updateOne({
            _id: profileId,
        }, {

            $pull: { followers: req.user.id }
        })
        status = "removed";
    } else {
        //follow the user

        await User.updateOne({
            _id: profileId,
        }, {

            $addToSet: { followers: req.user.id }
        })

        status = "added";
    }

    if (status === "added") {
        //update the following list
        await User.updateOne({
            _id: req.user.id,
        }, {
            $addToSet: { followings: profileId }
        })
    }

    if (status === "removed") {
        //remove from the following list

        await User.updateOne({
            _id: req.user.id,
        }, {
            $pull: { followings: profileId }
        })
    }

    res.json({ status });
}



export const getUploads: RequestHandler = async (req, res) => {

    const { limit = "20", pageNo = "0" } = req.query as paginationQuery

    const data = await Audio.find({
        owner: req.user.id
    }).skip(parseInt(limit) * parseInt(pageNo)).limit(parseInt(limit)).sort("-createdAt")

    const audios = data.map(item => {
        return {
            id: item._id,
            title: item.title,
            about: item.about,
            file: item.file.url,
            poster: item.poster?.url,
            date: item.createdAt,
            owner: {
                name: req.user.name,
                id: req.user.id,
            }
        }
    })

    res.json({
        audios
    });

}
export const getPublicUploads: RequestHandler = async (req, res) => {

    const { limit = "20", pageNo = "0" } = req.query as paginationQuery

    const { profileId } = req.params;

    if (!isValidObjectId(profileId)) {
        res.status(422).json({ message: "Invalid profile ID" });
        return;
    }

    const data = await Audio.find({
        owner: profileId
    }).skip(parseInt(limit) * parseInt(pageNo)).limit(parseInt(limit)).sort("-createdAt").populate<AudioDocument<{ name: string; _id: ObjectId }>>("owner")

    const audios = data.map(item => {
        return {
            id: item._id,
            title: item.title,
            about: item.about,
            file: item.file.url,
            poster: item.poster?.url,
            date: item.createdAt,
            owner: {
                name: item.owner.name,
                id: item.owner._id,
            }
        }
    })

    res.json({
        audios
    });

}
export const getPublicProfile: RequestHandler = async (req, res) => {


    const { profileId } = req.params;
    if (!isValidObjectId(profileId)) {
        res.status(422).json({ error: "Invalid profile ID" });
        return;
    }

    const user = await User.findById(profileId)

    if (!user) {
        res.status(4022).json({ error: "User not found" });
        return;
    }

    res.json({
        profile: {
            id: user._id,
            name: user.name,
            followers: user.followers.length,
            avatar: user.avatar?.url,
        }
    })


}
export const getPublicPlaylist: RequestHandler = async (req, res) => {

    const { profileId } = req.params;
    const { limit = "20", pageNo = "0" } = req.query as paginationQuery
    if (!isValidObjectId(profileId)) {
        res.status(422).json({ error: "Invalid profile ID" });
        return;
    }

    const playList = await Playlist.find({
        owner: profileId,
        visibility: "public"
    }).skip(parseInt(limit) * parseInt(pageNo)).limit(parseInt(limit)).sort("-createdAt")


    if (!playList) {

        res.json({ playlist: [] })

        return;
    }

    res.json({
        playlist: playList.map(item => {
            return {
                id: item._id,
                title: item.title,
                itemsCount: item.items.length,
                visibility: item.visibility,
            }
        })
    })

}