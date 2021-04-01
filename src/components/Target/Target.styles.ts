import styled from 'styled-components';
import { Icon as _Icon } from 'semantic-ui-react';

export const TargetColor = styled.div<{
  color: string,
}>`
  width: 90px;
  height: 70px;
  border: 2px solid black;
  box-sizing: border-box;
  border-radius: 100px 0px 0px 100px;
  background: ${props => props.color || 'white'};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Icon = styled(_Icon)`
  margin-left: 10px;
`;

export const TargetText = styled.div`
  font-family: monospace;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: .2rem;
`;