import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';
import {DEFAULT_LIGHT_THEME} from '../src/DefaultLight.theme';

import SurrendModal from '../src/SurrendModal';
import {getStyle} from './testUtils';

describe('<SurrendModal />', () => {
  const NO_TEXT = 'no',
    PLAYER_1_COLOR = '#0012ff',
    PLAYER_2_COLOR = '#ed1327',
    SURREND_MODAL_BUTTON_NO_TEST_ID = 'surrendModal__button--no',
    SURREND_MODAL_BUTTON_YES_TEST_ID = 'surrendModal__button--yes',
    SURREND_MODAL_CONTAINER_INNER_TEST_ID = 'surrendModal__container--inner',
    SURREND_TEXT = 'Surrend?',
    YES_TEXT = 'yes';
  let onPress: jest.Mock;

  beforeEach(() => {
    onPress = jest.fn();
  });

  afterEach(() => {
    onPress.mockRestore();
  });

  it('render a <Container />', () => {
    const {queryByText} = render(<SurrendModal />);
    expect(queryByText(SURREND_TEXT)).not.toBeNull();
  });

  it('renders a "yes" <Pressable />', () => {
    const {queryByText} = render(<SurrendModal />);
    expect(queryByText(YES_TEXT)).not.toBeNull();
  });

  it('calls /onPressYes/ when "yes" <Pressable /> is pressed', () => {
    const {getByText} = render(<SurrendModal onPressYes={onPress} />);
    fireEvent.press(getByText(YES_TEXT));
    expect(onPress).toHaveBeenCalled();
  });

  it('renders a "no" <Pressable />', () => {
    const {queryByText} = render(<SurrendModal />);
    expect(queryByText(NO_TEXT)).not.toBeNull();
  });

  it('calls /onPressNo/ when "no" <Pressable /> is pressed', () => {
    const {getByText} = render(<SurrendModal onPressNo={onPress} />);
    fireEvent.press(getByText(NO_TEXT));
    expect(onPress).toHaveBeenCalled();
  });

  it(`disables ${NO_TEXT} <Pressable /> if /disabled === true/`, () => {
    const {getByTestId} = render(<SurrendModal disabled={true} />);
    expect(
      getByTestId(SURREND_MODAL_BUTTON_NO_TEST_ID).props.accessibilityState
        .disabled,
    ).toBe(true);
  });

  it(`disables ${YES_TEXT} <Pressable /> if /disabled === true/`, () => {
    const {getByTestId} = render(<SurrendModal disabled={true} />);
    expect(
      getByTestId(SURREND_MODAL_BUTTON_YES_TEST_ID).props.accessibilityState
        .disabled,
    ).toBe(true);
  });

  it(`set /borderColor: ${DEFAULT_LIGHT_THEME.color.playerO}/ if /player === Player2/`, () => {
    const {getByTestId} = render(<SurrendModal player={TileState.Player2} />);
    expect(
      getByTestId(SURREND_MODAL_CONTAINER_INNER_TEST_ID).props.style
        .borderColor,
    ).toBe(DEFAULT_LIGHT_THEME.color.playerO);
  });

  it(`set /borderColor: ${DEFAULT_LIGHT_THEME.color.playerX}/ on the innerContainer <Container /> if /player === Player1/`, () => {
    const {getByTestId} = render(<SurrendModal />);
    expect(
      getByTestId(SURREND_MODAL_CONTAINER_INNER_TEST_ID).props.style
        .borderColor,
    ).toBe(DEFAULT_LIGHT_THEME.color.playerX);
  });

  it(`set /shadowColor: ${DEFAULT_LIGHT_THEME.color.playerX}/ if /player === Player1/`, () => {
    const {getByTestId} = render(<SurrendModal />);
    expect(
      getByTestId(SURREND_MODAL_CONTAINER_INNER_TEST_ID).props.style
        .shadowColor,
    ).toBe(DEFAULT_LIGHT_THEME.color.playerX);
  });

  it(`set /shadowColor: ${DEFAULT_LIGHT_THEME.color.playerO}/ if /player === Player2/`, () => {
    const {getByTestId} = render(<SurrendModal player={TileState.Player2} />);
    expect(
      getByTestId(SURREND_MODAL_CONTAINER_INNER_TEST_ID).props.style
        .shadowColor,
    ).toBe(DEFAULT_LIGHT_THEME.color.playerO);
  });

  it(`set /color: ${DEFAULT_LIGHT_THEME.color.playerO}/ on the title if /player === Player2/`, () => {
    const {getByText} = render(<SurrendModal player={TileState.Player2} />);
    expect(getStyle(getByText(SURREND_TEXT))).toEqual(
      expect.objectContaining({
        color: DEFAULT_LIGHT_THEME.color.playerO,
      }),
    );
  });

  it(`set /color: ${DEFAULT_LIGHT_THEME.color.playerX}/ on the title if /player === Player1/`, () => {
    const {getByText} = render(<SurrendModal />);
    expect(getStyle(getByText(SURREND_TEXT))).toEqual(
      expect.objectContaining({
        color: DEFAULT_LIGHT_THEME.color.playerX,
      }),
    );
  });

  it(`set /backgroundColor: ${PLAYER_2_COLOR}/ on the "yes" <Button /> if /player === Player2/`, () => {
    const {getByTestId} = render(<SurrendModal player={TileState.Player2} />);
    expect(getByTestId(SURREND_MODAL_BUTTON_YES_TEST_ID).props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: PLAYER_2_COLOR,
        }),
      ]),
    );
  });

  it(`set /backgroundColor: ${PLAYER_1_COLOR}/ on the "yes" <Button /> if /player === Player1/`, () => {
    const {getByTestId} = render(<SurrendModal />);
    expect(getByTestId(SURREND_MODAL_BUTTON_YES_TEST_ID).props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: PLAYER_1_COLOR,
        }),
      ]),
    );
  });

  it(`set /color: ${DEFAULT_LIGHT_THEME.color.onPlayerO}/ on the "${YES_TEXT}" <Button /> text if /Player === Player2/`, () => {
    const {getByText} = render(<SurrendModal player={TileState.Player2} />);
    expect(getStyle(getByText(YES_TEXT))).toEqual(
      expect.objectContaining({
        color: DEFAULT_LIGHT_THEME.color.onPlayerO,
      }),
    );
  });

  it(`set /color: ${DEFAULT_LIGHT_THEME.color.onPlayerX}/ on the "${YES_TEXT}" <Button /> text if /Player === Player1/`, () => {
    const {getByText} = render(<SurrendModal />);
    expect(getStyle(getByText(YES_TEXT))).toEqual(
      expect.objectContaining({
        color: DEFAULT_LIGHT_THEME.color.onPlayerX,
      }),
    );
  });

  it(`set /borderColor: ${PLAYER_2_COLOR}/ on the "no" <Button /> if /Player === Player2/`, () => {
    const {getByTestId} = render(<SurrendModal player={TileState.Player2} />);
    expect(getByTestId(SURREND_MODAL_BUTTON_NO_TEST_ID).props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          borderColor: PLAYER_2_COLOR,
        }),
      ]),
    );
  });

  it(`set /borderColor: ${PLAYER_1_COLOR}/ on the "no" <Button /> if /Player === Player1/`, () => {
    const {getByTestId} = render(<SurrendModal />);
    expect(getByTestId(SURREND_MODAL_BUTTON_NO_TEST_ID).props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          borderColor: PLAYER_1_COLOR,
        }),
      ]),
    );
  });

  it(`set /color: ${DEFAULT_LIGHT_THEME.color.playerO}/ on the "no" <Button /> text if /Player === Player2/`, () => {
    const {getByText} = render(<SurrendModal player={TileState.Player2} />);
    expect(getStyle(getByText(NO_TEXT))).toEqual(
      expect.objectContaining({
        color: DEFAULT_LIGHT_THEME.color.playerO,
      }),
    );
  });

  it(`set /color: ${DEFAULT_LIGHT_THEME.color.playerX}/ on the "no" <Button /> text if /Player === Player1/`, () => {
    const {getByText} = render(<SurrendModal />);
    expect(getStyle(getByText(NO_TEXT))).toEqual(
      expect.objectContaining({
        color: DEFAULT_LIGHT_THEME.color.playerX,
      }),
    );
  });
});
