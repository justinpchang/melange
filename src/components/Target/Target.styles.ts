import styled from 'styled-components';
import { Icon as _Icon } from 'semantic-ui-react';
import { WINDOW_DIMENSIONS } from '../../constants/window';

export const TargetColor = styled.div<{
  color: string,
}>`
  border: 2px solid black;
  box-sizing: border-box;
  background: ${props => props.color || 'white'};
  display: flex;
  justify-content: center;
  align-items: center;

  width: 125px;
  height: 105px;
  border-radius: 100px 100px 0px 0px;
  margin: 0 auto;
  ${WINDOW_DIMENSIONS.TABLET} {
    width: 90px;
    height: 70px;
    border-radius: 100px 0px 0px 100px;
    margin: 0;
  }
`;

export const Icon = styled(_Icon)`
  margin-left: 10px;
`;

export const TargetText = styled.div`
  font-family: monospace;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: .2rem;
  text-align: center;

  padding-left: auto;
  ${WINDOW_DIMENSIONS.TABLET} {
    padding-left: 10px;
  }
`;