// Import necessary modules
const mongoose = require('mongoose')
const multer = require('multer')
const ImageKit = require("imagekit")
const axios = require('axios')


const url = process.env.MONGODB_URI

mongoose.connect(url, {
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => console.info("Connected to MongoDB"))
  .catch(error => console.error("Error connecting to MongoDB:", error))

const conn = mongoose.createConnection(url)

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
})

// BunnyCDN endpoint for video streaming
const bunnyStreamEndpoint = `https://video.bunnycdn.com/library/${process.env.BUNNY_STREAM_LIBRARY_ID}/videos`

const createVideoEntry = async (fileName) => {
  const response = await axios.post(bunnyStreamEndpoint, { title: fileName }, {
    headers: {
      AccessKey: process.env.BUNNY_STREAM_API_KEY,
      'Content-Type': 'application/json'
    }
  })
  return response.data.guid
}

const storage = multer.memoryStorage()
const upload = multer({ storage })

module.exports = { conn, upload, imageKit, createVideoEntry, bunnyStreamEndpoint }
