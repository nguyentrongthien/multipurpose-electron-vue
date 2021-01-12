
import downloadFile from '../../helpers/downloadFile';

export default {
    "downloadFile": (event, type, payload) => {

        downloadFile('https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-full.7z', './tmp/ffmpeg-release-full.7z')
            .then(resp => {
                console.log('download finished');
                console.log(resp);
            }).catch(err => {
                console.log('download failed');
                console.log(err);
            });
    },
    "installFFMPEG": (event, type, payload) => {
        downloadFile('https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-full.7z', './tmp/ffmpeg-release-full.7z', (downloaded, percent) => {
            event.reply("main-process-reply", payload.update, percent);
        }, '')
            .then(resp => {
                event.reply("main-process-reply", type);
            }).catch(err => {});

        // TODO: Implement package extraction and setting OS environmental variable
    },
};