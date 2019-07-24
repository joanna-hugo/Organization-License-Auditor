const request = require('request');
const bash = require('./bash.js');
const rp =require('request-promise');

let org = process.argv[2]; //following the pattern 'node index.js orgName" this will give us the organization from the terminal
const authToken = "";
const options = {
    url: 'https://api.github.com/orgs/' + org + '/repos',
    headers: {
        'User-Agent': 'ukefan42',
        json : true,
        Authorization: "token " + authToken
    }
};

rp(options)
    .then(async function (info) {
        info = JSON.parse(info);
        for (let i = 0 ; i < info.length; i++){
            if(!info[i].license ){
                console.log(info[i].name + " needs a license!");
                await clone(info[i])
            }else{
                console.log(info[i].name + " already has a " + info[i].license.name)
            }
        }
    })
    .catch(function (err) {

    });

async function forkRepo(info){
    // POST /repos/:owner/:repo/forks
    let forkOptions = {
        url: 'https://api.github.com/repos/' + info.owner.login + '/' + info.name + '/forks',
        method : "POST",
        headers: {
            'User-Agent': 'ukefan42',
            Authorization: "token " + authToken
        }
    };
    if(info.owner.type === "Organization"){
        forkOptions.headers.organization = info.owner.login
    }
    rp(forkOptions)
        .then(async function(info){
            console.log("did it fork?");
            info=JSON.parse(info);
            if(info.fork) {
                await clone(info)
            }
        })
        .catch(function(error){
            console.log(error.message)
        })
}

async function clone(info){
    if(info.message === "The repository exists, but it contains no Git content. Empty repositories cannot be forked."){
        let path = response.req.path; //  /repos/ukulele-fan-club/ConcertsAPI/forks
        let repo = path.split("/")[3];
        console.log("Unable to fork " + repo + " because it is empty")
        return
    }
    let cloneOptions = {
        url: info.clone_url,
        method : "POST",
        headers: {
            'User-Agent': 'ukefan42',
            Authorization: "token " + authToken
        }
    };
    await rp(cloneOptions)
        .then(function(info){
        info = JSON.parse(info);
        console.log(info);
    })
    .catch(function(error){
        // currently getting a 301, MOVED PERMANENTLY when calling info.clone_url
            console.log(error.statusCode)
    })
}

// iterate
// fork the repo
// make changes
// pull request

// request(options, iterate);


// async function iterate(error, response, body) {
//     if (!error && response.statusCode === 200) {
//         const info = JSON.parse(body);
//         for (let i = 0 ; i < info.length; i++){
//             if(!info[i].license ){
//                 console.log(info[i].name + " needs a license!");
//                 await forkRepo(info[i])
//             }else{
//                 console.log(info[i].name + " already has a " + info[i].license.name)
//             }
//         }
//     }else{
//         if(response.statusCode === 401){
//             console.log("Unauthorized")
//         }
//         console.log(body)
//     }
// }

// async function terminal(info){
//     await bash.clone(info.clone_url);
//     await bash.cd(info.name);
// }

function nextStep(error, response, body){
    console.log("\t\twe'll see")
}
// request(options, iterate);