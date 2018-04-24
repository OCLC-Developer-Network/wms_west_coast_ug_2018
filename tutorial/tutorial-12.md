# A Beginner's Guide to Working with OCLC APIs
## WMS User Group - West Coast: Pre-Conference Workshop
### Tutorial Part 12 - Testing Basics

#### Unit testing code
1. Make sure you are in the base project directory
2. Run the unit tests 
```bash
$ npm test
```

#### Testing mock application via web browser
1. Create file test.js
2. Open test.js and add the following

```
const fs = require('fs');
const yaml = require('js-yaml');
const get_config = require("./src/config.js");
const moxios = require('moxios');
const access_token = fs.readFileSync(require('path').resolve(__dirname, 'test/mocks/access_token.json')).toString();
const bib_response = fs.readFileSync(require('path').resolve(__dirname, 'test/mocks/bibResponse.xml')).toString();
const error_response_401 = fs.readFileSync(require('path').resolve(__dirname, 'test/mocks/errorResponse.xml')).toString();
const error_response_403 = fs.readFileSync(require('path').resolve(__dirname, 'test/mocks/errorResponse_403.xml')).toString();
const error_response_404 = fs.readFileSync(require('path').resolve(__dirname, 'test/mocks/errorResponse_404.xml')).toString();


moxios.install();

// get a valid token
moxios.stubRequest('https://authn.sd00.worldcat.org/oauth2/accessToken?grant_type=client_credentials&authenticatingInstitutionId=128807&contextInstitutionId=128807&scope=WorldCatMetadataAPI', {
      status: 200,
      responseText: access_token
});

moxios.stubRequest('https://worldcat.org/bib/data/70775700', {
    status: 200,
    responseText: bib_response
  }); 

moxios.stubRequest('https://worldcat.org/bib/data/401', {
      status: 401,
      responseText: error_response_401
});

moxios.stubRequest('https://worldcat.org/bib/data/403', {
      status: 403,
      responseText: error_response_403
});

moxios.stubRequest('https://worldcat.org/bib/data/404', {
      status: 404,
      responseText: error_response_404
});

let environment = "test";

const decrypt = require("./src/config.js");
global.config = "";
global.config = yaml.load(get_config(environment));
let app = require('./src/server.js');
let port = process.env.PORT || 8000;

// Server
app.listen(port, () => {
    console.log(`Listening on: http://localhost:${port}`);
});
```

3. Start the built-in Node.js web server with test.js
```bash
$ nodemon test.js
``` 

4. You can do any of the following
- Search for OCLC Number - http://localhost:8000 enter 70775700 in search box
- View OCLC Number - http://localhost:8000/bib/70775700
- See Authentication error - http://localhost:8000/bib/401
- See Authorization Error - http://localhost:8000/bib/403

#### Testing live application by hand via a web browser
1. Make sure you are in the base project directory
2. Start the built-in Node.js web server
```bash
$ npm start
```
3. Go to web browser to view application at http://localhost:8000

**[back to Part 11](tutorial-11.md)**