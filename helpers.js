const https = require("https");

const {COOKIES} = process.env;

if (COOKIES === undefined) {
    throw new Error("Environment variable \"COOKIES\" not provided");
}

module.exports = {
    getData: function (url, callback) {
        // noinspection JSCheckFunctionSignatures (Type NodeJS.ProcessEnv.COOKIES is not assignable to type string[])
        const req = https.get(url, {headers: {"Cookie": COOKIES}}, (res) => {
            let data = "";

            res.on("data", (chunk) => {
                data += chunk;
            });

            res.on("end", () => {
                callback(data);
            });

        });

        req.on("error", (error) => {
            console.error(error);
        });

        req.end();

    },
};
