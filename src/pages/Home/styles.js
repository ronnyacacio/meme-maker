import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Card = styled.div`
  width: 550px;

  background: #fff;
  border-radius: 8px;
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.2);

  margin-top: 15px;
  padding: 20px;

  h2 {
    font-size: 22px;
    color: #392d2d;
    margin-bottom: 10px;
  }
`;

export const Templates = styled.div`
  width: 100%;
  height: 90px;

  display: flex;
  align-items: center;

  background: #eee;
  border-radius: 8px;
  margin-bottom: 30px;
  padding: 0 15px;

  overflow-y: auto;

  button {
    border: 0;
    background: transparent;
    margin-right: 10px;
    border: 2px solid transparent;

    &.selected {
      border-color: #4395d8;
    }

    img {
      width: 53px;
      height: 53px;
    }
  }
`;

export const Form = styled.form`
  input {
    width: 100%;
    height: 40px;
    border-radius: 8px;
    border: 1px solid #dbdbdb;
    padding: 0 15px;
    font-size: 14px;
    margin-bottom: 10px;
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 8px;
  border: 0;
  background: #4395d8;
  color: #fff;
  font-size: 14px;
  font-weight: bold;

  transition: background 0.2s ease-in;

  &:hover {
    background: #3672a3;
  }
`;
