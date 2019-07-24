const util = require('util');
const exec = util.promisify(require('child_process').exec);

/*
* I need to write a bash script that
* clones the repo (where)
*   git clone ""
* move into the repo
*   cd ""
* create a file for the license
*
* make the license
* what do I do from here with the commit/fork?
*/
exports.clone = async function(cloneURL) {
    try {
        const { stdout, stderr } = await exec('git clone  ' + cloneURL);
        // console.log('stdout:', stdout);
        console.log(stderr);
    }catch (err){
        console.error(err);
    }
};

exports.cd = async function(name) {
    try {
        const { stdout, stderr } = await exec('cd ' + name);
        console.log('moving into ' + name + ' folder');
        // console.log('stderr:', stderr);
    }catch (err){
        console.error(err);
    }
};

