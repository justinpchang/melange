import styled from 'styled-components';
import { WINDOW_DIMENSIONS } from '../../constants/window';

export const PaletteContainer = styled.div`
  background: #E09F3E;
  box-shadow: 0px 4px 10px 10px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;

  width: 18vw;
  height: 24vw;
  max-width: 190px;
  max-height: 250px;
  ${WINDOW_DIMENSIONS.TABLET} {
    width: 210px;
    height: 160px;
  }
`;

export const PaletteColorContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 33.3%;
  width: 50%;
  ${WINDOW_DIMENSIONS.TABLET} {
    height: 50%;
    width: 33.3%;
  }
`;

export const PaletteColor = styled.div<{
  color?: string,
  selected?: boolean,
}>`
  border: 3px solid black;
  border-radius: 50%;
  background: ${props => props.color};
  ${props => props.selected ? `
    height: 7vw;
    width: 7vw;
    max-height: 70px;
    max-width: 70px;
  ` : `
    height: 6vw;
    width: 6vw;
    max-height: 60px;
    max-width: 60px;
  `}
  ${WINDOW_DIMENSIONS.TABLET} {
    ${props => props.selected ? `
      height: 60px;
      width: 60px;
    ` : `
      height: 50px;
      width: 50px;
    `}
  }
`;