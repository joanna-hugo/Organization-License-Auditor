const util = require('util');
const exec = util.promisify(require('child_process').exec);
var process = require('process');

const branch = 'addLicense';
exports.branch = branch;
exports.setup = async function (cloneURL, name, default_branch, origURL) {
    try {
        await exec("mkdir temp");
        process.chdir('./temp'); //When the Node process exists, you will find yourself back in the CWD you started the process in.
        await exec('git clone  ' + cloneURL).then(function (stdout) {
            if (stdout) console.log("cloned api");
        });
        process.chdir('./' + name);
        await exec('git remote add upstream ' + origURL).then(function (stdout) {
            if (stdout.stdout) console.log("added remote upstream")
        });
        await exec('git checkout -b ' + branch + " " + default_branch).then(function (stdout) { //TODO add the -b back to CREATE a new branch
            if (stdout) console.log("on new branch " + branch)
        })
    } catch (err) {
        console.error(err);
    }
};

exports.addLicense = async function (name) {
    try {
        process.chdir('../');
        process.chdir('../');
        await exec('cp LICENSE.txt ' + " ./temp").then(async function (stdout) {
            if (stdout) console.log("creating new license for repo")
        });
        process.chdir('./temp');
        await exec('mv LICENSE.txt ' + " ./" + name);
        process.chdir('./' + name);

        await exec('git add *');
        await exec('git commit -a -m "added license file"').then(function (stdout) {
            if (stdout.stdout) console.log("committed new license to repo");
        });
        await exec('git push  upstream ' + branch).then(function (stdout) { //TODO this is where my errors are coming from currently, try to set upstream EARLIER
            if (stdout.stdout) console.log("pushed changes to repo");
        });
    } catch (err) {
        console.error(err.stack);
        console.log("Believe in Christ")
    }
};

exports.cleanUp = async function (name) {
    try {
        process.chdir('../');
        process.chdir('../');
        await exec('rm -r temp');
        console.log('deleting temp folder and ' + name + ' repo');
    } catch (err) {
        console.error(err);
    }
};

