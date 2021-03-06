WMS West Coast Users Group 2018 Application
=============
This is a demonstration application written to how to interact with OCLC web service in Node.js. It uses best programming practices like 
- dependency management
- object-oriented programming
- model view controller (MVC) code structures
- unit testing

## Installation

### Step 1: Install from GitHub

In a Terminal Window

```bash
$ cd {yourGitHomeDirectory}
$ git clone https://github.com/OCLC-Developer-Network/wms_westcoast.git
$ cd wms_westcoast
```

### Step 2: Use npm to install the dependencies

```bash
$ npm install
```

### Step 3: Configure your environment file with your WSKey/secret and other info

```bash
$ cp test_config.yml prod_config.yml
$ vi prod_config.yml
```

Edit the following values
- wskey
- secret
- principalID
- principalIDNS
- institution

## Usage

### Start the built-in web server
```bash
$ npm start
```
### View the application
Point your web browser at the localhost address where these instructions will install it by default. 

[http://localhost:8000](http://localhost:8000)

## Running Tests

### Unit Tests
From the command line run

```bash
$ npm tests
```

## How this was built

For a step by step tutorial on this application see the [tutorial section](https://github.com/OCLC-Developer-Network/wms_westcoast/tree/master/tutorial)

