import React, { createContext, useState } from "react";
import styled from "styled-components";
import PlayerBox from "./components/PlayerBox";
import TopNav from "./components/TopNav";
import colors from "./components/colors";
import MovieRows from "./components/MovieRows";

import vods from "./vods.json";

const Container = styled.div`
  flex: 1;
  background-color: ${colors.background};
  min-height: 100vh;
`;

interface IAppContext {
  movie: string;
  changeMovie: (l: string) => void;
}

export const AppContext = createContext({} as IAppContext);

function App() {
  const [movie, setMovie] = useState("");

  const changeMovie = (l: string) => {
    setMovie(l);
  };

  return (
    <AppContext.Provider value={{ movie, changeMovie }}>
      <Container>
        <TopNav />
        {movie && <PlayerBox />}

        <MovieRows movies={vods.torrents} />
      </Container>
    </AppContext.Provider>
  );
}

export default App;
