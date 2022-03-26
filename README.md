# To Run
```
$ npm install
$ npm run start
```

This will start the server at port 3000.

# To Test
```
npm run test
```

# Schema
The `data/` directory shows examples of my Schema. I have a Link and a User entity.

Example Link:
```
{
    "id": "eadc61a8-ae0d-4f98-9070-266a8720fe7d",
    "title": "Music",
    "subtitle": "Song Name - Artists Name", 
    "dateCreated": "2022-03-25T10:56:14.319Z",
    "userId": "7b6a7baf-7beb-4aad-af54-d880db8fc0f5",
    "linkType": "musicPlayer",
    "linkTypeSpecificData": [
        { "platform": "spotify", "redirectLink": "spotify.com/song" },
        { "platform": "appleMusic", "redirectLink": "apple.com/song" }
    ]
}
```

Example User:
```
{ 
    "id": "7b6a7baf-7beb-4aad-af54-d880db8fc0f5", 
    "firstName": "Syam", 
    "lastName": "Iyer" 
}
```

# Endpoints
There are 2 endpoints:
1. Generate a link. Here is the example cURL:
```
curl --request POST \
  --url http://localhost:3000/user/7b6a7baf-7beb-4aad-af54-d880db8fc0f5/link \
  --header 'Content-Type: application/json' \
  --data '{
	"redirectLink": "https://me.com",
	"title": "48H",
	"linkType": "classic"
}'
```

2. Get all links for a user. Here is the example cURL:
```
curl --request GET \
  --url http://localhost:3000/user/7b6a7baf-7beb-4aad-af54-d880db8fc0f5/link
```

The `test/` directory simulates many of the different possible calls.

# Notes
1. There are some TODO's in there about what I'd do if I had more time.
2. The README mentioned 'Some URLs will contain query parameters, some will not.' I assume this means that the redirect link could have query parameters but I was unclear about this and how it would affect the site. As such I've planned to just keep as part of the redirect link.