import React from 'react';
import Svg, {G, Path} from 'react-native-svg';

interface Props {
  width?: number;
}

const Logo: React.FC<Props> = ({width = 100}) => (
  <Svg
    height={(width * 100) / 500}
    testID="logo__container--svg"
    viewBox="0 0 500 100"
    width={width}>
    <G>
      <Path d="M0.3,2.6h39.8v71.5h43.6v23H0.3V2.6z" fill={'#000'} />
      <Path
        d="M206.3,83.2c-10.2,9.8-26.6,16.4-50.9,16.4c-46.2,0-63.2-21.5-63.2-49.8c0-18.3,7.3-31.6,18.2-39.3
		c9-6.4,20.7-10.5,45-10.5c46.2,0,63.2,21.5,63.2,49.8C218.6,64.4,214.1,75.8,206.3,83.2z M155.3,21.6c-13.1,0-22.7,8.9-22.7,28.3
		c0,19.4,9.6,28.3,22.7,28.3c13.1,0,22.7-8.9,22.7-28.3C178,30.5,168.4,21.6,155.3,21.6z"
        fill={'#000'}
      />
      <Path
        d="M315.9,31.4c-0.5-2.5-2.1-5.4-5-7.6c-2.9-2.2-7.2-3.8-13.5-3.8c-17,0-26.5,11.4-26.5,28.4c0,18.2,8.4,31.3,28.2,31.3
		c8.6,0,14.9-1.3,18.5-3.3V62h-23V42.1h62.9V92c-18.6,4.3-43.2,7.6-64,7.6c-47.5,0-62.2-20.7-62.2-48.6c0-35.5,25-50.9,66.7-50.9
		c34.3,0,58.9,7.5,59.6,31.3H315.9z"
        fill={'#000'}
      />
      <Path
        d="M487.7,83.2c-10.2,9.8-26.6,16.4-50.9,16.4c-46.2,0-63.2-21.5-63.2-49.8c0-18.3,7.3-31.6,18.2-39.3
		c9-6.4,20.7-10.5,45-10.5C483,0.1,500,21.6,500,49.8C500,64.4,495.5,75.8,487.7,83.2z M436.8,21.6c-13.1,0-22.7,8.9-22.7,28.3
		c0,19.4,9.6,28.3,22.7,28.3c13.1,0,22.7-8.9,22.7-28.3C459.4,30.5,449.8,21.6,436.8,21.6z"
        fill={'#000'}
      />
    </G>
  </Svg>
);

export default Logo;
