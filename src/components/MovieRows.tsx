import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../App";

const Container = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  height: 200px;
`;

const MovieCard = styled.img`
  height: 100%;
  margin-left: 20px;
`;

const MovieRows: React.FC<{
  movies: {
    l: string;
    i: string;
    n: string;
  }[];
}> = ({ movies }) => {
  const ctx = useContext(AppContext);

  return (
    <Container>
      {movies.map((m) => (
        <MovieCard key={m.l} src={m.i} onClick={() => ctx.changeMovie(m.l)} />
      ))}
    </Container>
  );
};

export default MovieRows;
