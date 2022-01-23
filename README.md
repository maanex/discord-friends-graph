# Running this

Find your user token by going to your discord client devtools -> local storage or if you can't find it there look at the Authorization header of any outgoing api request.

1. `npm install`
2. `node ./scrape.js <user_token>`
3. `node ./view.js [port]`

alternative to step 3: serve ui.html with a server of your choice.

## note

This code is utter trash and all but I can't be bothered cleaning any of this up since it works and that's all it needs to do.

**Use at your own risk. Never share your user token with any program unless you fully understand how it works and what it does.**

## buttons

`space bar` toggle names

`+` zoom in

`-` zoom out

## screenshot

![screenshot](https://cdn.discordapp.com/attachments/816810550519660584/934757323547754526/unknown.png)

*(names hidden for privacy)*
