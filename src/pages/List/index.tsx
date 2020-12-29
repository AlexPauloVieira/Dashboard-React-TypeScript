import React from "react";

import ContentHeader from "../../components/ContentHeader";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";
import SelectInput from "../../components/SelectInput";

import { Container, Content, Filters } from "./styles";

const List: React.FC = () => {
  const months = [
    { value: 1, label: "Janeiro" },
    { value: 2, label: "Fevereiro" },
    { value: 3, label: "Março" },
  ];

  const years = [
    { value: 2020, label: 2020 },
    { value: 2019, label: 2019 },
    { value: 2018, label: 2018 },
  ];

  return (
    <Container>
      <ContentHeader title='List' lineColor='#ffcc00'>
        <SelectInput options={months} />
        <SelectInput options={years} />
      </ContentHeader>

      <Filters>
        <button type='button' className='tag-filter tag-filter-recurrent'>
          Recorrentes
        </button>
        <button type='button' className='tag-filter tag-filter-eventual'>
          Eventuais
        </button>
      </Filters>

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
