import { fetchTags } from "@/redux/tagsSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardTitle, Col, Row } from "reactstrap";

const TagList = () => {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tags.data);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  console.log(tags);

  return (
    <div className='mt-3'>
      <Row>
        {tags.map((tag) => (
          <Col sm='12' md='6' lg='6' key={tag.id}>
            <Card className='bg-secondary' body>
              <CardTitle tag='h5'>{tag.label}</CardTitle>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TagList;
