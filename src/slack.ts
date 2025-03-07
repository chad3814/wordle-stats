import "dotenv/config";
import { App } from "@slack/bolt";

if (!process.env.SLACK_CLIENT_ID || !process.env.SLACK_CLIENT_SECRET || !process.env.SLACK_SIGNING_SECRET) {
    throw new Error('NoSlackCreds');
}
export const app = new App({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    clientId: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET,
    scopes: ['users.profile:write'],
});
