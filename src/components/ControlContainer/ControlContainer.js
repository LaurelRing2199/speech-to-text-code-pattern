import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown,
  FormGroup,
  TextArea,
  Tile,
  ToggleSmall,
} from 'carbon-components-react';
import SubmitContainer from '../SubmitContainer';
import models from '../../data/models.json';

export const ControlContainer = ({
  isRecording,
  isUploadPlaying,
  onError,
  onSelectNewModel,
  onStartPlayingFileUpload,
  onStopPlayingFileUpload,
  onStartRecording,
  onStopRecording,
}) => {
  const dropdownChoices = models.map(model => ({
    id: model.name,
    label: model.description,
    supportsSpeakerLabels: model.supported_features.speaker_labels,
  }));

  const [model, selectModel] = useState(dropdownChoices[0]);
  const [keywordText, setKeywordText] = useState(models[0].keywords);
  const [useSpeakerLabels, setUseSpeakerLabels] = useState(false);

  const onChangeLanguageModel = newModel => {
    selectModel(newModel.selectedItem);

    const newKeywordText = models.find(
      model => model.name === newModel.selectedItem.id,
    ).keywords;
    setKeywordText(newKeywordText);

    if (useSpeakerLabels && !newModel.selectedItem.supportsSpeakerLabels) {
      setUseSpeakerLabels(false);
    }

    onSelectNewModel();
  };

  return (
    <Tile className="control-container">
      <h3 className="container-title">Input</h3>
      <FormGroup legendText="Language model">
        <Dropdown
          id="language-model-dropdown"
          label="Select a language model"
          onChange={onChangeLanguageModel}
          items={dropdownChoices}
          selectedItem={model && model.label}
          defaultText="Select a language model"
          ariaLabel="Language selection dropdown"
          light
        />
      </FormGroup>
      <SubmitContainer
        isRecording={isRecording}
        isUploadPlaying={isUploadPlaying}
        keywordText={keywordText}
        modelName={model && model.id}
        onError={onError}
        onStartPlayingFileUpload={onStartPlayingFileUpload}
        onStopPlayingFileUpload={onStopPlayingFileUpload}
        onStartRecording={onStartRecording}
        onStopRecording={onStopRecording}
        useSpeakerLabels={useSpeakerLabels}
      />
    </Tile>
  );
};

ControlContainer.propTypes = {
  isRecording: PropTypes.bool,
  isUploadPlaying: PropTypes.bool,
  onError: PropTypes.func,
  onSelectNewModel: PropTypes.func,
  onStartPlayingFileUpload: PropTypes.func,
  onStopPlayingFileUpload: PropTypes.func,
  onStartRecording: PropTypes.func,
  onStopRecording: PropTypes.func,
};

ControlContainer.defaultProps = {
  isRecording: false,
  isUploadPlaying: false,
  onError: () => {},
  onSelectNewModel: () => {},
  onStartPlayingFileUpload: () => {},
  onStopPlayingFileUpload: () => {},
  onStartRecording: () => {},
  onStopRecording: () => {},
};

export default ControlContainer;
