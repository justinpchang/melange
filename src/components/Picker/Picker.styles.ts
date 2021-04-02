import styled from 'styled-components';
import { Icon as _Icon } from 'semantic-ui-react';
import { WINDOW_DIMENSIONS } from '../../constants/window';

export const PickedColorContainer = styled.div`
  display: grid;
  margin: 0 auto;
  ${WINDOW_DIMENSIONS.TABLET} {
    margin: 0;
  }
`;

export const PickedColorBackground = styled.div`
  box-sizing: border-box;
  background: white;

  width: 125px;
  height: 105px;
  border-radius: 0px 0px 100px 100px;
  ${WINDOW_DIMENSIONS.TABLET} {
    width: 90px;
    height: 70px;
    border-radius: 0px 100px 100px 0px;
  }
`;

export const PickedColor = styled.div<{
  color: string,
}>`
  border: 2px solid black;
  box-sizing: border-box;
  background: ${props => props.color || 'white'};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;

  width: 125px;
  height: 105px;
  border-radius: 0px 0px 100px 100px;
  ${WINDOW_DIMENSIONS.TABLET} {
    width: 90px;
    height: 70px;
    border-radius: 0px 100px 100px 0px;
  }
`;

export const Icon = styled(_Icon)`
  margin-left: 10px;
`;