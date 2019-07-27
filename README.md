# Organization-License-Auditor

#Prompt
* Write code, in the language of your choice, that using the github API, goes through all the public and private github repos in a github organization and checks if they have a license.  
* Write code that if the license is missing, opens a pull request which adds a license. 

#Instructions
From the command line, inside the root of the directory tree,  enter `node index [org-name]` replacing `[org-name]` for the appropriate organization.
For example `node index ukulele-fan-club`

#Assumptions
* User has created a local secure.js file in the root of this repository to safely store their valid OAuth token and username
* User does NOT have 2 factor authentication
* Given OAuth token has repo rights 
* User is a member of the organization, the organization exists
* Hardcoded branch name is not currently in use 

#Possible Improvements
* Utilizing AWS lambdas 
* Checking to make sure branch name not already in use
* More and more robust error messages
* Automatic authorization checking
* Suggesting most appropriate license
* Using information in the repo, to suggest a name and date for the license (eg. 2019 Joanna Hugo)

# References
* GitHub API - https://developer.github.com/v3/
* Types of Accounts - https://help.github.com/en/articles/types-of-github-accounts
* Create an organization - https://github.com/account/organizations/new
* Licenses - https://choosealicense.com/ 
* Request Library - https://github.com/request/request
* How to run a bash script from nodeJS - https://medium.com/stackfame/how-to-run-shell-script-file-or-command-using-nodejs-b9f2455cb6b7
* Overall flow - https://gist.github.com/Chaser324/ce0505fbed06b947d962
* Ovarall flow 2.0 - https://blog.scottlowe.org/2015/01/27/using-fork-branch-git-workflow/
* Git Login terminal - https://stackoverflow.com/questions/34731832/login-to-github-from-command-line-with-multiple-accounts
* Add SSH leys - https://gist.github.com/adamjohnson/5682757
