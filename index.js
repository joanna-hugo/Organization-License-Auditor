const request = require('request');
const bash = require('./bash.js');
const rp =require('request-promise');

let org = process.argv[2]; //following the pattern 'node index.js orgName" this will give us the organization from the terminal
const authToken = "a8080c4987d13b1ee4db2f504c7e344226c7f9f0";
const options = {
    url: 'https://api.github.com/orgs/' + org + '/repos',
    headers: {
        'User-Agent': 'ukefan42',
        json : true,
        Authorization: "token " + authToken
    }
};
console.log("huh.");
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
        console.log("something bad happened in the root")
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
    console.log("attempting to setup and create license for " + info.name );
    await bash.setup(info.clone_url, info.name);
    await bash.addLicense(info.name, info.url);
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
            head: "iss11",
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