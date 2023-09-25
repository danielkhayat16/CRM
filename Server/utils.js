exports.googleAuth = function () {
  const fs = require("fs").promises;
  const path = require("path");
  const process = require("process");
  const { authenticate } = require("@google-cloud/local-auth");
  const { google } = require("googleapis");

  const SCOPES = "https://www.googleapis.com/auth/calendar";

  const TOKEN_PATH = path.join(process.cwd(), "token.json");
  const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");
  /**
   * This function reads the credentials from the token.json file if they exists in the file
   *
   * @return {Promise<OAuth2Client|null>}
   */

  async function loadSavedCredentialsIfExists() {
    try {
      const content = await fs.readFile(TOKEN_PATH);
      const credentials = JSON.parse(content);
      return google.auth.fromJSON(credentials);
    } catch (err) {
      return null;
    }
  }

  /**
   * This function sereializes credentials (a tokken) to a file compatible with GoogleAuth.fromJSON.
   *
   * @param{OAuth2Client} client
   * @return {Promise<void>}
   */

  async function saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    //const key = keys.installed || keys.web;
    const payload = JSON.stringify({
      type: "authorized_user",
      client_id: keys.client_id,
      client_secret: keys.client_secret,
      refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
  }

  /**
   * Load or request or authorization to call APIs.
   */

  async function authorize() {
    let client = await loadSavedCredentialsIfExists();
    if (client) {
      return client;
    }
    client = await authenticate({
      scopes: SCOPES,
      keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
      await saveCredentials(client);
    }
    return client;
  }

  /**
   * Lists the next 10 events on the shared calendar.
   * @param {google.auth.OAuth2} auth An authoized OAuth2 client.
   */

  async function listEvents(auth) {
    const calendar = google.calendar({ version: "v3", auth });
    const res = await calendar.events.list({
      calendarId: "daniel.events126@gmail.com",
      timeMin: new Date().toISOString(),
      maxResults: 100,
      singleEvents: true,
      orderBy: "startTime",
    });
    const events = res.data.items;
    if (!events || events.length === 0) {
      console.log("Aucun evenement au planning.");
      return;
    }

    // console.log("Voici les prochains evenements au planning:");
    // events.map((event, i) => {
    //   const start = event.start.dateTime || event.start.date;
    //   console.log(`${start} - ${event.summary}`);
    // });
    return events;
  }

  return authorize().then(listEvents).catch(console.error);
};

