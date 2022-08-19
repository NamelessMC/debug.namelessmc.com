import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import i18n from '../../i18n';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

interface Props {
    loaded: boolean;
    generatedByUuid: string;
    generatedByName: string;
    namelessMcVersion: string;
    debugId: string;
    theme: 'light' | 'dark';
}

function Footer({
    loaded,
    generatedByUuid,
    generatedByName,
    namelessMcVersion,
    debugId,
    theme,
}: Props) {

    const { t } = useTranslation();

    const toggleTheme = () => {
        alert('Toggle theme'); // TODO: implement this
    }

    const changeLocale = (locale: string) => {
        alert('Change locale to ' + locale); // TODO: implement this
    }

    if (!loaded) return <></>;

    return (
        <footer className="h-auto bg-yellow-400 dark:bg-indigo-900 text-center">
            <div className="container mx-auto grid md:grid-cols-3 sm:grid-cols-1 py-6">
                <div>
                    <h5 className="section-heading">
                        { t('footer.generated_by' ) } {' '}
                        { generatedByUuid &&
                            <img alt={generatedByName} className="inline" src={`https://crafthead.net/helm/${generatedByUuid}/16`}></img>
                        } {' '}
                        <span className="font-normal">
                            { generatedByName }
                        </span>
                    </h5>
                    <h5 className="section-heading">
                        { t('footer.namelessmc_version') } {' '}
                        <span className="font-normal">{ namelessMcVersion }</span>
                    </h5>
                    <h5 className="section-heading">
                        { t('footer.raw_json') }: {' '}
                        <a href={`https://bytebin.rkslot.nl/${debugId}`} target="_blank">
                            <span className="font-normal">https://bytebin.rkslot.nl/{debugId}</span>
                        </a>
                    </h5>
                </div>
                <div className="grid grid-cols-2 py-2">
                    <div>
                        <button onClick={() => toggleTheme()} className="px-2 h-12 rounded-lg bg-gray-200 dark:bg-gray-900 text-black dark:text-gray-300 font-bold text-sm">
                            { t('footer.theme') } {theme === "light" ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
                        </button>
                    </div>
                    <div className="text-normal">
                        <FontAwesomeIcon icon="globe" />
                        <select onChange={(e) => changeLocale(e.target.value)} className="ml-2 p-2 h-12 rounded-md bg-gray-200 dark:bg-gray-900">
                            {i18n.languages.map((lang, idx) => (
                                <option key={idx} value={lang}>{lang}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <h5 className="section-heading">
                        { t('footer.namelessmc_website') }:
                        <a href="https://namelessmc.com" target="_blank" rel="noreferrer">
                            <span className="font-normal">
                                {' '} https://namelessmc.com
                            </span>
                        </a>
                    </h5>
                    <h5 className="section-heading">
                        { t('footer.get_support') }:
                        <a href="https://discord.gg/nameless" target="_blank" rel="noreferrer">
                            <span className="font-normal">
                                {' '} https://discord.gg/nameless
                            </span>
                        </a>
                    </h5>
                    <h5 className="section-heading">
                        { t('footer.made_with_love') }
                    </h5>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
