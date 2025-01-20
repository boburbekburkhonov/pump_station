/** @format */

export const handleInputChange = ({ target: { name, value } }, setSendData) => {
  setSendData((prev) => ({ ...prev, [name]: value }));
};

export const handleCheckboxChange = (
  { target: { name, checked } },
  setSendData
) => {
  setSendData((prev) => ({ ...prev, [name]: checked }));
};

export const handleSelectChange = (value, { name }, setSendData) => {
  setSendData((prev) => ({ ...prev, [name]: value }));
};

export const renderOptions = (list) =>
  list.map((item) => ({
    value: item.id,
    label: item.name,
  }));

export const openModal = (
  { data, isEdit = false },
  setSendData,
  setModalData,
  setIsUpdating
) => {
  setSendData(data);
  setIsUpdating(isEdit);
  setModalData(true);
};

export const closeModal = (
  { data, isEdit = false },
  setSendData,
  setModalData,
  setIsUpdating,
  clearFormFileds
) => {
  setSendData(data);
  setIsUpdating(isEdit);
  setModalData(false);
  clearFormFileds()
};

export const isFormValid = ({ data, requiredFields }) => {
  return requiredFields.every((field) => data?.[field]?.toString().trim());
};

export const formatDate = (inputDate) => {
  if (!inputDate) {
    return null;
  }
  const [year, hours] = inputDate.split("T");
  const [hour, minuts, seconds] = hours.split(":");

  const formattedDate = `${year} ${hour}:${minuts}:${seconds.split(".")[0]}`;

  return formattedDate;
}