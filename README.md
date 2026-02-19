# japanese-dashboard
A dashboard that glues together your favorite Japanese learning tools. My first [Next.js](https://nextjs.org/) project.

Tools are organized into tabs. You'll find vocab cards, progress charts, and whatever else I could grab from the APIs.

There's also a self-hosted translation tool that uses [LibreTranslate](https://libretranslate.com/).

### WaniKani Tab
<img width="677" height="674" alt="wani_cap" src="https://github.com/user-attachments/assets/5a1be930-8fed-4c34-bc6d-ac1cddb1125b" /><br><br>

### Bunpro Tab
<img width="680" height="677" alt="bunpro_cap" src="https://github.com/user-attachments/assets/5e424574-173e-4b9f-aa40-f85b71b5f599" /><br><br>

### Translation Tab
<img width="683" height="512" alt="translate_cap" src="https://github.com/user-attachments/assets/17ae8a57-e1a9-487c-a79a-de9626ab1ab0" /><br><br>

## Setup
1. Clone the project
2. Build the Docker image from the project root
```shell
docker build -t <image_name> .
```
3. Start the Docker container ([next section](#api-tokens) explains where to get your API tokens) 
```shell
docker run -e "WANIKANI_API_KEY=<your_wanikani_token>" -e "BUNPRO_API_KEY=<your_bunpro_token>" -p 3000:3000 <image_name>
```
4. Open the app at `http://localhost:3000`<br><br>


## API Tokens
These are unique strings that give you access to each service. Here's how to get them. 

### Wanikani
`WANIKANI_API_KEY` is found on the [WaniKani website](https://www.wanikani.com/) under `Settings -> Api Tokens`.

When creating a token you may have to pick a permission type. "Read" permissions are enough for us.

### Bunpro
`BUNPRO_API_KEY` is a cookie we extract from the browser. I may circle back to automate this, but here's the manual technique for now:
- Login to [Bunpro](https://bunpro.jp)
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
