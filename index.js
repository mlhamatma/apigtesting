function myLog(message){
    if(false){
        console.log(message)
    }
}

function setFunctionUp(event) {
    var config_values = {}
    var myEnv = {}
    myEnv.AWS_AUTH_NAME = process.env.AWS_AUTH_NAME || ''
    myLog("Here is process.env: " + JSON.stringify(process.env))
    config_values.envs = myEnv

    return config_values
}

function setHeader(response, cookies) {
    myLog("Starting setHeader:\n" + JSON.stringify(response) + "\ncookies: \n" + JSON.stringify(cookies))
    if (!response.hasOwnProperty('headers')) {
        response.headers = {}
    }

    for (var i = 0; i < cookies.length; i++) {
        myLog("Here is the cookie: " + JSON.stringify(cookies[i]))
        response.headers[cookies[i].header] = cookies[i].value
    }
    myLog("Ending setHeader")

    return response
}
function setACookie(cookie_to_set) {
    myLog("Starting setACookie:\n" + JSON.stringify(cookie_to_set))
    var cookie = {}
    cookie.header = "set-cookie"
    cookie.value = cookie_to_set

    myLog(JSON.stringify(cookie) + "\nEnd setACookie...")
    return cookie
}

function setCookies(response, cookies) {
    myLog("Starting the setCookies:\n" + JSON.stringify(response) + "\n Cookies: \n" + JSON.stringify(cookies))
    myLog("Lenght of cookies: " + cookies.length)
    var my_cookies = []
    var set_cookies_header = [
        "set-cookie",
        "SET-COOKIE",
        "Set-cookie",
        "SEt-cookie",
        "SET-cookie",
        "SET-Cookie",
        "SET-COokie",
        "SET-COOkie",
        "SET-COOKIe",
        "sEt-cookie"
    ]
    myLog("Here is the st_cookie_header: " + set_cookies_header)
    for (var i = 0; i < cookies.length; i++) {
        var indiv_cookie = {}
        myLog("Here is the i: " + i)
        indiv_cookie["header"] = set_cookies_header[i]
        indiv_cookie["value"] = cookies[i]
        myLog("Here is the indiv_cookie: " + JSON.stringify(indiv_cookie))
        my_cookies.push(indiv_cookie)
    }
    myLog("Here is the my_cookie:\n" + JSON.stringify(my_cookies))
    response = setHeader(response, my_cookies)

    myLog("\n" + JSON.stringify(cookies) + "\nresponse: \n" + JSON.stringify(response) + "\nDone with the setCookies... ")

    return response
}

function doIt() {
    myLog("Starting doIt function...")
    myLog(setFunctionUp({}))
    var response = {
        statusCode: 200,
        body: { "somekey": "Some key that you need." }
    }
    var cookies = ["cookie_one=somecookieone; secure", "cookie_two=somecookietwo; secure; domain=*.aws.com"]
    setCookies(response, ["singleCookie=somevalue; secure; domain=localhost"])
    setCookies(response, cookies)
    myLog("Finished with doIt Function...")
}
console.log("Calling doIt")
doIt()

exports.handler = (event, context, callback) => {
    myLog("Starting the handler function...")
    myLog(setFunctionUp({}))
    var response = {
        statusCode: 200,
        body: { "somekey": "Some key that you need." }
    }
    var cookies = ["cookie_one=somecookieone; secure", "cookie_two=somecookietwo; secure; domain=*.aws.com"]
    response = setCookies(response, cookies)

    myLog("Ending the handler function: \n" + JSON.stringify(response))

    context.done(null, response)
}