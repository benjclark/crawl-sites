const request = require('request');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');

const arg1 = process.argv.slice(2)[0];
const arg2 = process.argv.slice(2)[1];

const crawlSite  = (url, siteName) => {
    const pagesVisited = new Set();
    const baseUrl = `${url}`;
    const outputFileName = `csv/crawled_${siteName}_pages-`;

    const ignore = [
        'mailto',
        '/#',
        'javascript:'
    ];

    const createFile = (fileName) => {
        let date = new Date().toLocaleString();
        date = date.replace(/[\W_]+/g,"-");

        const name = `${fileName}` + date + '.csv';
        const filePath = path.join(__dirname, name);
        console.log('filePath is ', filePath)

        fs.writeFile(filePath, '', (err) => {
            if (err) throw err;
            console.log(`The file "${name}" has been created.`);
        });
        return `${name}`;
    }

    const file = createFile(outputFileName);

    const crawl = function(url) {
        if (pagesVisited.has(url)) {
            return;
        }
        pagesVisited.add(url);

        request(url, function(error, response, body) {
            if (error) {
                const shouldIgnore = ignore.some(ignoreString => {
                    return `${error}`.includes(ignoreString);
                })
                if (shouldIgnore) {
                    return;
                }
                console.log(`Error: ${error}`);
                return;
            }

            const $ = cheerio.load(body);
            console.log(`Crawled: ${url}`);
            const stylesheets = $('link[rel="stylesheet"]')
                .map((i, el) => $(el).attr('href'))
                .get()
                .filter((stylesheetUrl) => {
                    if (stylesheetUrl.indexOf('/static/css/') > -1) {
                        return stylesheetUrl;
                    }
                });
            // const javascriptBundles = $('script[src]')
            //     .map((i, el) => $(el).attr('src'))
            //     .get()
            //     .filter((jsBundleUrl) => {
            //         console.log('jsBundleUrl ', jsBundleUrl)
            //         if (jsBundleUrl.indexOf('/static/js/') > -1) {
            //             return jsBundleUrl;
            //         }
            //     });
            // console.log(`JavaScript bundles: ${javascriptBundles.join(', ')}`);

            // if (stylesheets || javascriptBundles) {
            //     fs.appendFileSync(outputFileName, `${url},${stylesheets.join(',')},${javascriptBundles.join(',')}\n`);
            // }

            if (stylesheets.length > 0) {
                console.log(`Stylesheets: ${stylesheets.join(', ')}`);
                fs.appendFileSync(file, `${url},${stylesheets.join(',')}\n`);
            }

            $('a[href]').map((i, el) => $(el).attr('href')).get().forEach((link) => {
                if (link.startsWith('/')) {
                    link = baseUrl + link;
                }
                if (link.includes(baseUrl)) {
                    crawl(link, file);
                }
            });
        });
    };

    crawl(baseUrl);
}

crawlSite(arg1, arg2);
