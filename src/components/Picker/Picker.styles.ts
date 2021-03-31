import styled from 'styled-components';

export const PickedColor = styled.div<{
  color: string,
}>`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 1px solid black;
  margin: 20px;
  background: ${props => props.color || 'white'};
`;