const fs = require("fs");
const login = require("metacord");

var credentials = {email: "", password: ""};

login(credentials, (err, api) => {
    if(err) return console.error(err);

    fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));
});