import styled from 'styled-components';

export const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #9E2A2B;
  box-shadow: 0px 4px 10px 4px rgba(0, 0, 0, 0.25);
  border-radius: 40px;
  height: 160px;
  width: 80px;
`;

export const TopControl = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #FFF3B0;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &:hover {
    box-shadow: 0px 4px 10px 4px rgba(0, 0, 0, 0.25);
  }
`;

export const BottomControl = styled(TopControl)`
  margin-top: 10px;
`;