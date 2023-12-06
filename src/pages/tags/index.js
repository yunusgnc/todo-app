import React, { useEffect } from "react";
import { Container } from "reactstrap";
import TagsList from "../../../component/tags/TagsList";

export default function index() {
  return (
    <main className='d-flex justify-content-center w-100 ml-5'>
      <Container>
        <TagsList />
      </Container>
    </main>
  );
}
