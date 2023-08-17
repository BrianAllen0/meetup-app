//"use strict"; //remove temp

const { google } = require("googleapis");
const calendar = google.calendar("v3");
const SCOPES = ["https://www.googleapis.com/auth/calendar.events.public.readonly"];

const credentials = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    calendar_id: process.env.CALENDAR_ID,
    redirect_uris: ["https://brianallen0.github.io/meetup-app/"],
};

const { client_id, client_secret, calendar_id, redirect_uris } = credentials;

const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

module.exports.getAuthURL = async () => {
    /**
     *
     * Scopes array is passed to the `scope` option.
     *
     */
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
    });
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
            authUrl: authUrl,
        }),
    };
};
module.exports.getAccessToken = async (event) => {
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    // Decode authorization code extracted from the URL query
    const code = decodeURIComponent(`${event.pathParameters.code}`);

    return new Promise((resolve, reject) => {
        /**
         *  Exchange authorization code for access token with a “callback” after the exchange,
         *  The callback in this case is an arrow function with the results as parameters: “error” and “response”
         */

        oAuth2Client.getToken(code, (error, response) => {
            if (error) {
                return reject(error);
            }
            return resolve(response);
        });
    })
        .then((results) => {
            // Respond with OAuth token
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify(results),
            };
        })
        .catch((error) => {
            // Handle error
            return {
                statusCode: 500,
                body: JSON.stringify(error),
            };
        });
};
module.exports.getCalendarEvents = async (event) => {
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    // Decode authorization code extracted from the URL query
    const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);
    oAuth2Client.setCredentials({ access_token });
    return new Promise((resolve, reject) => {
        /**
         *  Exchange authorization code for access token with a “callback” after the exchange,
         *  The callback in this case is an arrow function with the results as parameters: “error” and “response”
         */
        calendar.events.list(
            {
                calendarId: calendar_id,
                auth: oAuth2Client,
                timeMin: new Date().toISOString(),
                singleEvents: true,
                orderBy: "startTime",
            },
            (error, response) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            }
        );
    })
        .then((results) => {
            // Respond with OAuth token
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify({ events: results.data.items }),
            };
        })
        .catch((error) => {
            // Handle error
            return {
                statusCode: 500,
                body: JSON.stringify(error),
            };
        });
};

//OLD CODE BELOW
// const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, redirect_uris[0]);

// // module.exports.getAuthURL = async () => {
// //     const authUrl = oAuth2Client.generateAuthUrl({
// //         access_type: "offline",
// //         scope: SCOPES,
// //     });
// //     return {
// //         statusCode: 200,
// //         headers: {
// //             "Access-Control-Allow-Origin": "*",
// //             "Access-Control-Allow-Credentials": true,
// //         },
// //         body: JSON.stringify({ authUrl }),
// //     };
// // };

// module.exports.getAuthURL = async () => {
//     /**
//      * Scopes array passed to the `scope` option.
//      * Any scopes passed must be enabled
//      * in the 'OAuth consent screen' settings in your project
//      * on your Google Console. Also, any passed scopes are the ones
//      * users will see when the consent screen is displayed to them.
//      */

//     const authUrl = oAuth2Client.generateAuthUrl({
//         access_type: "offline",
//         scope: SCOPES,
//     });

//     return {
//         statusCode: 200,
//         headers: {
//             "Access-Control-Allow-Origin": "*",
//             "Access-Control-Allow-Credentials": true,
//         },
//         body: JSON.stringify({
//             authUrl,
//         }),
//     };
// };

// // module.exports.getAccessToken = async (event) => {
// //     const code = decodeURIComponent(`${event.pathParameters.code}`);

// //     return new Promise((resolve, reject) => {
// //         oAuth2Client.getToken(code, (error, response) => {
// //             if (error) {
// //                 return reject(error);
// //             }
// //             return resolve(response);
// //         });
// //     })
// //         .then((results) => {
// //             return {
// //                 statusCode: 200,
// //                 headers: {
// //                     "Access-Control-Allow-Origin": "*",
// //                     "Access-Control-Allow-Credentials": true,
// //                 },
// //                 body: JSON.stringify(results),
// //             };
// //         })
// //         .catch((error) => {
// //             return {
// //                 statusCode: 500,
// //                 body: JSON.stringify(error),
// //             };
// //         });
// // };

// module.exports.getAccessToken = async (event) => {
//     const code = decodeURIComponent(`${event.pathParameters.code}`);

//     return new Promise((resolve, reject) => {
//         /**
//          * Exchange authorization code for access token with a 'callback' after the exchange,
//          * The callback in this case is an arrow function with the results as paramenters: 'err' and 'token.'
//          */

//         oAuth2Client.getToken(code, (error, response) => {
//             if (error) {
//                 return reject(error);
//             }
//             return resolve(response);
//         });
//     })
//         .then((results) => {
//             //Respond with OAtuth token
//             return {
//                 statusCode: 200,
//                 headers: {
//                     "Access-Control-Allow-Origin": "*",
//                     "Access-Control-Allow-Credentials": true,
//                 },
//                 body: JSON.stringify(results),
//             };
//         })
//         .catch((error) => {
//             console.log(error);
//             return {
//                 statusCode: 500,
//                 body: JSON.stringify(error),
//             };
//         });
// };

// // module.exports.getCalendarEvents = async (event) => {
// //     return new Promise((resolve, reject) => {
// //         const access_token = decodeURIComponent(`${event.pathParameters.token}`);
// //         oAuth2Client.setCredentials({ access_token });

// //         calendar.events.list(
// //             {
// //                 calendarId: CALENDAR_ID,
// //                 auth: oAuth2Client,
// //                 timeMin: new Date().toISOString(),
// //                 singleEvents: true,
// //                 orderBy: "startTime",
// //             },
// //             (error, response) => {
// //                 if (error) {
// //                     reject(error);
// //                 } else {
// //                     resolve(response);
// //                 }
// //             }
// //         );
// //     })
// //         .then((results) => {
// //             return {
// //                 statusCode: 200,
// //                 headers: {
// //                     "Access-Control-Allow-Origin": "*",
// //                     "Access-Control-Allow-Credentials": true,
// //                 },
// //                 body: JSON.stringify(results.data.items),
// //             };
// //         })
// //         .catch((error) => {
// //             return {
// //                 statusCode: 500,
// //                 body: JSON.stringify(error),
// //             };
// //         });
// // };

// module.exports.getCalendarEvents = async (event) => {
//     const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);
//     oAuth2Client.setCredentials({ access_token });

//     return new Promise((resolve, reject) => {
//         calendar.events.list(
//             {
//                 calendarId: CALENDAR_ID,
//                 auth: oAuth2Client,
//                 timeMin: new Date().toISOString(),
//                 singleEvents: true,
//                 orderBy: "startTime",
//             },
//             (error, response) => {
//                 if (error) {
//                     reject(error);
//                 } else {
//                     resolve(response);
//                 }
//             }
//         );
//     })
//         .then((results) => {
//             return {
//                 statusCode: 200,
//                 headers: {
//                     "Access-Control-Allow-Origin": "*",
//                     "Access-Control-Allow-Credentials": true,
//                 },
//                 body: JSON.stringify({ events: results.data.items }),
//             };
//         })
//         .catch((error) => {
//             return {
//                 statusCode: 500,
//                 body: JSON.stringify(error),
//             };
//         });
// };
