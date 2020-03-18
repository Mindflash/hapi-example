# Setup

 * Clone this repository to your local machine.
 * Make sure you are have node v8.9.4 or higher
 * Run `npm install` 
 
# Endpoints
* GET `http://localhost:8080/products` - Lists all products in the system.
* GET `http://localhost:8080/products?name=foo` - Lists all products with the name `foo`.
* GET `http://localhost:8080/products/123` - Returns a single product that has id 123.
* POST `http://localhost:8080/products` - Creates a new product.
    * JSON body must include a name and price, and optionally a description.
    * Name should be a string between 3 and 100 characters
    * Description should be a string between 5 and 1,000 characters
    * Price should be a number between 1 and 20,000 with no more than 2 decimal places
    * Here is an example payload:
    
    ```javascript
        {
            name: 'Chinese Golden Thread Turtle',
            description: 'Chinese Golden Thread Turtles (Ocadia sinensis) are found in the lowland swamps, ponds and marshes of southern China, Taiwan and North Vietnam. They are well known for their very pretty yellow green to golden head and neck stripes, Golden Thread turtles are very active swimmers and bask frequently.',
            price: 179.00
        }
    ```

## Running the server
Run `yarn run start` or `node server.js` to start the server.
Now you can navigate to <http://localhost:8080/docs> to see the documentation for the routes.
To see a list of the products navigate to <http://localhost:8080/products>.

## Running the tests
Run `yarn run test` to run the tests.  To produce the coverage report, run `yarn run test:coverage` and open the coverage.html page to see the report.
