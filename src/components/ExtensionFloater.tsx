import {
    asCode,
    booleanBadge,
    booleanValue,
    isEmpty,
    isOfficialModule,
    isOfficialTemplate,
    officialBadge
} from "../utils";
import {useTranslation} from "react-i18next";

export interface ExtensionFloaterProps {
    name: string;
    type: 'module' | 'template';
    enabled: boolean;
    isDefault?: boolean;
    author: string;
    namelessMcVersion: string;
    version: string;
    debugInfo?: any;
}

function ExtensionFloater({
    name,
    type,
    enabled,
    isDefault,
    author,
    namelessMcVersion,
    version,
    debugInfo,
}: ExtensionFloaterProps) {

     const { t } = useTranslation();

    let isOfficial = false;
    if (type === 'module' && isOfficialModule(name)) {
        isOfficial = true;
    } else if (type === 'template' && isOfficialTemplate(name)) {
        isOfficial = true;
    }

    return (
        <div className="section-content-floating h-full">
            <h3 className="section-subheading">
                { name } { isOfficial && <span dangerouslySetInnerHTML={{ __html: officialBadge() }}></span> }
            </h3>

            <h5 className="section-heading">
                { t('panel_templates_section.enabled') }: <span dangerouslySetInnerHTML={{ __html: booleanBadge(enabled) }}></span>
            </h5>

            { type === 'template' && isDefault &&
                <h5 className="section-heading">
                    {t('panel_templates_section.is_default')}: <span dangerouslySetInnerHTML={{ __html: booleanBadge(isDefault) }}></span>
                </h5>
            }

            <h5 className="section-heading">
                { t('panel_templates_section.author') }: <span className="font-normal text-base" dangerouslySetInnerHTML={{ __html: author}}></span>
            </h5>

            <h5 className="section-heading">
                { t('panel_templates_section.namelessmc_version') }: <span dangerouslySetInnerHTML={{ __html: asCode(namelessMcVersion) }}></span>
            </h5>

            <h5 className="section-heading">
                { t('panel_templates_section.version') }: <span dangerouslySetInnerHTML={{ __html: asCode(version) }}></span>
            </h5>

            { type === 'module' &&
                <>
                    <div className="w-full text-center border-b-2 border-blue-400" style={{ height: '14px' }}>
                        <span className="bg-gray-100 dark:bg-gray-800 dark:text-gray-300 text-base">&nbsp;{ t('modules_section.debug_info') }&nbsp;</span>
                    </div>
                    <div className="pt-3">
                        { debugInfo.length === 0 ?
                                <p className="text-normal italic">{ t('modules_section.no_debug_info') }</p>
                            : <>
                                { !['Core', 'Discord Integration'].includes(name) && <>
                                    <pre className="text-normal">{ JSON.stringify(debugInfo) }</pre>
                                </>}
                                { name === 'Core' ? <>
                                    <h5 className="section-heading pb-1 text-center">{t('modules_section.core.minecraft_integration')}</h5>

                                    <div className="grid grid-cols-2">
                                        <h5 className="section-heading">
                                            { t('modules_section.core.integration_enabled') }: <span
                                            dangerouslySetInnerHTML={{__html: booleanBadge(debugInfo.minecraft.mc_integration)}}></span>
                                        </h5>
                                        <h5 className="section-heading">
                                            { t('modules_section.core.uuid_linking') }: <span
                                            dangerouslySetInnerHTML={{__html: booleanBadge(debugInfo.minecraft.uuid_linking) }}></span>
                                        </h5>
                                        <h5 className="section-heading">
                                            { t('modules_section.core.username_sync') }: <span
                                            dangerouslySetInnerHTML={{__html: booleanBadge(debugInfo.minecraft.username_sync) }}></span>
                                        </h5>
                                        <h5 className="section-heading">
                                            { t('modules_section.core.external_query') }: <span
                                            dangerouslySetInnerHTML={{__html: booleanValue(debugInfo.minecraft.external_query) }}></span>
                                        </h5>
                                    </div>

                                    { Object.values(debugInfo.minecraft.servers).length > 0 && <>
                                        <h5 className="section-heading pb-1 text-center pt-1">{ t('modules_section.core.servers') }</h5>
                                        { Object.values(debugInfo.minecraft.servers).map((server: any, idx)=> {
                                            return <div key={idx} className="pb-3">
                                                <div className="grid grid-cols-2">
                                                    <h5 className="section-heading">
                                                        { t('modules_section.core.name') }: <span className="font-normal text-base">{ server.name }</span>
                                                    </h5>
                                                    <h5 className="section-heading">
                                                        { t('modules_section.core.bedrock') }: <span dangerouslySetInnerHTML={{__html: booleanValue(server.bedrock) }}></span>
                                                    </h5>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <h5 className="section-heading">
                                                        { t('modules_section.core.ip') }: <span dangerouslySetInnerHTML={{__html: asCode(server.ip) }}></span>
                                                    </h5>
                                                    <h5 className="section-heading">
                                                        { t('modules_section.core.query_ip') }: <span dangerouslySetInnerHTML={{__html: asCode(server.query_ip) }}></span>
                                                    </h5>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <h5 className="section-heading">
                                                        { t('modules_section.core.port') }: <span dangerouslySetInnerHTML={{__html: asCode(server.port) }}></span>
                                                    </h5>
                                                    <h5 className="section-heading">
                                                        { t('modules_section.core.query_port') }: <span dangerouslySetInnerHTML={{__html: asCode(server.query_port) }}></span>
                                                    </h5>
                                                </div>
                                            </div>
                                        })}
                                    </>}
                                </> : name === 'Discord Integration' && <>
                                    <div className="grid grid-cols-2">
                                        <h5 className="section-heading">
                                            { t('modules_section.discord_integration.syncing_enabled') }: <span dangerouslySetInnerHTML={{__html: booleanBadge(enabled && debugInfo.guild_id && debugInfo.bot_url) }}></span>
                                        </h5>
                                        <h5 className="section-heading">
                                            { t('modules_section.discord_integration.guild_id') }: <span dangerouslySetInnerHTML={{__html: isEmpty(debugInfo.guild_id, true) }}></span>
                                        </h5>
                                        <h5 className="section-heading">
                                            { t('modules_section.discord_integration.bot_setup') }: <span dangerouslySetInnerHTML={{__html: booleanBadge(debugInfo.bot_setup) }}></span>
                                        </h5>
                                        <h5 className="section-heading">
                                            { t('modules_section.discord_integration.bot_url') }: <span dangerouslySetInnerHTML={{__html: isEmpty(debugInfo.bot_url) }}></span>
                                        </h5>
                                    </div>
                                </>}
                            </>
                        }
                    </div>
                </>
            }
        </div>
    )
}

export default ExtensionFloater;
