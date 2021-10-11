import {useTranslation} from "react-i18next";

export function Translation({text}) {
    const {t} = useTranslation();
    
    return <>{t(text)}</>;
}