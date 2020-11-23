import React from "react";
import styled from "styled-components";
import PlayerBox from "./components/PlayerBox";
import TopNav from "./components/TopNav";
import colors from "./components/colors";

const Container = styled.div`
  flex: 1;
  background-color: ${colors.background};
  min-height: 100vh;
`;

function App() {
  return (
    <Container>
      <TopNav />
      <PlayerBox />
    </Container>
  );
}

export default App;
