import fetch from 'node-fetch';
import {parse} from 'node-html-parser';

const getStylesheets = async url => {
    const response =  await fetch(url);
    const body = await response.text();
    const root = parse(body);

    // console.log(response.ok);
    // console.log(response.status);
    // console.log(response.statusText);
    // console.log(response.headers.raw());
    // console.log(response.headers.get('content-type'));
    // console.log(root.querySelector('link[rel="stylesheet"]'));
    const links = root.querySelectorAll('link[rel="stylesheet"]');
    const stylesheets = links.map(el => el._attrs.href);
    console.log(url + ' has the follow stylesheets:\n', stylesheets);
    return stylesheets;
}

getStylesheets('https://www.biomedcentral.com');