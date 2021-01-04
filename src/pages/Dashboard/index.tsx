import React, { useMemo, useState } from "react";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import WalletBox from "../../components/WalletBox";
import MessageBox from "../../components/MessageBox";

import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";
import listOfMonths from "../../utils/months";

import happyImg from "../../assets/happy.svg";
// import sadImg from "../../assets/sad.svg";

import { Container, Content } from "./styles";

const Dashboard: React.FC = () => {
  const [monthSelected, setMonthSelected] = useState<number>(
    new Date().getMonth() + 1
  );
  const [yearSelected, setYearSelected] = useState<number>(
    new Date().getFullYear()
  );

  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    [...expenses, ...gains].forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();

      if (!uniqueYears.includes(year)) {
        uniqueYears.push(year);
      }
    });

    return uniqueYears.map((year) => {
      return {
        value: year,
        label: year,
      };
    });
  }, []);

  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      };
    });
  }, []);

  const handleMonthSelected = (month: string) => {
    try {
      const parsedMonth = Number(month);
      setMonthSelected(parsedMonth);
    } catch (error) {
      throw new Error("Invalid month value");
    }
  };

  const handleYearSelected = (year: string) => {
    try {
      const parsedYear = Number(year);
      setYearSelected(parsedYear);
    } catch (error) {
      throw new Error("Invalid year value");
    }
  };

  return (
    <Container>
      <ContentHeader title='Dashboard' lineColor='#4E41F0'>
        <SelectInput
          options={months}
          onChange={(e) => handleMonthSelected(e.target.value)}
          defaultValue={monthSelected}
        />
        <SelectInput
          options={years}
          onChange={(e) => handleYearSelected(e.target.value)}
          defaultValue={yearSelected}
        />
      </ContentHeader>

      <Content>
        <WalletBox
          color='#4E41F0'
          title='saldo'
          amount={150.0}
          footerLabel='atualizado com base nas entradas e saídas'
          icon='dollar'
        />
        <WalletBox
          color='#F7931B'
          title='entradas'
          amount={5000.0}
          footerLabel='atualizado com base nas entradas e saídas'
          icon='arrowUp'
        />
        <WalletBox
          color='#E44C4E'
          title='saídas'
          amount={4850.0}
          footerLabel='atualizado com base nas entradas e saídas'
          icon='arrowDown'
        />
        <MessageBox
          title='Muito bem!!!'
          description='Sua carteira está positiva'
          footerText='Continue assim, considere investir seu saldo.'
          icon={happyImg}
        />
      </Content>
    </Container>
  );
};

export default Dashboard;
