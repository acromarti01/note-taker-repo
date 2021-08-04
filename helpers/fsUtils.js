const fileSystem = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFromFile = util.promisify(fileSystem.readFile);

/** READ FILE AND APPEND CONTENT TO FILE
 *  Function to read data from a given a file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {void} Nothing
 */
const readAndAppend = (content, file) => {
    fileSystem.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};
/** WRITE TO FILE
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */
 const writeToFile = (destination, content) =>
 fileSystem.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
     err ? console.error(err) : console.info(`\nData written to ${destination}`)
   );

module.exports = { readFromFile, readAndAppend, writeToFile };
