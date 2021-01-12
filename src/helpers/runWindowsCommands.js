//Source: https://stackoverflow.com/a/57058495

//Uses node.js process manager
const electron = require('electron');
const child_process = require('child_process');
const dialog = electron.dialog;

// This function will output the lines from the script
// and will return the full combined output
// as well as exit code when it's done (using the callback).
function runWindowsCommands(command, callback) {
    var child = child_process.spawn(command, {
        encoding: 'utf8',
        shell: true
    });
    // You can also use a variable to save the output for when the script closes later
    child.on('error', (error) => {
        dialog.showMessageBox({
            title: 'Title',
            type: 'warning',
            message: 'Error occurred.\r\n' + error
        }).then(resp => { console.log('Response from showMessageBox:\r\n' + resp);});
    });

    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (data) => {
        //Here is the output
        data=data.toString();
        if (typeof callback === 'function')
            callback(data);
    });

    child.stderr.setEncoding('utf8');
    child.stderr.on('data', (data) => {
        //Here is the output from the command
        console.log('from child.stderr.on');
        console.log(data);
    });

    child.on('close', (code) => {
        //Here you can get the exit code of the script
        switch (code) {
            case 0:
                // dialog.showMessageBox({
                //     title: 'Title',
                //     type: 'info',
                //     message: 'End process.\r\n'
                // }).then(resp => { console.log('Response from showMessageBox:\r\n' + resp);});
                break;
        }

    });
}

export default runWindowsCommands;