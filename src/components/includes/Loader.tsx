import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function Loader(): JSX.Element {
    const { t } = useTranslation();

    return (
        <div className="m-auto rounded-lg shadow-lg md:w-1/4 p-4 bg-gray-300 dark:bg-gray-500 mb-2 font-bold text-white">
            { t('misc.loading') }
            <span className="float-right">
                <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
            </span>
        </div>
    );
}

export default Loader;
