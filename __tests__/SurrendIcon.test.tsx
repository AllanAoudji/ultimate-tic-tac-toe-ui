import {render} from '@testing-library/react-native';
import React from 'react';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';
import {DEFAULT_LIGHT_THEME} from '../src/DefaultLight.theme';
import SurrendIcon from '../src/SurrendIcon';

describe('<SurrendIcon />', () => {
  const DEFAULT_SIZE = 25,
    SURREND_ICON_CONTAINER_SVG = 'surrendIcon__container--svg';

  it('renders a <SVG /> container', () => {
    const {queryByTestId} = render(<SurrendIcon />);
    expect(queryByTestId(SURREND_ICON_CONTAINER_SVG)).not.toBeNull();
  });

  it(`renders a <Path /> with /fill === ${DEFAULT_LIGHT_THEME.color.playerX}/`, () => {
    const {getByTestId} = render(<SurrendIcon />);
    expect(
      getByTestId(SURREND_ICON_CONTAINER_SVG).findAllByProps({
        fill: DEFAULT_LIGHT_THEME.color.playerX,
      }).length,
    ).toEqual(1);
  });

  it('/fill/ is based on /player/', () => {
    const {getByTestId} = render(<SurrendIcon player={TileState.Player2} />);
    expect(
      getByTestId(SURREND_ICON_CONTAINER_SVG).findAllByProps({
        fill: DEFAULT_LIGHT_THEME.color.playerO,
      }).length,
    ).toEqual(1);
  });

  it(`have a default /height/ and /width/ of /${DEFAULT_SIZE}/`, () => {
    const {getByTestId} = render(<SurrendIcon />);
    expect(getByTestId(SURREND_ICON_CONTAINER_SVG).props.width).toBe(
      DEFAULT_SIZE,
    );
    expect(getByTestId(SURREND_ICON_CONTAINER_SVG).props.height).toBe(
      DEFAULT_SIZE,
    );
  });

  it('changes /height/ and /width/ based on /size/', () => {
    const size = 100;
    const {getByTestId} = render(<SurrendIcon size={size} />);
    expect(getByTestId(SURREND_ICON_CONTAINER_SVG).props.width).toBe(size);
    expect(getByTestId(SURREND_ICON_CONTAINER_SVG).props.height).toBe(size);
  });
});
