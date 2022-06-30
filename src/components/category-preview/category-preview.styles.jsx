import styled from "styled-components";

export const CategoryPreviewContainer = styled.div`
  min-width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  justify-content: center;
`;

export const Title = styled.span`
  font-size: 28px;
  margin-bottom: 25px;
  cursor: pointer;
`;

export const Preview = styled.div`
  /* min-width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px; */

  /* min-width: 90%; */
  display: flex;
  justify-content: left;
  flex-wrap: wrap;

     @media only screen and (max-width: 531px) {
        display: grid;
        grid-template-rows: repeat(1, 1fr);
        justify-content: center;
    }
`;
