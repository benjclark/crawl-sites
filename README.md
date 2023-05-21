# Web crawler for visualising the usage of stylesheets across the various pages of a website

A web crawler in Node JS that identifies the stylesheets that are hosted and loaded on the domain of the site it crawls and exports the results to CSV.

1. `npm i`
2. `npm run nature` or `npm run bmc`
3. Results are in the csv directory. Import them into a Google Sheet

This solution could be adapted to also report on the use of js bundles. However we tend to dynamically build the script elements on the page which means this crawler can't assess them.
