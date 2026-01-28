# japanese-dashboard
Dashboard that glues together Japanese learning tools.

# Setup
1. Clone the project and run `npm install` from the base directory
2. Get the API tokens for Bunpro and WaniKani (explained below)
3. Start the server with `npm run dev`
4. View dashboard on `localhost:3000`

# API Tokens
Create an .env.local file in the base directory with these two lines:
```dotenv
WANIKANI_API_KEY={value}
BUNPRO_API_KEY={value}
``` 

`WANIKANI_API_KEY` is found on the WaniKani website under Settings -> Api Tokens. Replace `{value}` above with your token string. 

`BUNPRO_API_KEY` is a cookie we extract from the browser. I plan to automate this later, but here are the manual steps for now:
- Login to Bunpro
- Open the web console (F12 on most browsers)
- Paste the below code and click 'Enter'
```javascript
(function() {
  const name = 'frontend_api_token='
	const cookies = document.cookie.split(";")
	for (let cookie of cookies) {
		cookie = cookie.trim()
		if (cookie.startsWith(name)) {
			return decodeURIComponent(cookie.substring(name.length))
		}
	}
	return undefined
})()
```
