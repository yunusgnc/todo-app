import { fetchTags } from "@/redux/tagsSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "reactstrap";

const TagList = () => {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tags.data);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  console.log(tags);

  return (
    <div>
      {/* {tags.map((tag) => (
        <Badge key={tag.id} color='primary' className='m-1'>
          {tag.label}
        </Badge>
      ))} */}
    </div>
  );
};

export default TagList;
