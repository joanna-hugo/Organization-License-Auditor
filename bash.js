const util = require('util');
const exec = util.promisify(require('child_process').exec);

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
const branch = 'iss11';
exports.setup = async function(cloneURL, name) {
    console.log("\t\tgoing to try and setup " + cloneURL)
    try {
        await exec('cd ..' ).then(function(stdout){
            if(stdout.stdout)console.log(stdout.stdout)
            else console.log("moved up a level " + name)
        });
        await exec('git clone  ' + cloneURL).then(async function(stdout, stderr){
            console.log(stdout.stderr);
            // console.log(stderr);
        });
        await exec('cd ' + name).then(function(stdout){
            if(stdout.stdout)console.log(stdout.stdout)
            else console.log("moved into " + name)
        });
        await exec('git checkout master').then(function(stdout){
            if(stdout.stdout)console.log(stdout.stdout)
        });
        await exec('git checkout ' + branch).then(function(stdout){ //TODO add the -b back to CREATE a new branch
            console.log(stdout.stderr)
        })
    }catch (err){
        console.error(err);
    }
};

cd = async function(name) {
    try {
        const { stdout, stderr } = await exec('cd ' + name);
        console.log('moving into ' + name + ' folder');
    }catch (err){
        console.error(err);
    }
};

exports.addLicense = async function(name, url){
    try {
        await exec('cp  exampleLicense LICENSE.txt ').then(async function(stdout, stderr){
            // console.log('copying license into ' + name + ' folder');
            // console.log('stderr:', stderr);
            if(stderr){
                console.log(stderr)
            }
            else{
                console.log("created license for " + name);
            }
        });
        await exec('mv LICENSE.txt ' + name).then(async function(stdout){
            if(stdout.stdout) console.log(stdout.stdout);
            if(stdout.stderr) console.log(stdout.stderr);
            await cd(name);
            console.log("moved into sub-repo");
        });
        await exec('cd ' + name).then(function(stdout){
            if(stdout.stdout)console.log(stdout.stdout)
            else console.log("moved into " + name)
        });
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
            else console.log("moved into " + name)
        });
        await exec('git commit -a -m "added license file"').then(function(stdout){
            if(stdout.stdout)console.log(stdout.stdout);
            else console.log("moved into " + name)
        });
        await exec('git push --set-upstream origin ' + branch).then(function(stdout){
            if(stdout.stdout)console.log(stdout.stdout);
            else console.log("moved into " + name)
        })

    }catch (err){
        console.error(err);
    }
};

exports.cleanUp = async function(name) {
    try {
        const { stdout, stderr } = await exec('rm -r ' + name);
        console.log('deletinng ' + name + ' folder');
        await exec('cd ..' + name).then(async function(){
            await exec('rm -r' + name).then(function(stdout){
                if(stdout.stdout)console.log(stdout.stdout)
            });
        });
    }catch (err){
        console.error(err);
    }
};

