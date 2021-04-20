<img src="atom.png"  width="200" height="60">

## Country Comparison API

### What is this?

The Country Comparison API will use data from a 3rd party provider, [api.population.io](http://api.population.io)<sup>[1](#footnote1)</sup>, to provide comparisons on population statistics.  Your colleague Joe Coder started the implementation (in Node.js v10 using restify), and now it's your turn to bring it to the next level.  

Our current stack is primarily built in Node.js, Golang, and .NET.  Since this service is just getting off the ground, if you'd rather implement this in a different language, feel free to do so.

### Setup

1. Download the repo
2. Run `npm install` to install dependencies
3. Run `npm test` to run unit tests
4. Set your NODE_ENV to `dev`
5. Run `npm start` to start the server
6. To check documentation please visit `http://localhost:3000/docs`

### Requirements

Joe created one endpoint that retrieves a list of country names, using mock data.

1. Update the endpoint to pull country data from http://api.population.io/1.0/countries.
2. The endpoint http://api.population.io/1.0/population/:country/:date returns the total population for a given country on a given date.  Design and implement an endpoint in our API that will allow a consumer to specify an arbitrary set of countries and an optional sort order, and receive back a list of countries and their population based on the current date.  If a sort order was specified, return the list sorted on population size, according to the consumer's requested sort order.

Try to be consistent with Joe's implementation in terms of:
* unit tests
* documentation
* error handling
* response codes
* validation
* etc.

Zip your solution, upload it somewhere, and send us a link to the zipped file.

### Bonus
1. Some scenarios to consider (leave your thoughts inline in your code or edit the README):
  * How efficient is your code?  What are some ways that you could improve performance?
  > Ans: Considering the latency of the external API, the code should work fine ideally with 150 requests per minute with a single worker. One can improve the performance by caching(redis) the responses with a 30 min expiry along with horizontally scalling the servers.

  * Suppose we expect this API to be hit 1000s of times a second.  How can we handle the load?
  > Ans: Distributing the load gracefully using Load balancers along with horizontally scalling the servers and having a caching layer which helps in reducing the response time of the API significantly this in turns will help in scaling the system.

  * What if the 3rd party provider is not available?  How resilient is our API?
  > Ans: On failure of the 3rd party API, It will help the developer to identify for which country the API failed hence using that he can make further decisions. All in all, considering the user in mind the API is build to be robust & resiliant to never throw an outbound error which can lead to user disappointment.

  * What if the requirement for the new endpoint was to also allow the consumer to compare populations for any given date.  How would you modify your implementation?
  > Ans: Since I have a genric function available to get the population of a country, the only change I need to make is pass the date along with country which will help in retrieving data for a particular date and hence compare it in the endpoint functionality and return the same.

  * What if we have a database of users and we wanted to make our API smarter by defaulting comparisons to always include the population of the current user's country.  How could we accomplish this?
  > Ans: By caching the same users data to redis on creation or update, we can retrieve the users country pretty fast when the user makes an API request and hence we can inculde the country in the response of the same request. 

  * What if we wanted to keep a tally of the most frequently requested countries and have this be available to consumers.  How could we accomplish this?
  > Ans: We can have a collection which can have a tally of countries which are hit the maximum times, hence whenever a request is made we can update the db(with an async job) with the count which can be used to retrieve the most frequently requested countries.

2. Dockerize the API
 > Ans: Please check the Dockerfile.

<br>
<i><a name="footnote1"><sup>1</sup></a> Joe says that api.population.io is down, so try https://d6wn6bmjj722w.population.io/ as the host instead.<i>
