
import {app} from 'electron';
import getWindowsDrives from './../../helpers/getWindowsDrives';
const fs = require('fs');

export default {
    "getDrives": (event, type, payload) => {
        getWindowsDrives((error, drives) => {
            event.reply("main-process-reply", type, drives);
        });
    },
    "getDirContents": (event, type, payload) => {
        fs.readdir(payload.path, (err, items) => {
            let files = [];
            let folders = [];
            items.forEach(item => {
                try {
                    let stats = fs.statSync(payload.path + '/' + item);
                    if(stats) {
                        if(stats.isDirectory())
                            folders.push(item);
                        else
                            files.push(item);
                    }
                } catch (ex) {
                    //
                }
            });
            event.reply("main-process-reply", type, {
                files: files,
                folders: folders,
            });
        });
    },
    "saveSettings": (event, type, payload) => {
        fs.writeFile( app.getPath('userData') + '\\settings.txt', payload.settings, function (err,data) {
            if (err) return console.log(err);
        });
    },
    "requestSettings": (event, type, payload) => {
        fs.readFile( app.getPath('userData') + '\\settings.txt', function (err,data) {
            if (err) return console.log(err);
            event.reply("main-process-reply", type, {
                settings: data,
            });
        });
    },
};


