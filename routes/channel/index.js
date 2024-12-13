const express = require("express")
const router = express.Router()

const videos = require('./videos')
const { createChannel, getChannelAndSubscription, updateChannel } = require("@controllers/channelController")
const multer = require("multer")
const { isloggedIn } = require("@lib/middlewares")
const Tag = require("@models/Tag")

router.get(/^\/(UC\w+)?$/, async (req, res) => {
    if (!req.params[0]) return res.redirect('/channel/create')
    getChannelAndSubscription(req, res, false)
})
router.get(/^\/(UC\w+)?\/videos$/, async (req, res) => {
    if (!req.params[0]) return res.redirect('/channel/create')
    getChannelAndSubscription(req, res, false)
})
router.get(/^\/(UC\w+)?\/shorts$/, async (req, res) => {
    if (!req.params[0]) return res.redirect('/channel/create')
    getChannelAndSubscription(req, res, false)
})

router.get("/create", isloggedIn, (req, res) => req.channel.uid ? res.redirect("/channel/" + req.channel.uid) : res.render("devtube", {
    page: 'home',
    isCreateChannel: true
}))

router.post("/create", isloggedIn, multer().single('image'), createChannel)

router.post("/edit", isloggedIn, multer().fields([{ name: 'logo' }, { name: 'banner' }]), updateChannel)

router.use("/videos", videos)

module.exports = router
