import styled from 'styled-components';

export const Home = styled.div`
  background-image: url('https://cdn.pixabay.com/photo/2019/04/04/15/17/smartphone-4103051_1280.jpg');
  background-size: cover; /* Этот стиль масштабирует фон, чтобы он покрывал всю область */
  width: 100%;
  height: 100vh; /* Это установит высоту фона равной высоте видимой области (viewport height) */
  position: fixed;
  left: 0px;
  top: -10px;
  z-index: -1;
`;
