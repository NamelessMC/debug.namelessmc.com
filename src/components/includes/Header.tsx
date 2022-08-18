import { useTranslation } from 'react-i18next';
import { formatDate } from '../../utils';

interface Props {
    loaded: boolean;
    publicPath: string;
    generatedAt: number;
}

function Header({
    loaded,
    publicPath,
    generatedAt,
}: Props) {

    const { t } = useTranslation();
    
    return (
        <div className="py-9 bg-yellow-400 dark:bg-indigo-900 shadow-lg">
            <div className="container mx-auto flex">
                <img src={`${publicPath}logo.png`} alt="NamelessMC logo" className="h-20 mr-4"></img>
                <div className="text-gray-50">
                    <h1 className="font-bold text-4xl">{ t('misc.header_title') }</h1>
                    {loaded &&
                        <p className="text-2xl font-bold">
                            { t('misc.generated_at', { time: formatDate(generatedAt) }) }
                        </p>
                    }
                </div>
            </div>
        </div>
    );
}

export default Header;
