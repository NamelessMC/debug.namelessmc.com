import {DebugData} from "../types/DebugData";
import {formatDate} from "../utils";
import React, {ReactElement} from "react";
import { useTranslation } from "react-i18next";
import BooleanBadge from "./utils/BooleanBadge";
import Code from "./utils/Code";
import {
    faCodeCompare,
    faDownload, faPaintbrush,
    faPen,
    faPuzzlePiece,
    IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface ThumbnailProps {
    debugId: string;
    debugData: DebugData;
}

interface ThumbnailFloaterProps {
    icon: IconDefinition;
    titleKey: string;
    body: ReactElement | string;
}

function ThumbnailFloater({
    icon,
    titleKey,
    body,
}: ThumbnailFloaterProps) {

    const { t } = useTranslation();

    return (
        <div className="rounded-lg bg-gray-800 shadow-lg">
            <div className="p-4 bg-blue-800 mb-2 rounded-t-lg font-bold text-gray-50 text-center">
                <FontAwesomeIcon icon={icon} />&nbsp;&nbsp;{ t(titleKey) }
            </div>
            <div className={"section-content"} >
                { typeof body !== 'string' ?
                    body
                    : <h2 className="section-body text-normal" dangerouslySetInnerHTML={{ __html: body }}></h2>
                }
            </div>
        </div>
    )
}

function Thumbnail({
    debugId,
    debugData,
}: ThumbnailProps) {

    const { t } = useTranslation();

    return (
        <div className={"bg-gray-900 h-screen p-14 grid grid-rows-4 text-gray-50"}>
            <div>
                <h1 className="font-bold text-7xl">{ t('misc.header_title') }</h1>
                <p className="text-5xl text-gray-400 font-mono">
                    { `/${debugId}` }
                </p>
            </div>
            <div className={"grid grid-cols-3 gap-8 text-5xl"}>
                <div className={"mx-auto w-full"}>
                    <ThumbnailFloater icon={faDownload} titleKey={"version_section.version"} body={<Code value={debugData.namelessmc.version} textSize={"text-5xl"} fontColor={"text-gray-50"} />} />
                </div>
                <div className={"mx-auto w-full"}>
                    <ThumbnailFloater icon={faCodeCompare} titleKey={"environment_section.php_version"} body={<Code value={debugData.environment.php_version} textSize={"text-5xl"} fontColor={"text-gray-50"} />} />
                </div>
                <div className={"mx-auto w-full"}>
                    <ThumbnailFloater icon={faPen} titleKey={"environment_section.config_writable"} body={<BooleanBadge value={debugData.environment.config_writable} textSize={"text-5xl"} />} />
                </div>
            </div>
            <div className={"grid grid-cols-2 gap-8 text-5xl"}>
                <div className={"mx-auto w-full"}>
                    <ThumbnailFloater icon={faPuzzlePiece} titleKey={"modules_section.modules"} body={Object.values(debugData.namelessmc.modules).map(module => module.name).join(', ').substring(0, 64) + '...'} />
                </div>
                <div className={"mx-auto w-full"}>
                    <ThumbnailFloater icon={faPaintbrush} titleKey={"templates_section.templates"} body={Object.values(debugData.namelessmc.templates.front_end).map(template => template.name).join(', ')} />
                </div>
            </div>
            <div className={"flex"}>
                <div className={"text-5xl my-20"}>
                    <span className={"font-bold"}>{ t('footer.generated_by') + ' ' }</span>
                    { debugData.generated_by_uuid &&
                        <img alt={debugData.generated_by_name} className="inline" src={`https://crafthead.net/helm/${debugData.generated_by_uuid}/54`}/>
                    } {' '}
                    { debugData.generated_by_name }
                    { ' | ' } { formatDate(debugData.generated_at, false) }
                </div>
                <img src="/logo.png" alt="NamelessMC logo" className="h-40 my-8 ml-auto mr-0"></img>
            </div>
        </div>
    )
}

export default Thumbnail;
