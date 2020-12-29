import React from "react";

import ContentHeader from "../../components/ContentHeader";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";
import SelectInput from "../../components/SelectInput";

import { Container, Content } from "./styles";

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

      <Content>
        <HistoryFinanceCard
          tagColor='#E44C4E'
          title='Conta de Luz'
          subtitle='28/08/2020'
          amount='R$ 130,00'
        />
      </Content>
    </Container>
  );
};

export default List;
