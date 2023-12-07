import React, { useEffect } from "react";
import { Container } from "reactstrap";
import TagsList from "../../../component/tags/TagsList";

export default function index() {
  return (
    <main className='s-layout__content'>
      <Container>
        <TagsList />
      </Container>
    </main>
  );
}
