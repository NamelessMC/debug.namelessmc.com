import {
    isOfficialModule,
    isOfficialTemplate,
} from "../utils";
import {useTranslation} from "react-i18next";
import BooleanBadge from "./utils/BooleanBadge";
import BooleanValue from "./utils/BooleanValue";
import Code from "./utils/Code";
import OfficialBadge from "./utils/OfficialBadge";
import Empty from "./utils/Empty";

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
                { name } { isOfficial && <OfficialBadge /> }
            </h3>

            <h5 className="section-heading">
                { t('panel_templates_section.enabled') }: <BooleanBadge value={enabled} />
            </h5>

            { type === 'template' &&
                <h5 className="section-heading">
                    {t('panel_templates_section.is_default')}: <BooleanBadge value={ Boolean(isDefault) } />
                </h5>
            }

            <h5 className="section-heading">
                { t('panel_templates_section.author') }: <span className="font-normal text-base" dangerouslySetInnerHTML={{ __html: author}}></span>
            </h5>

            <h5 className="section-heading">
                { t('panel_templates_section.namelessmc_version') }: <Code value={namelessMcVersion} />
            </h5>

            <h5 className="section-heading">
                { t('panel_templates_section.version') }: <Code value={version} />
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
                                            { t('modules_section.core.integration_enabled') }: <BooleanBadge value={debugInfo.minecraft.mc_integration}/>
                                        </h5>
                                        <h5 className="section-heading">
                                            { t('modules_section.core.uuid_linking') }: <BooleanBadge value={debugInfo.minecraft.uuid_linking}/>
                                        </h5>
                                        <h5 className="section-heading">
                                            { t('modules_section.core.username_sync') }: <BooleanBadge value={debugInfo.minecraft.uuid_linking}/>
                                        </h5>
                                        <h5 className="section-heading">
                                            { t('modules_section.core.external_query') }: <BooleanValue value={debugInfo.minecraft.external_query}/>
                                        </h5>
                                    </div>

                                    { Object.values(debugInfo.minecraft.servers).length > 0 && <>
                                        <h5 className="section-heading pb-1 text-center pt-1">{ t('modules_section.core.servers') }</h5>
                                        { Object.values(debugInfo.minecraft.servers).map((server: any, idx)=> {
                                            return <div key={idx} className="pb-3">
                                                <div className="grid grid-cols-2">
                                                    <h5 className="section-heading">
                                                        { t('modules_section.core.name') }: <span className="font-normal text-base">{server.name}</span>
                                                    </h5>
                                                    <h5 className="section-heading">
                                                        { t('modules_section.core.bedrock') }: <BooleanValue value={server.bedrock}/>
                                                    </h5>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <h5 className="section-heading">
                                                        { t('modules_section.core.ip') }: <Code value={server.ip}/>
                                                    </h5>
                                                    <h5 className="section-heading">
                                                        { t('modules_section.core.query_ip') }: <Code value={server.query_ip}/>
                                                    </h5>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <h5 className="section-heading">
                                                        { t('modules_section.core.port') }: <Code value={server.port}/>
                                                    </h5>
                                                    <h5 className="section-heading">
                                                        { t('modules_section.core.query_port') }: <Code value={server.query_port}/>
                                                    </h5>
                                                </div>
                                            </div>
                                        })}
                                    </>}
                                </> : name === 'Discord Integration' && <>
                                    <div className="grid grid-cols-2">
                                        <h5 className="section-heading">
                                            { t('modules_section.discord_integration.syncing_enabled') }: <BooleanBadge value={enabled && debugInfo.guild_id && debugInfo.bot_url} />
                                        </h5>
                                        <h5 className="section-heading">
                                            { t('modules_section.discord_integration.guild_id') }: <Empty value={debugInfo.guild_id} asCode={true} />
                                        </h5>
                                        <h5 className="section-heading">
                                            { t('modules_section.discord_integration.bot_setup') }: <BooleanBadge value={debugInfo.bot_setup} />
                                        </h5>
                                        <h5 className="section-heading">
                                            { t('modules_section.discord_integration.bot_url') }: <Empty value={debugInfo.bot_url} />
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
