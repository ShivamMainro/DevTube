require('module-alias/register')

const http = require('http')
const path = require('path')
const passport = require('./config') // Import configured passport
const session = require('express-session')
const express = require('express')
const socketio = require('socket.io')

const app = express()

const server = http.createServer(app)

const io = socketio(server)

module.exports = { io, app }


io.on('connection', (socket) => {
  console.info('A client connected')
})

const routes = require("./routes")

require("@lib/db")

const { checkDBConnection } = require("@lib/middlewares")
const Channel = require('@models/Channel') 

app.set('views', path.join(__dirname, 'views'))

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))

app.use(passport.initialize())

app.use(passport.session())

app.use(checkDBConnection)

app.use(async (req, res, next) => {
  res.locals.isCreateChannel = false
  if (req.user) {
    res.locals.channel = req.channel = req.user
  } else {
    req.channel = res.locals.channel = null
  }
  next()
})


app.use("/", checkDBConnection, routes)


app.use((req, res) => {
  res.status(404).render('404')
})


const port = 3000

server.listen(port, () => {
  console.info(`Server started at http://localhost:${port}`)
})
