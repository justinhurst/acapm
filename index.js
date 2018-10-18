// allows us to prompt for questions
const readline = require('readline');
// allows us to manipulate and check for files
const fs = require('fs');

// setup readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

if(process.argv[2] === "init"){
    
    const file = 'package.json';

    fs.access(file, fs.constants.F_OK, (err) => {
        if(err){
            //package.json does not exist
            rl.question('Name: ', (nameAnswer) => {
                rl.question('Version: ', (versionAnswer) => {
                    rl.question('Description: ', (descAnswer) => {
                        rl.question('Keywords: ', (keywordAnswer) => {
                            rl.question('Author: ', (authorAnswer) => {
                                const packageOBJ = {
                                    name : versionAnswer,
                                    version : versionAnswer,
                                    description : descAnswer,
                                    keywords : keywordAnswer.split(' '),
                                    author : authorAnswer
                                }
                                const fileBody = JSON.stringify(packageOBJ);
                                fs.writeFile("package.json", fileBody, (err) => {
                                    if (err) throw err;
                                    console.log("The file was successfully saved");
                                    process.exit()
                                });
                            });
                        });
                    });
                });
            });
        } else {
            console.log('package.json already exists');
            process.exit()
        }
    });
}