const request = require('request');
const bash = require('./bash.js');
const rp =require('request-promise');

let org = process.argv[2]; //following the pattern 'node index.js orgName" this will give us the organization from the terminal
const authToken = "605f6d3dc4e0bf016d029361387af6fdafb0c989";
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
                await forkRepo(info[i])
            }else{
                console.log(info[i].name + " already has a " + info[i].license.name)
            }
        }
    })
    .catch(function (err) {

    });

async function forkRepo(info){
    // POST /repos/:owner/:repo/forks
    console.log("attempting to fork " + info.name);
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
    await rp(forkOptions)
        .then(async function(info){
            console.log("forked repo?");
            info=JSON.parse(info);
            if(info.fork) {
                await terminal(info)
            }
        })
        .catch(function(error){
            console.log(error.message)
        })
}


async function terminal(info){
    console.log("attempting to clone and create license for " + info.name );
    await bash.clone(info.clone_url);
    await bash.cp(info.name);
    await pullReqst(info)
    await bash.cleanUp(info.name);
    console.log("done working with " + info.name + "\n\n\n")
}

async function pullReqst(info){
    let options = {
        url: info.pulls_url.slice(0,-9), //this removes {/number} from the end of the given url
        method: "POST",
        headers: {
            'User-Agent': 'ukefan42',
            json : true,
            Authorization: "token " + authToken
        },
        body : {
            title: "Added License",
            body: "I have added a license. Near the body of the document, replace [yyyy] [name] with the appropriate name and date",
            head: "ukefan42:iss11",
            base: "master",
            maintainer_can_modify : true
        },
        json: true
    };
    rp(options)
        .then(async function (info){
            info = JSON.parse(info);
            console.log(info)
        })
        .catch(function (error){
            // error = JSON.parse(error);
            console.error("ERROR");
            console.error(JSON.stringify(error.error.errors[0]));
        })
}

// async function clone(info){
//     if(info.message === "The repository exists, but it contains no Git content. Empty repositories cannot be forked."){
//         let path = response.req.path; //  /repos/ukulele-fan-club/ConcertsAPI/forks
//         let repo = path.split("/")[3];
//         console.log("Unable to fork " + repo + " because it is empty")
//         return
//     }
//     let cloneOptions = {
//         url: info.clone_url,
//         method : "POST",
//         headers: {
//             'User-Agent': 'ukefan42',
//             Authorization: "token " + authToken
//         }
//     };
//     await rp(cloneOptions)
//         .then(function(info){
//         info = JSON.parse(info);
//         console.log(info);
//     })
//     .catch(function(error){
//         // currently getting a 301, MOVED PERMANENTLY when calling info.clone_url
//             console.log(error.statusCode)
//     })
// }
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

function nextStep(error, response, body){
    console.log("\t\twe'll see")
}
// request(options, iterate);