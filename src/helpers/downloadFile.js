//Source: https://gist.github.com/falkolab/f160f446d0bda8a69172#gistcomment-2977733

const { parse } = require('url');
const http = require('https');
const fs = require('fs');
const { basename } = require('path');

const TIMEOUT = 10000;

function download(url, path, cb, passThrough) {
    const uri = parse(url);
    if (!path) {
        path = basename(uri.path);
    }

    let dir = path.substring(0, path.lastIndexOf('/'));
    if(!fs.existsSync(dir)) {
        fs.mkdirSync(path.substring(0, path.lastIndexOf('/')));
    }

    const file = fs.createWriteStream(path);

    return new Promise(function(resolve, reject) {
        const request = http.get(uri.href).on('response', function(res) {

            if (res.statusCode === 200) {
                const len = parseInt(res.headers['content-length'], 10);
                let downloaded = 0;
                let percent = 0;
                res
                    .on('data', function(chunk) {
                        file.write(chunk);
                        downloaded += chunk.length;
                        percent = (100.0 * downloaded / len).toFixed(2);
                        console.log(downloaded + ' ' + percent);
                        if(typeof cb === 'function')
                            cb(downloaded, percent, passThrough);
                    })
                    .on('end', function() {
                        file.end();
                        console.log(`${uri.path} downloaded to: ${path}`);
                        resolve();
                    })
                    .on('error', function (err) {
                        reject(err);
                    });
            } else if (res.statusCode === 302 || res.statusCode === 301 || res.statusCode === 303) {
                //Recursively follow redirects, only a 200 will resolve.
                download(res.headers.location, path, cb, passThrough).then(() => resolve());
            } else {
                reject(`Server responded with ${res.statusCode}: ${res.statusMessage}`);
            }

        });

        request.setTimeout(TIMEOUT, function() {
            request.abort();
            reject(new Error(`request timeout after ${TIMEOUT / 1000.0}s`));
        });
    });
}

export default download;

// the callback function receive downloaded bytes, percent completed and a pass-through object