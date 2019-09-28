let express = require("express")
let app = express()
let multer = require("multer")
let upload = multer()
let passwordsAssoc = {}

app.use('/', express.static(__dirname + '/public'))

app.post('/signup', upload.none(), (req , res) => {
    console.log("sign up hit", req.body)
    let username = req.body.username
    let password = req.body.password
    passwordsAssoc[username] = password
    res.send("<html><h2>User sign up with the valid username and password</h2></html>")
})

app.post('/login', upload.none(), (req, res) => {
    console.log("login hit", req.body)
    let username = req.body.username
    let passwordGiven = req.body.password
    let expectedPassword = passwordsAssoc[username]
    if (expectedPassword !== passwordGiven) {
        res.send("<html><h2>Invalid username and password</h2></html>")
        return
    }
    else 
        res.send("<html><h2>User login with the valid username and password</h2></html>")
})
app.listen(4000, () => {
    console.log("Server started")
})