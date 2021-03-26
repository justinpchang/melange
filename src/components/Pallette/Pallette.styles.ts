import styled from 'styled-components';

export const PalletteColor = styled.div<{
  color?: string,
}>`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 1px solid black;
  border-radius: 50%;
  margin: 20px;
  background: ${props => props.color};
`;