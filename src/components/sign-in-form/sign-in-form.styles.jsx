import styled from "styled-components";

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;

  h2 {
    margin: 10px 0px;
  }

  ${ButtonContainer} {
    display: flex;
    justify-content: space-between;
  }
`;
