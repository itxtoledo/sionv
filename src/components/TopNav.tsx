import React from "react";
import styled from "styled-components";
import { AiOutlineSetting } from "react-icons/ai";
import colors from "./colors";

const Container = styled.div`
  display: flex;
  position: relative;
  height: 50px;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  color: white;
  font-family: Verdana, Geneva, sans-serif;
  background-color: ${colors.topNav};
  /* box-shadow: 0px 4px 24px -5px rgba(0, 0, 0, 0.75); */
`;

const TopNav: React.FC = () => {
  return (
    <Container>
      SIONV - Free VOD
      <AiOutlineSetting color="white" size={25} style={{ cursor: "pointer" }} />
    </Container>
  );
};

export default TopNav;
