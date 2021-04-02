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
  background: #2F4F57;
  max-width: 350px;
  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
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
  flex-direction: row;
  width: 100%;
  justify-content: center;
`;

export const Middle = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
`;

export const Bottom = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
`;