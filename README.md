# Linktree tech test
# To run
- npm install
- npm run start

# Endpoint
- POST /generateLink
- Requires: 'linkType' - this is an int indicating the type (0 for classic, 1 for shows list and 2 for music). I'd imagine the frontend would also use an enum to keep track of this, which is why it was an int
- Requires: 'userId' - this can be any string
- Requires: 'linkSpecificData' - this is a dictionary

curl example of successfully creating a song link: \
curl --location --request POST 'http://localhost:8080/generateLink' \
--header 'Content-Type: application/json' \
--data-raw '{
    "linkType": 2, 
    "linkSpecificData": {
            "title": "New song!",
            "songLinks": [
                { "platform": 0, "platformLink": "spotify.com/song" },
                { "platform": 1, "platformLink": "apple.com/song" }
            ]
        }, 
    "userId": "myUserId"
}'

 
# To test
- npm install
- npm run test

## Assumptions I made (note: please let me know if these assumptions are incorrect and I can amend my code)
- All links (including the show list link and music player link) also require a title under 144 characters
- Each song link MUST have a supported platform
- Each show link MUST have a showStatus (e.g. sold out, on sale or not yet on sale)
- Wasn't sure what the query params for a classic link meant. Did that mean the client could set a query param in the generated link?
- I didn't store the created links (in a file or a DB) as the spec said not to use a database (but you can see what my schema would've looked like if you go to src/utilities/interfaces.ts and see the Link interface)
- As there is no storage, there is no function to get the data by userId or dateCreated

Like I said, sorry if I misunderstood something, I'm happy to take on feedback :) 

## Extendability (please have a look at the TODO comments, but I'll write them here too):
- Move endpoints out of the index file
- Write a sign up/sign in endpoint and have private endpoints such as /generateLink use a JWT token. Get the user ID from the bearer token rather than as a body param
- Verify that the random ID is not already in use 
- Upload newLink to a storage
