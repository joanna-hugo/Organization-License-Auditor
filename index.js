const request = require('request');

const options = {
    url: 'https://api.github.com/orgs/ukulele-fan-club/repos',
    headers: {
        'User-Agent': 'ukefan42',
        json : true,
        Authorization: "token PASTE IN FROM SECURE LOCATION"
    }
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        const info = JSON.parse(body);
        for (let i = 0 ; i < info.length; i++){
            if(!info[i].license ){
                console.log(info[i].name + " needs a license!")
            }else{
                console.log(info[i].name + " already has a license")
            }
        }

    }else{
        console.log("what's up")
    }
}

request(options, callback);