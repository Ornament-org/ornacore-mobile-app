import React from 'react';
import Svg, { Circle, Ellipse, Path } from 'react-native-svg';

const svgProps = (size) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
});

const strokeProps = (color) => ({
  stroke: color,
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
});

export const IngotsGlyph = ({ color, size = 20 }) => (
  <Svg {...svgProps(size)}>
    <Path d="M9.2 4.5h5.6l1.9 4.5H7.3l1.9-4.5z" {...strokeProps(color)} />
    <Path d="M4 13.5h5.6l1.9 4.5H2.1L4 13.5z" {...strokeProps(color)} />
    <Path d="M14.4 13.5H20l1.9 4.5H12.5l1.9-4.5z" {...strokeProps(color)} />
  </Svg>
);

export const DiamondGlyph = ({ color, size = 20 }) => (
  <Svg {...svgProps(size)}>
    <Path d="M7 4h10l4 5-9 11L3 9l4-5z" {...strokeProps(color)} />
    <Path d="M3 9h18M9.5 4 8 9l4 11M14.5 4 16 9l-4 11" {...strokeProps(color)} />
  </Svg>
);

export const EarringsGlyph = ({ color, size = 24 }) => (
  <Svg {...svgProps(size)}>
    <Path d="M8.5 3v3.2M15.5 3v3.2" {...strokeProps(color)} />
    <Path d="M8.5 6.2c-1.7 2-2.7 3.4-2.7 5a2.7 2.7 0 1 0 5.4 0c0-1.6-1-3-2.7-5z" {...strokeProps(color)} />
    <Path d="M15.5 6.2c-1.7 2-2.7 3.4-2.7 5a2.7 2.7 0 1 0 5.4 0c0-1.6-1-3-2.7-5z" {...strokeProps(color)} />
  </Svg>
);

export const ChainGlyph = ({ color, size = 24 }) => (
  <Svg {...svgProps(size)}>
    <Ellipse cx="7.5" cy="7.5" rx="3.4" ry="4.5" transform="rotate(-45 7.5 7.5)" {...strokeProps(color)} />
    <Ellipse cx="16.5" cy="16.5" rx="3.4" ry="4.5" transform="rotate(-45 16.5 16.5)" {...strokeProps(color)} />
  </Svg>
);

export const BangleGlyph = ({ color, size = 24 }) => (
  <Svg {...svgProps(size)}>
    <Ellipse cx="12" cy="12" rx="9" ry="6" {...strokeProps(color)} />
    <Ellipse cx="12" cy="12" rx="5.6" ry="3.4" {...strokeProps(color)} />
  </Svg>
);

export const RingGlyph = ({ color, size = 24 }) => (
  <Svg {...svgProps(size)}>
    <Circle cx="12" cy="14.5" r="6" {...strokeProps(color)} />
    <Path d="M12 2.8l2.6 2.9-2.6 2.9-2.6-2.9L12 2.8z" {...strokeProps(color)} />
  </Svg>
);

export const PendantGlyph = ({ color, size = 24 }) => (
  <Svg {...svgProps(size)}>
    <Path d="M4.5 3l7.5 8 7.5-8" {...strokeProps(color)} />
    <Path d="M12 11l2.4 3.1L12 19l-2.4-4.9L12 11z" {...strokeProps(color)} />
  </Svg>
);

export const glyphForCategory = (name = '') => {
  const key = name.toLowerCase();
  if (key.includes('earring') || key.includes('jhumka') || key.includes('bali')) return EarringsGlyph;
  if (key.includes('chain')) return ChainGlyph;
  if (key.includes('bangle') || key.includes('kada')) return BangleGlyph;
  if (key.includes('ring') || key.includes('nath')) return RingGlyph;
  if (key.includes('pendant') || key.includes('mangalsutra') || key.includes('nose')) return PendantGlyph;
  return DiamondGlyph;
};
