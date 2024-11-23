import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
  color: white;
  border-radius: 8px;
  padding: 24px;
  max-width: 500px;
  width: 90%;
  position: relative;
  z-index: 1000;
  > h2{
    padding-bottom: 16px;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;
