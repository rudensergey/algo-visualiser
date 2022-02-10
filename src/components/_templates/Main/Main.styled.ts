import styled from "styled-components";

import ButtonComponent from "@shared/Button";

export const Wrapper = styled.div({
  height: "100%",
  padding: "100px",
  boxSizing: "border-box",
  backgroundColor: "#2c4050",

  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "flex-start",
  alignContent: "flex-start",
  flexWrap: "wrap",
  gap: "30px",
});

export const Button = styled(
  styled(ButtonComponent)((props: { color: string }) => ({
    flexBasis: "200px",
    height: "200px",
    border: "0",

    backgroundColor: props?.color || "coral",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(54, 54, 54, 0.5)",
    color: "white",
    fontSize: "30px",
    fontWeight: "bold",

    cursor: "pointer",

    transition: "all",
    transitionDuration: "0.1s",
  }))
)`
  &: active {
    background-color: coral;
    transform: scale(99%);
  }
`;

export const Title = styled.h1({
  flex: "0 0 100%",
  height: "100px",
  textAlign: "center",

  color: "white",
  fontSize: "50px",
});
