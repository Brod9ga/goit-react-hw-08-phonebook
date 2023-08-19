import { Button } from 'antd';
import styled from 'styled-components';

export const StyledSubmitBtn = styled(Button)`
  background-color: blue;
  margin-top: 15px;
  color: white;
  &:hover {
    background-color: gold;
    color: black;
  }
`;

export const ContactsSyled = styled.div`
padding: 15px;
/* background-image: url('https://cdn.pixabay.com/photo/2018/11/29/21/51/social-media-3846597_1280.png'); */
background-color: cadetblue;
  background-size: cover;
  margin-top: 8px;
  height: 100vh; 
 
  left: 0px;
  top: -10px;
  z-index: -1;

`