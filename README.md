# Web crawler for visualising rendering of stylesheets and js bundles

A web crawler in Node JS that identifies stylesheets and js bundles hosted on the domain of the site it crawls and exports the results to CSV

1. `npm i`
2. `npm run nature` or `npm run bmc`
3. Results are in the csv directory. Import them into a Google Sheet

At the mo it's just outputting data for stylesheets. It has the code to do js bundle too if you want it to. However we tend to dynamically build the script elements on the page which means this crawler can't assess them.