# Organization-License-Auditor

* Write code, in the language of your choice, that using the github API, goes through all the public and private github repos in a github organization and checks if they have a license.  
* Write code that if the license is missing, opens a pull request which adds a license. 

#Assumptions
* User does NOT have 2 factor authentication
* User has rights to see organization
    * user rights are not given to application, we will have to create a "dumb account" to give it access
        * also, I don't want to hard code my username/password etc.

# Break Down 
* Iterate through all repos in an organization (can I filter?)
    * How do I call the API? 
        * curl -u ukefan42 https://api.github.com/orgs/ukulele-fan-club/repos
    * Should I iterate or filter? 
        * iterate, returns an array of json objects
* Check to see if they have a license
    * How do I check if a repo has a license? 
    * Any license valid?
* Write a pull request that adds a license
    * How do I issue an automated pull request? 
        * https://developer.github.com/v3/pulls/
    * How do I add a license? 
    * What license should I add?

# References
* GitHub API - https://developer.github.com/v3/
* Types of Accounts - https://help.github.com/en/articles/types-of-github-accounts
* Create an organization - https://github.com/account/organizations/new
* Licenses - https://choosealicense.com/ 
* Request Library - https://github.com/request/request

#Questions
* What is the most secure way to do authorization?
    * https://github.blog/2013-05-16-personal-api-tokens/
    *  make use of the authorizations endpoint to generate tokens instead of storing your password.
