import styled from 'styled-components';

export const Header = styled.div`
  margin-top: 30px;
  color: white;
  font-family: monospace;
  text-align: center;
  font-size: 30px;
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-left: -30px;
`;

export const MainContainer = styled.div`
  background: #2F4F57;
  width: 90%;
  max-width: 350px;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
`;

export const Top = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  margin-top: 20px;
`;

export const Middle = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  margin-top: 20px;
`;

export const Bottom = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
  margin-top: 20px;
`;

export const Footer = styled.div`
  width: 100%;
  margin-top: 30px;
  color: white;
  font-family: monospace;
  text-align: center;
`;