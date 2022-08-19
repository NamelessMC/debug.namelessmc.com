import { useTranslation } from 'react-i18next';

interface Props {
    error: string;
}

function Error({
    error,
}: Props) {

    const { t } = useTranslation();
    
    return (
        <div>
            { error &&
                <div className="m-auto rounded-lg bg-red-400 dark:bg-red-500 shadow-lg w-1/3">
                    <div className="p-4 h-full bg-red-300 dark:bg-red-400 mb-2 rounded-t-lg font-bold text-white">
                        { t('errors.error') }
                    </div>
                    <div className="pt-2 pb-4 mb-8 pl-4 text-white">{ error }</div>
                </div>
            }
        </div>
    )
}

export default Error;
