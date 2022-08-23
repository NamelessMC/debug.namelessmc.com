import {DebugData} from "../../types/DebugData";
import FloatingSection, {FloatingContent} from "../FloatingSection";
import {faLink} from "@fortawesome/free-solid-svg-icons";
import {asCode} from "../../utils";

interface Props {
    debugData: DebugData;
}

function WebhooksSection({
    debugData,
}: Props) {

    const actionFromId = (actionId: number): string => {
        for (const [id, name] of Object.entries(debugData.namelessmc.settings.webhooks.actions)) {
            if (String(actionId) === id) {
                return name;
            }
        }

        return 'unknown';
    }

    const hooksFloatingContent: FloatingContent = {
        subheadingKey: 'webhooks_section.hooks',
        table: {
            columnHeaders: [
                {
                    key: 'webhooks_section.id',
                    classes: ['w-1/6'],
                },
                {
                    key: 'webhooks_section.name',
                },
                {
                    key: 'webhooks_section.type',
                },
                {
                    key: 'webhooks_section.events',
                }
            ],
            rows: Object.values(debugData.namelessmc.settings.webhooks.hooks).map(hook => {
                return {
                    cells: [
                        {
                            body: String(hook.id),
                        },
                        {
                            body: hook.name,
                        },
                        {
                            body: actionFromId(hook.action),
                        },
                        {
                            body: asCode(hook.events.join('\n')),
                        }
                    ],
                }
            }),
            emptyState: {
                textKey: 'webhooks_section.no_hooks',
            }
        }
    }

    const hookById = (hookId: number) => {
        for (const [id, hook] of Object.entries(debugData.namelessmc.settings.webhooks.hooks)) {
            if (String(hookId) === id) {
                return hook.name;
            }
        }

        return 'unknown';
    }

    const forumHooksFloatingContent: FloatingContent = {
        subheadingKey: 'webhooks_section.forum_hooks',
        table: {
            columnHeaders: [
                {
                    key: 'webhooks_section.forum_id',
                    classes: ['w-1/6'],
                },
                {
                    key: 'webhooks_section.forum_title',
                },
                {
                    key: 'webhooks_section.hooks',
                }
            ],
            rows: Object.values(debugData.namelessmc.settings.webhooks.forum_hooks).map(hook => {
                return {
                    cells: [
                        {
                            body: String(hook.forum_id),
                        },
                        {
                            body: hook.title,
                        },
                        {
                            body: asCode(hook.hooks.map(h => hookById(h)).join('\n')),
                        }
                    ]
                }
            }),
        }
    }

    return (
        <FloatingSection icon={faLink} titleKey={'webhooks_section.webhooks'} floatingContent={[hooksFloatingContent, forumHooksFloatingContent]} />
    )
}

export default WebhooksSection;
