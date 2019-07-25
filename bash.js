const util = require('util');
const exec = util.promisify(require('child_process').exec);
var process = require('process');


/*
* I need to write a bash script that
* clones the repo (where)
*   git setup ""
* move into the repo
*   cd ""
* create a file for the license
*
* make the license
* what do I do from here with the commit/fork?
*/
const branch = 'iss20';
exports.setup = async function(cloneURL, name) {
    console.log("\t\tsetup func " + cloneURL)
    try {
        // await exec('cd temp' ).then(async function(stdout){
        //     if(stdout.stdout)console.log(stdout.stdout);
        //     else console.log("moved into temp directory, will pwd");
        //     await exec('pwd').then(function(stdout){
        //         console.log(stdout.stdout);
        //     })
        // });
        await exec("mkdir temp");
        process.chdir('./temp')//When the Node process exists, you will find yourself back in the CWD you started the process in.
        await exec('git clone  ' + cloneURL).then(async function(stdout, stderr){
            console.log(stdout.stderr);
            // console.log(stderr);
        });
        process.chdir('./'+name);
        console.log("hopefully moved into " + name);
        await exec('git checkout master').then(function(stdout){
            if(stdout.stdout)console.log(stdout.stdout)
        });
        await exec('git checkout -b ' + branch).then(function(stdout){ //TODO add the -b back to CREATE a new branch
            console.log(stdout.stderr)
        })
    }catch (err){
        console.error(err);
    }
};



exports.addLicense = async function(name, url){
    try {
        await exec('pwd').then(function(info){
            console.log(info.stdout)
        });
        process.chdir('../');
        process.chdir('../');
        await exec('pwd').then(function(info){
            console.log(info.stdout)
        });
        // await exec('cp  exampleLicense LICENSE.txt ').then(async function(stdout, stderr){
        //     // console.log('copying license into ' + name + ' folder');
        //     // console.log('stderr:', stderr);
        //     if(stderr){
        //         console.log(stderr)
        //     }
        //     else{
        //         console.log("created license for " + name);
        //     }
        // });
        await exec('cp LICENSE.txt ' + " ./temp").then(async function(stdout){
            if(stdout.stdout) console.log(stdout.stdout);
            if(stdout.stderr) console.log(stdout.stderr);
        });
        process.chdir('./temp');

        await exec('mv LICENSE.txt ' + " ./" + name).then(async function(stdout){
            if(stdout.stdout) console.log(stdout.stdout);
            if(stdout.stderr) console.log(stdout.stderr);
        });
        process.chdir('./' + name);
        console.log("hopefully moved into " + name);

        // await exec('cd ' + name).then(function(stdout){
        //     if(stdout.stdout)console.log(stdout.stdout)
        //     else console.log("moved into " + name)
        // });
        // await exec('git push -u origin ' + branch).then(async function(stdout) {
        //     if (stdout.stdout) console.log(stdout.stdout);
        //     if (stdout.stderr) console.log(stdout.stderr)
        // });
        // await exec('git request-pull -p ' + branch + ' ' + url +' master').then(async function(stdout) {
        //     if (stdout.stdout) console.log(stdout.stdout);
        //     if (stdout.stderr) console.log(stdout.stderr)
        // });
        await exec('git add *').then(function(stdout){
            if(stdout.stdout)console.log(stdout.stdout);
        });
        await exec('git commit -a -m "added license file"').then(function(stdout){
            if(stdout.stdout)console.log(stdout.stdout);
        });
        await exec('git push --set-upstream origin ' + branch + ' -f').then(function(stdout){
            if(stdout.stdout)console.log(stdout.stdout);
        })

    }catch (err){
        console.error(err.stack);
        await exec('pwd').then(function(info){
            console.log(info.stdout)
        });
    }
};

exports.cleanUp = async function(name) {
    try {
        const { stdout, stderr } = await exec('rm -r ' + name);
        console.log('deletinng ' + name + ' folder');
        // await exec('cd ..' + name).then(async function(){
        //     await exec('rm -r' + name).then(function(stdout){
        //         if(stdout.stdout)console.log(stdout.stdout)
        //     });
        // });
    }catch (err){
        console.error(err);
    }
};

