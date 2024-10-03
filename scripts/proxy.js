const http = require("node:http");
const https = require("node:https");
const readline = require("node:readline");

const targetHost = "api.dev.voloiq.io";
const port = 8008;

function askForCredentials() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question("Enter the auth token (inspect in a request): ", (authToken) => {
            rl.question("Enter the cookie (inspect in a request): ", (cookie) => {
                rl.close();
                resolve({ authorizationHeader: authToken, predefinedCookie: cookie });
            });
        });
    });
}

async function runApiProxy() {
    // eslint-disable-next-line no-console
    console.log("Please open the voloIQ app and inspect a request to the API to get the auth token and cookie.");
    try {
        const { authorizationHeader, predefinedCookie } = await askForCredentials();

        // check if the AuthorizationHeader and predefinedCookie are valid
        if (!authorizationHeader.startsWith("Bearer")) {
            throw new Error("Your Token is not containing 'Bearer'. Please include the whole Authentication value.");
        }
        if (!predefinedCookie.startsWith("_oauth2_proxy=")) {
            throw new Error(
                "Your Cookie is not containing the '_oauth2_proxy='. Please include the whole Cookie value."
            );
        }

        const server = http.createServer((request, response) => {
            request.headers.cookie = predefinedCookie;
            request.headers.authorization = authorizationHeader;
            request.headers.host = targetHost;

            // Parse the original request URL
            const targetUrl = new URL(request.url || "", `http://${request.headers.host}`);

            // Make a new request to the HTTPS server
            const requestOptions = {
                host: targetHost,
                path: targetUrl.pathname + targetUrl.search,
                method: request.method,
                headers: request.headers,
            };

            const proxyRequest = https.request(requestOptions, (proxyResponse) => {
                // Forward the HTTPS response headers to the original response
                response.writeHead(proxyResponse.statusCode || 200, proxyResponse.headers);

                // Pipe the HTTPS response to the original response
                proxyResponse.pipe(response);
            });

            // Pipe the original request body to the HTTPS request
            request.pipe(proxyRequest);

            // Handle errors
            proxyRequest.on("error", (error) => {
                // eslint-disable-next-line no-console
                console.error("Proxy request error:", error);
                response.statusCode = 500;
                response.end("Proxy request error");
            });
        });

        // Start the server
        server.listen(port, () => {
            // eslint-disable-next-line no-console
            console.log(`Proxy server listening on port ${port}`);
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("An error occurred:", error);
    }
}

runApiProxy();
