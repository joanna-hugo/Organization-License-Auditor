# Organization-License-Auditor

* Write code, in the language of your choice, that using the github API, goes through all the public and private github repos in a github organization and checks if they have a license.  
* Write code that if the license is missing, opens a pull request which adds a license. 

#Assumptions
* User does NOT have 2 factor authentication
* User has rights to see organization
    * user rights are not given to application, we will have to create a "dumb account" to give it access
        * also, I don't want to hard code my username/password etc.

# Break Down 
* I need to write a bash script that
    * clones the repo (where)
    * move into the repo
    * create a file for the license
    * make the license
    * what do I do from here with the commit/fork?
    * What do I do about different operating systems??
* Write a pull request that adds a license
    * How do I issue an automated pull request? 
        * https://developer.github.com/v3/pulls/
        https://developer.github.com/v3/pulls/#create-a-pull-request
        * https://www.npmjs.com/package/shelljs
    * How do I add a license? 
    * What license should I add?


# References
* GitHub API - https://developer.github.com/v3/
* Types of Accounts - https://help.github.com/en/articles/types-of-github-accounts
* Create an organization - https://github.com/account/organizations/new
* Licenses - https://choosealicense.com/ 
* Request Library - https://github.com/request/request
* How to run a bash script from nodeJS - https://medium.com/stackfame/how-to-run-shell-script-file-or-command-using-nodejs-b9f2455cb6b7
* Overall flow - https://gist.github.com/Chaser324/ce0505fbed06b947d962

#Questions
* Edge cases
    * Authorization
    * different branches
* What is the most secure way to do authorization?
    * https://github.blog/2013-05-16-personal-api-tokens/
    *  make use of the authorizations endpoint to generate tokens instead of storing your password.
* Misc. Auth Questions
    * "For organization-owned repositories, you must be a member of the organization that owns the repository to open or update a pull request."
