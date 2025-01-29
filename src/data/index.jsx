import {
    CarryOutOutlined,
    WarningOutlined,
    InteractionOutlined,
    AppstoreOutlined,
    CheckCircleOutlined,
    ExclamationCircleOutlined,
    ApartmentOutlined,
} from "@ant-design/icons";

const iconComponents = [
    AppstoreOutlined,
    CheckCircleOutlined,
    ExclamationCircleOutlined,
    ApartmentOutlined,
    CarryOutOutlined,
    WarningOutlined,
    InteractionOutlined,
    CarryOutOutlined,
    WarningOutlined,
    InteractionOutlined,
    WarningOutlined
];

export const getIcon = (index, color) => {
    const IconComponent = iconComponents[index % iconComponents.length];
    return <IconComponent style={{ fontSize: "40px", color }} />;
};
