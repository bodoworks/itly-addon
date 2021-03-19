import fs from "fs";

import { config } from "dotenv";
import fetch from "node-fetch";

import { version } from "../package.json";
import { OUTPUT_ZIP_FILE } from "./build";

config();

const appId = "<todo>";
const clientId = "<todo>";

const refreshToken = process.env.CHROME_API_OAUTH_REFRESH_TOKEN as string;
const clientSecret = process.env.CHROME_API_OAUTH_CLIENT_SECRET as string;

async function uploadDistributable(accessToken: string): Promise<string> {
    const readStream = fs.createReadStream(OUTPUT_ZIP_FILE);
    const response = await fetch(
        `https://www.googleapis.com/upload/chromewebstore/v1.1/items/${appId}?projection=draft`,
        {
            method: "put",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: readStream,
        }
    );
    const json = await response.json();
    console.log("Upload: ", JSON.stringify(json));
    if (json.error) {
        throw new Error(json.error.message);
    }
    return json.uploadState;
}

async function publishVersion(
    accessToken: string
): Promise<Record<string, unknown>> {
    const response = await fetch(
        `https://www.googleapis.com/chromewebstore/v1.1/items/${appId}/publish`,
        {
            method: "post",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    const json = await response.json();
    if (json.error) {
        throw new Error(json.error.message);
    }
    return json;
}

async function getOAuthToken(): Promise<string> {
    const params = {
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
    };
    const urlParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        return urlParams.append(key, value);
    });
    const searchParams = urlParams.toString();

    const response = await fetch("https://oauth2.googleapis.com/token", {
        method: "post",
        body: searchParams,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    const json = await response.json();
    return json.access_token;
}

async function publish(): Promise<void> {
    try {
        console.log("Getting Access Token...");
        const accessToken = await getOAuthToken();
        console.log(`Uploading ${OUTPUT_ZIP_FILE}`);
        const uploadStatus = await uploadDistributable(accessToken);
        console.log(`Upload with status: ${uploadStatus}`);
        console.log(`Publishing ${version}`);
        const publishResponse = await publishVersion(accessToken);
        console.log(JSON.stringify(publishResponse, null, 2));
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

publish();
