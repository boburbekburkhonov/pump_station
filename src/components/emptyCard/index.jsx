import { Empty } from 'antd';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

const EmptyCard = () => {
    const {t} = useTranslation()

    return (
        <Empty description={t("dashboardPageData.emptyData")}  />
    );
};

export default memo(EmptyCard);