# foodelicious-view


Prerequisites:
- Grunt
- Foodelicious backend

## Get Started

1. git clone https://github.com/mariusbreivik/foodelicious-view.git
2. mvn package
3. java -jar target/foodelicious.jar server ./foodelicious.yml
4. open http://localhost:8080/index.html  with a prefered browser


## Development

### Set up grunt
First you need 'node'. On OS X you can do this with homebrew:

    brew install node

Then you need grunt:

    npm install -g grunt-cli

Now you have both node and grunt. The next step is to install the project dependencies. Run:

    npm install

This should install required dependencies (which are specified in package.json).

Now you can run the configured grunt tasks.

* grunt jshint - this will check our javascript files for any stupid mistakes
* grunt server - this will host our static resources (on port 8090) and a proxy that proxies calls to our dropwizard backend. This assumes a running foodelicious dropwiard service at port 8080.
