import { Logger } from "@slack/bolt";
import { AppDeletedEvent, AppInstalledEvent, AppUninstalledEvent, WebClient } from "@slack/web-api";
import { prisma } from "./prisma";


type AppInstalledProps = {
    event: AppInstalledEvent;
    client: WebClient;
    logger: Logger;
};

type AppUninstalledProps = {
    event: AppUninstalledEvent;
    client: WebClient;
    logger: Logger;
};

type AppDeletedProps = {
    event: AppDeletedEvent;
    client: WebClient;
    logger: Logger;
};

export async function appInstall({ event, /* client, */ logger }: AppInstalledProps) {
    logger.info('appInstalled', event);
    const user = await prisma.user.findFirst({
        select: {
            createdAt: true,
        },
        where: {
            slackUserId: event.user_id,
            slackTeamId: event.team_id,
        },
    });

    if (user) {
        logger.info('already exists since', user.createdAt);
    } else {
        const newUser = await prisma.user.create({
            data: {
                slackUserId: event.user_id,
                slackTeamId: event.team_id,
            }
        });
        logger.info('added user', newUser.slackUserId);
    }
}

export async function appUninstall({ event, /* client, */ logger }: AppUninstalledProps) {
    logger.info('appUninstalled', event);
}

export async function appDeleted({ event, /* client, */ logger }: AppDeletedProps) {
    logger.info('appDeleted', event);
}
