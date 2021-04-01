import styled from 'styled-components';

export const PaletteContainer = styled.div`
  height: 160px;
  width: 210px;
  background: #E09F3E;
  box-shadow: 0px 4px 10px 10px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  display: flex;
  flex-wrap: wrap;
`;

export const PaletteColorContainer = styled.div`
  height: 80px;
  width: 70px;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PaletteColor = styled.div<{
  color?: string,
  selected?: boolean,
}>`
  ${props => props.selected ? `
    height: 60px;
    width: 60px;
  ` : `
    height: 50px;
    width: 50px;
  `}
  border: 3px solid black;
  border-radius: 50%;
  background: ${props => props.color};
`;