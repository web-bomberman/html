import styled from '@emotion/styled';

export const ButtonsContainer = styled.div`
  width: 800px;
  margin-top: 128px;
  display: flex;
  justify-content: space-between;
  padding: 0px 32px;

  @media (max-width: 800px) {
    width: 100%;
    flex-direction: column;
  }
`;