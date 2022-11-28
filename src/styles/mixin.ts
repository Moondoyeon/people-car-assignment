import { css } from 'styled-components';

export const flexBox = (direction = 'row', justify = 'center', align = 'center') => css`
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justify};
  align-items: ${align};
`;

export const positionCenterX = (type: 'absolute' | 'fixed' = 'absolute') => css`
  position: ${type};
  left: 50%;
  transform: translateX(-50%);
`;

export const positionCenterY = (type: 'absolute' | 'fixed' = 'absolute') => css`
  position: ${type};
  top: 50%;
  transform: translateY(-50%);
`;

export const positionCenter = (type: 'absolute' | 'fixed' = 'absolute') => css`
  position: ${type};
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const responsive = (device: 'phone' | 'desktop') => {
  switch (device) {
    case 'phone':
      return `@media screen and (max-width: 450px)`;
    case 'desktop':
      return `@media screen and (min-width: 451px)`;
    default:
      return '';
  }
};
