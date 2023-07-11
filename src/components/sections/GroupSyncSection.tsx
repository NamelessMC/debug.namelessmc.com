import FloatingSection, { type FloatingContent } from '../FloatingSection';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { goToModule } from '../../utils';
import BooleanBadge from '../utils/BooleanBadge';
import Empty from '../utils/Empty';
import { useContext } from 'react';
import DebugDataContext from '../../contexts/DebugDataContext';

function GroupSyncSection(): JSX.Element {
    const debugData = useContext(DebugDataContext);

    const injectorsFloatingContent: FloatingContent = {
        subheadingKey: 'group_sync_section.injectors',
        table: {
            columnHeaders: [
                {
                    key: 'group_sync_section.name',
                },
                {
                    key: 'group_sync_section.enabled',
                    classes: ['w-1/6'],
                },
                {
                    key: 'group_sync_section.module',
                },
            ],
            rows: debugData.namelessmc.settings.group_sync.injectors.map(injector => {
                return {
                    cells: [
                        {
                            body: injector.name,
                            title: injector.column_name,
                        },
                        {
                            body: <BooleanBadge value={injector.enabled} />,
                        },
                        {
                            body: injector.module,
                            classes: ['hover:underline', 'cursor-pointer'],
                            click: () => { goToModule(injector.module); },
                        },
                    ],
                };
            }),
        },
    };

    const rulesFloatingContent: FloatingContent = {
        subheadingKey: 'group_sync_section.rules',
        table: {
            columnHeaders: [
                {
                    key: 'ID',
                    classes: ['w-1/6'],
                },
                ...debugData.namelessmc.settings.group_sync.injectors.map(injector => {
                    return {
                        key: injector.name,
                    };
                }),
            ],
            rows: Object.values(debugData.namelessmc.settings.group_sync.rules).map(rule => {
                return {
                    cells: [
                        {
                            body: rule.id,
                        },
                        ...debugData.namelessmc.settings.group_sync.injectors.map(injector => {
                            const groupId = rule[injector.column_name];
                            if (injector.column_name === 'website_group_id') {
                                return {
                                    body: Object.values(debugData.namelessmc.groups).find(group => group.id === groupId)?.name ?? '',
                                };
                            } else {
                                return {
                                    body: <Empty value={groupId} />,
                                };
                            }
                        }),
                    ],
                };
            }),
            emptyState: {
                textKey: 'group_sync_section.no_rules',
            },
        },
    };

    return (
        <FloatingSection icon={faSyncAlt} titleKey={'group_sync_section.group_sync'} floatingContent={[injectorsFloatingContent, rulesFloatingContent]} />
    );
}

export default GroupSyncSection;
