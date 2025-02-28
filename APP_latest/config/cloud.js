const Cloud = require('@google-cloud/storage');
const path = require('path');
const serviceKey = path.join('./keys.json');

const {
  Storage
} = Cloud;
const storage = new Storage({
  keyFilename: path.join(__dirname, '../config/keys.json'),
  projectId: 'lively-synapse-231915',
})
// storage.getBuckets().then(x => console.log(x));
module.exports = storage;