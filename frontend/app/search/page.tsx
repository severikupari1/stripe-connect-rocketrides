"use client"
import React from "react";
import styled from "styled-components";

import InputField from "./inputField";
import { NoSSR } from "next/dist/shared/lib/lazy-dynamic/dynamic-no-ssr";


export default function GeoCoding() {
  return (
    <NoSSR >
      <Wrapper >
        <ContentWrapper>
          <Title>Geocoding with Mapbox</Title>
          <InputField/>
        </ContentWrapper>
      </Wrapper>

    </NoSSR>

  );
};


const Wrapper = styled.div`
  //background: none;
  height: 20vh;
  z-index: 2;
  ////margin: ;
  position: fixed;
  //width: 10rem;
  top: 100px;
  left: 100px;
`;

const ContentWrapper = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
  Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-style: normal;
  font-weight: bold;
  //font-size: 40px;
  //line-height: 48px;
  //color: #ffffff;
  text-align: center;
`;
