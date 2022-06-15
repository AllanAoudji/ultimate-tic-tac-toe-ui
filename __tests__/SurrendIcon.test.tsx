import {render} from '@testing-library/react-native';
import React from 'react';
import {TileState} from 'ultimate-tic-tac-toe-algorithm';
import SurrendIcon from '../src/SurrendIcon';

describe('<SurrendIcon />', () => {
  it('renders a <SVG /> container', () => {
    const {queryByTestId} = render(<SurrendIcon />);
    expect(queryByTestId('surrendIcon__container--svg')).not.toBeNull();
  });

  it('renders a <Path /> with /fill === #0012ff', () => {
    const {getByTestId} = render(<SurrendIcon />);
    expect(
      getByTestId('surrendIcon__container--svg').findAllByProps({
        fill: '#0012ff',
      }).length,
    ).toEqual(1);
  });

  it('/fill/ is based on /player/', () => {
    const {getByTestId} = render(<SurrendIcon player={TileState.Player2} />);
    expect(
      getByTestId('surrendIcon__container--svg').findAllByProps({
        fill: '#ed1327',
      }).length,
    ).toEqual(1);
  });

  it('have a default /height/ and /width/ of /40/', () => {
    const {getByTestId} = render(<SurrendIcon />);
    expect(getByTestId('surrendIcon__container--svg').props.width).toBe(40);
    expect(getByTestId('surrendIcon__container--svg').props.height).toBe(40);
  });

  it('changes /height/ and /width/ based on /size/', () => {
    const {getByTestId} = render(<SurrendIcon size={100} />);
    expect(getByTestId('surrendIcon__container--svg').props.width).toBe(100);
    expect(getByTestId('surrendIcon__container--svg').props.height).toBe(100);
  });
});
