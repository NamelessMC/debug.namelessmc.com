import FloatingSection, {FloatingContent} from "../FloatingSection";
import {faLink} from "@fortawesome/free-solid-svg-icons";
import Code from "../utils/Code";
import {useContext} from "react";
import DebugDataContext from "../../contexts/DebugDataContext";

function WebhooksSection() {

    const debugData = useContext(DebugDataContext);

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
                            body: hook.id,
                        },
                        {
                            body: hook.name,
                        },
                        {
                            body: actionFromId(hook.action),
                        },
                        {
                            body: <Code value={hook.events.join('\n')} />,
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
        return Object.values(debugData.namelessmc.settings.webhooks.hooks).find(hook => {
            return hookId === hook.id;
        })?.name ?? 'unknown';
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
                            body: hook.forum_id,
                        },
                        {
                            body: hook.title,
                        },
                        {
                            body: <Code value={hook.hooks.map(h => hookById(h)).join('\n')} />,
                        }
                    ]
                }
            }),
            emptyState: {
                textKey: "webhooks_section.no_forum_hooks"
            }
        }
    }

    return (
        <FloatingSection icon={faLink} titleKey={'webhooks_section.webhooks'} floatingContent={[hooksFloatingContent, forumHooksFloatingContent]} />
    )
}

export default WebhooksSection;
