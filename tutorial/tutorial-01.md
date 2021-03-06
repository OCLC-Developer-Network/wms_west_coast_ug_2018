# A Beginner's Guide to Working with OCLC APIs
## WMS User Group - West Coast: Pre-Conference Workshop
### Tutorial Part 1 - Project Overview

1. What we're going to build.
	* We're going to build a simple web application that allows you to search WorldCat bibliographic records by OCLC number and display selected metadata from the record.
2. In order to build this app, we're going to deploy the following tools and best practices:
	1. Model-view-controller architecture (specifically the [Express framework](https://expressjs.com/))
	2. The [WorldCat Metadata API](https://www.oclc.org/developer/develop/web-services/worldcat-metadata-api.en.html)
	3. OCLC's [Node Authentication Library](https://github.com/OCLC-Developer-Network/oclc-auth-node) to support web service authentication
	4. Dependency management via [NPM](https://www.npmjs.com)
	5. An external [Node library for parsing MARC records](https://github.com/jiaola/marc4js)
	6. Unit testing via [Mocha](https://mochajs.org/) and [Chai](http://www.chaijs.com/)

**[on to Part 2](tutorial-02.md)**

**[back to Prepare](prepare.md)**