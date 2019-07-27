const request = require('request');
const bash = require('./bash.js');
const rp =require('request-promise');
const string = require('./secure');

let org = process.argv[2]; //following the pattern 'node index.js orgName" this will give us the organization from the terminal
const options = {
    url: 'https://api.github.com/orgs/' + org + '/repos',
    headers: {
        'User-Agent': string.username,
        json : true,
        Authorization: "token " + string.OAuthToken
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
        console.error(err.message);
        console.error(err.stack)
    });

async function forkRepo(info){
    // POST /repos/:owner/:repo/forks
    let forkOptions = {
        url: 'https://api.github.com/repos/' + info.owner.login + '/' + info.name + '/forks',
        method : "POST",
        headers: {
            'User-Agent': string.username,
            Authorization: "token " + string.OAuthToken
        }
    };
    if(info.owner.type === "Organization"){
        forkOptions.headers.organization = info.owner.login
    }
    origURL = info.clone_url;
    let pullURL =  info.pulls_url;
    await rp(forkOptions)
        .then(async function(info){
            info=JSON.parse(info);
            if(info.fork) {
                await terminal(info, origURL, pullURL)
            }
        })
        .catch(function(error){
            console.log(error.message)
        })
}

async function terminal(info, origURL, pullURL){
    await bash.setup(info.clone_url, info.name, info.default_branch, origURL);
    await bash.addLicense(info.name);
    await pullReqst(info, pullURL);
    await bash.cleanUp(info.name);
    console.log("done working with " + info.name + "\n")
}

async function pullReqst(info, pullURL){
    let options = {
        url: pullURL.slice(0,-9), //this removes {/number} from the end of the given url
        method: "POST",
        headers: {
            'User-Agent': string.username,
            json : true,
            Authorization: "token " + string.OAuthToken,
            Accept: "application/vnd.github.v3+json"
        },
        body : {
            title: "Added License",
            body: "I have added a license. Near the body of the document, replace [yyyy] [name] with the appropriate name and date",
            head: string.username + ":"+bash.branch,
            base: "master",
            maintainer_can_modify : true
        },
        json: true,
        resolve_with_full_response : true,
    };
    console.log("calling " + options.url);
    await rp(options)
        .then(async function (info){
            console.log("successfully issued a pull request")
        })
        .catch(function (error){
            console.error("ERROR");
            console.error(JSON.stringify(error.error.errors[0]));
        })
}