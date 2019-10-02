let express = require("express")
let app = express()
let multer = require("multer")
let upload = multer()
let passwordsAssoc = {}
let passwordsAttemp = {}

app.use('/', express.static(__dirname + '/public'))

app.post('/signup', upload.none(), (req , res) => {
    console.log("sign up hit", req.body)
    let username = req.body.username
    let password = req.body.password
    if (!passwordsAssoc.hasOwnProperty(username)) 
    {
        passwordsAssoc[username] = password
        res.send("<html><h2>User sign up with the valid username and password</h2></html>")
    }
    else 
    {
        if (passwordsAssoc[username] === password) 
            res.send("<html><h2>User existed, please login</h2></html>")
        else 
            res.send("<html><h2>User existed already, and password doesn't match</h2></html>")

    }        
})

app.post('/login', upload.none(), (req, res) => {
    console.log("login hit", req.body)
    let username = req.body.username
    let passwordGiven = req.body.password
    let expectedPassword = passwordsAssoc[username]
    if (expectedPassword !== passwordGiven) {
        if (!passwordsAttemp.hasOwnProperty(username))
        {
            passwordsAttemp[username] = 1
            console.log(passwordsAttemp[username])

        }    
        else if (passwordsAttemp[username] < 2)
        {
            passwordsAttemp[username] += 1
            console.log(passwordsAttemp[username])
       }
            
        else
        {
            console.log(passwordsAttemp[username])
            res.send("<html><h2>Input the password wrongly 3 times, the account is disabled</h2></html>")
            return
        }
        res.send(`
            <html>
                <h2>Invalid username and password</h2>
                <form action='/login' method='POST' enctype='multipart/form-data'>
                    <div>Username</div><input type='text' name='username'>
                    <div>Password</div><input type='text' name='password'>
                    <input type='submit' value='let me in!'>
                </form>
                <a href='http://localhost:4000/login.html'>Back to login</a>
            </html>        
        `)
        return
    }
    else 
        res.send("<html><h2>User login with the valid username and password</h2></html>")
})
app.listen(4000, () => {
    console.log("Server started")
})