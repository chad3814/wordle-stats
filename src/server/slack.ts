import { App  } from '@slack/bolt';
import { FileInstallationStore } from '@slack/bolt';
import 'dotenv/config';

import { appDeleted, appInstall, appUninstall } from './slackEvents';

async function main() {
    if (!process.env.SLACK_SIGNING_SECRET) {
        throw new Error('no signing secret');
    }
    const PORT = parseInt(process.env.PORT ?? '3000', 10);

    const app = new App({
        token: process.env.SLACK_BOT_TOKEN,
        clientId: process.env.SLACK_CLIENT_IT,
        clientSecret: process.env.SLACK_CLIENT_SECRET,
        signingSecret: process.env.SLACK_SIGNING_SECRET,
        appToken: process.env.SLACK_SOCKET_TOKEN,
//        socketMode: true,
        port: PORT,
        installationStore: new FileInstallationStore(),
        scopes: [
            'channels:history',
            'chat:write',
            'groups:history',
            'im:history',
            'im:read',
            'im:write',
            'mpim:history',
            'mpim:read',
            'mpim:write',
        ],
        installerOptions: {
            userScopes: [
                'im:history',
                'im:read',
                'im:write',
                'users.profile:write'
            ],
            callbackOptions: {
                success: (installtion, installUrlOptions, req, res) => {
                    res.end('Installation success!');
                },
                failure: (error, installationUrlOpions, req, res) => {
                    res.end('Something went wrong...');
                }
            }
        }
    });


    app.event('app_installed', appInstall);
    app.event('app_uninstalled', appUninstall);
    app.event('app_deleted', appDeleted);

    app.message('test', async ({message, say}) => {
        app.logger.info('message', message);
        await say('hi there');
    })
    await app.start();

    app.logger.info('⚡️ WordleStatus app is running!');
    app.logger.info(`http://localhost:${PORT}/slack/install`);
}

main();