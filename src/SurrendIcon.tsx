import React from 'react';
import Svg, {G, Path} from 'react-native-svg';

interface Props {
  size?: number;
}

const SurrendIcon: React.FC<Props> = ({size = 40}) => {
  return (
    <Svg height={size} viewBox="0 0 203.7 203.7" width={size}>
      <G>
        <Path
          d="M160.9,31.4l-29.1-1.6c-5.4,0-10.5-2.6-13.6-7s-8.2-7-13.6-7l-22.2-1.6l1-5.9C84,4.4,81,0.8,77,0.8c-3.1,0-5.8,2.2-6.3,5.3
         L36.6,202.8h13L67.8,98l36.7,1.8c5.4,0,10.5,0.6,13.6,5s8.2,7,13.6,7h13.7c2.5,0,4.6-1.7,5.2-4.1l16.2-68.3
         C167.8,35.5,164.9,31.6,160.9,31.4z"
          fill="red"
        />
      </G>
    </Svg>
  );
};

export default SurrendIcon;
