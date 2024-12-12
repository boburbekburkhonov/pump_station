/** @format */

import React, { memo, useCallback } from "react";
import { handleInputChange, isFormValid, closeModal } from "../../utils/inputElementHandler";
import "../../pages/stations/index.css";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const AggregateOrElectricalModal = memo(
  (
    {
      initialData,
      sendData,
      loading,
      openModalData,
      title,
      sendButton,
      canselButton,
      input1Placeholdor,
      input2Placeholdor,
    },
    setStateData,
    setModalData,
    setUpdateData
  ) => {
    const dispatch = useDispatch();
    const { i18n, t } = useTranslation();

    const handleSubmit = useCallback(
      (sendData, actionData) => {
        if (!isFormValid({data: sendData, requiredFields: [
          "name",
          "code",
          "stationId"
        ]})) {
          dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: t("stationsPageData.validInputs") },
          });
          return;
        }

        if (actionData === "aggregate") {
          dispatch(updateStationsData(sendData, token, i18n.language));
        } else {
          dispatch(createStationsData(sendData, token, i18n.language));
        }

        closeModal(
          { data: initialStationData },
          setStationData,
          setIsModalVisible,
          setIsUpdating,
          clearFormFileds
        );
      },
      [aggregateUpdate, isUpdating, dispatch, token, i18n.language, closeModal]
    );

    return (
      <Modal
        key='aggregate_modal'
        title={title}
        open={openModalData}
        centered
        onCancel={() =>
          closeModal(
            initialData,
            setStateData,
            setModalData,
            setUpdateData,
            false
          )
        }
        onOk={() => handleSubmit(sendData, "")}
        confirmLoading={loading}
        footer={[
          <Button
            key='back'
            danger
            type='primary'
            onClick={() =>
              closeModal(
                initialData,
                setStateData,
                setModalData,
                setUpdateData,
                false
              )
            }>
            {canselButton}
          </Button>,

          <Button
            key='submit'
            type='primary'
            onClick={() => handleSubmit(sendData, "")}
            loading={loading}>
            {sendButton}
          </Button>,
        ]}
        style={{
          color: colors.textColor,
        }}
        className='modal_stations'>
        <div className='modal_body_container'>
          <Form
            className='create_stations_form'
            name='aggregate_form'
            initialValues={sendData}
            layout='inline'
            requiredMark='optional'>
            <Form.Item>
              <Input
                size='large'
                className='stations_inputs'
                name='name'
                onChange={(e) => handleInputChange(e, setStateData)}
                placeholder={input1Placeholdor}
                value={sendData.name}
              />
            </Form.Item>

            <Form.Item>
              <Input
                size='large'
                className='stations_inputs'
                name='code'
                onChange={(e) => handleInputChange(e, setStateData)}
                placeholder={input2Placeholdor}
                value={sendData.code}
              />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    );
  }
);

export default AggregateOrElectricalModal;
