import React from "react";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";

import { Container } from "./styles";

const List: React.FC = () => {
  const options = [
    { value: "Alex", label: "Alex" },
    { value: "Maria", label: "Maria" },
    { value: "Bob", label: "Bob" },
  ];

  return (
    <Container>
      <ContentHeader title='List' lineColor='#ffcc00'>
        <SelectInput options={options} />
      </ContentHeader>
    </Container>
  );
};

export default List;
