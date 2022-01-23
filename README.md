# WARNING!

**Running this counts as self-botting and is prohibited by Discord's TOS. While you are probably fine running this, there is a small chance your account is getting flagged as a self-bot and eventually terminated.**

**Use at your own risk.**

**In general never share your user token with any program unless you fully understand how it works and what it does.**

I don't take any responsibility for any potential damage done by running this program.


## running this

Find your user token by going to your discord client devtools -> local storage or if you can't find it there look at the Authorization header of any outgoing api request.

1. `npm install`
2. `node ./scrape.js <user_token>`
3. `node ./view.js [port]`

## note

This code is utter trash and all but I can't be bothered cleaning any of this up since it works and that's all it needs to do.

It is a personal project that served it's purpose and I am not planning on making any updates or improving the ux. If you can't get it to run you probably shouldn't run it. I am not providing support.

## buttons

`space bar` toggle names

`+` zoom in

`-` zoom out

## screenshot

![screenshot](https://cdn.discordapp.com/attachments/816810550519660584/934757323547754526/unknown.png)

*(names in this screenshot are hidden for privacy)*
