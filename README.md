# Organization-License-Auditor

# Prompt
* Write code, in the language of your choice, that using the github API, goes through all the public and private github repos in a github organization and checks if they have a license.  
* Write code that if the license is missing, opens a pull request which adds a license. 

# Instructions
From the command line, inside the root of the directory tree,  enter `node index [org-name]` replacing `[org-name]` for the appropriate organization.
For example `node index ukulele-fan-club`

You will need to enter a valid username and corresponding OAuth token (with repo rights) into the provided `secure.js` file. 
I am unable to provide the credentials for my dummy-account I used during testing as that would invalidate my token. 

My code is able to identify repositories inside an organization that are lacking a license, fork those repositories, add a license, and commit and push those changes to a branch. 
However, this code is currently unable to successfully complete a pull-request, although I have included my attempt. 

# Assumptions
* User has created a local secure.js file in the root of this repository to safely store their valid OAuth token and username
* User does NOT have 2 factor authentication
* Given OAuth token has repo rights 
* User is a member of the organization, the organization exists
* Hardcoded branch name is not currently in use 

# Possible Improvements
* Utilizing AWS lambdas 
* Checking to make sure branch name not already in use
* More and more robust error messages
* Automatic authorization checking
* Suggesting most appropriate license
* Using information in the repo, to suggest a name and date for the license (eg. 2019 Joanna Hugo)

# Note 
Although I am proud of the work I have accomplished, I was unable to complete this project to my standards. 
This week has been filled with several unwelcome surprises, including a dead animal in our vent at home and an emergency 
that required a lot of my attention as the Young Women's President in my ward. 
These emergencies have necessitated hours of cleaning, repairs, meetings, and phone calls that I had not planned on. 
I do not say this in any way to excuse myself, I simply wish to explain my situation.

While my code may not be up to my highest standard, I hope that my actions of ministering exemplify BYU’s mission to “Go Forth and Serve”. 
Thank you for your consideration, I look forward to meeting with you. 

