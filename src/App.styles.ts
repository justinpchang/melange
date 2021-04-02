import styled from 'styled-components';
import { WINDOW_DIMENSIONS } from './constants/window';

export const Header = styled.div`
  margin-top: 20px;
  color: white;
  font-family: monospace;
  text-align: center;
  font-size: 30px;
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-left: -30px;
  position: relative;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;


export const Content = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;

  max-width: 90%;
  flex-direction: row;
  justify-content: center;
  ${WINDOW_DIMENSIONS.TABLET} {
    max-width: 350px;
    flex-direction: column;
    justify-content: space-evenly;
  }
`;

export const Footer = styled.div`
  width: 100%;
  color: white;
  font-family: monospace;
  text-align: center;
  margin-bottom: 20px;
`;

export const Top = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  flex-direction: column;
  ${WINDOW_DIMENSIONS.TABLET} {
    flex-direction: row;
  }
`;

export const Middle = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;

  flex-direction: column;
  ${WINDOW_DIMENSIONS.TABLET} {
    flex-direction: row;
  }
`;

export const Bottom = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  flex-direction: column;
  ${WINDOW_DIMENSIONS.TABLET} {
    flex-direction: row;
  }
`;