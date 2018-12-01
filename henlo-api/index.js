const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
function getAllPosts(cb) {
	fs.readFile('credentials.json', (err, content) => {
	  if (err) return console.log('Error loading client secret file:', err);
	  // Authorize a client with credentials, then call the Google Sheets API.
	  authorize(JSON.parse(content), listMajors, cb);
	});
}

function getPost(i, cb) {
	fs.readFile('credentials.json', (err, content) => {
	  if (err) return console.log('Error loading client secret file:', err);
	  // Authorize a client with credentials, then call the Google Sheets API.
	  authorize(JSON.parse(content), listMajor, cb, i);
	});
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback, cb, i=0) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client, cb, i);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
async function listMajors(auth, cb) {
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: '142tOnnbJWYwtbtmylLkLemhxPpG6RBJivNBL1tRwJLs',
    range: 'Sheet1',
  }, async (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = await res.data.values;
	
    if (rows && rows.length) {
		cb(rows);
		rows.map((row) => {
     	   //console.log(`${row[0]}, ${row[1]}, ${row[2]}`);
     	 });
    } else {
      console.log('No data found.');
    }
  });
}


async function listMajor(auth, cb, i) {
  if ( i==0 ) {
	  cb({ error: 'Invalid ID'});
	  return;
  }
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: '142tOnnbJWYwtbtmylLkLemhxPpG6RBJivNBL1tRwJLs',
    range: `Sheet1!A${i+1}:F${i+1}`,
  }, async (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = await res.data.values;
	
    if (rows && rows.length) {
		cb(rows);
		//rows.map((row) => {
     	 //  console.log(`${row[0]}, ${row[1]}, ${row[2]}`);
     	 //});
    } else {
	  cb({ error: 'Invalid ID'})
    }
  });
}


module.exports =  {getAllPosts, getPost};
