import { useTranslation } from 'react-i18next';
const { t } = useTranslation();

interface Props {
    loaded: boolean;
    error: boolean;
}

function Loader({
    loaded,
    error
}: Props) {
    return (
        <div>
            { (!loaded && !error) &&
                <div
                    className="m-auto rounded-lg shadow-lg md:w-1/4 p-4 bg-gray-300 dark:bg-gray-500 mb-2 font-bold text-white"
                >
                    { t('misc.loading') }
                    <span className="float-right">
                        <font-awesome-icon icon="spinner" spin size="lg"/>
                    </span>
                </div>
            }
        </div>
    )
}

export default Loader;
