import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

interface Props {
    loaded: boolean;
    error: boolean;
}

function Loader({
    loaded,
    error
}: Props) {

    if (error) return;

    const { t } = useTranslation();

    return (
        <div>
            { !loaded &&
                <div
                    className="m-auto rounded-lg shadow-lg md:w-1/4 p-4 bg-gray-300 dark:bg-gray-500 mb-2 font-bold text-white"
                >
                    { t('misc.loading') }
                    <span className="float-right">
                        <FontAwesomeIcon icon={faCog} className="fa-spin" />
                    </span>
                </div>
            }
        </div>
    )
}

export default Loader;
