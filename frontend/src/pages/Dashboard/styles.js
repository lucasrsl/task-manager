import styled from 'styled-components';

export const Content = styled.div`
  button {
    margin: 50px auto;
    background: #f64c75;
    border-radius: 4px;
    border: 0;
    
    span {
      float: right;
      margin-left: 5px;
      margin-top: 12px;
      margin-right: 5px;
      font-weight: bolder;
    }
  }
`;

export const Table = styled.div``;

export const Column = styled.div`
  display: inline-block;
  width: 300px;
  height: 400px;
  background: #fff;
  margin-right: 5%;
  border: 1px solid;
  border-radius: 4px;
  align-content: center;
  text-align: center;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 200px;
  height: 150px;
  background: #333;
  margin-bottom: 4%;

  span {

  }

  
`;
