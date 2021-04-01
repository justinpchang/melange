import styled from 'styled-components';
import { Icon as _Icon } from 'semantic-ui-react';

export const PickedColorContainer = styled.div`
  display: grid;
`;

export const PickedColorBackground = styled.div`
  width: 90px;
  height: 70px;
  box-sizing: border-box;
  border-radius: 0px 100px 100px 0px;
  background: white;
`;

export const PickedColor = styled.div<{
  color: string,
}>`
  width: 90px;
  height: 70px;
  border: 2px solid black;
  box-sizing: border-box;
  border-radius: 0px 100px 100px 0px;
  background: ${props => props.color || 'white'};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
`;

export const Icon = styled(_Icon)`
  margin-left: 10px;
`;