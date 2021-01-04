import React, { useMemo, useState } from "react";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import WalletBox from "../../components/WalletBox";
import MessageBox from "../../components/MessageBox";
import PieChart from "../../components/PieChart";

import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";
import listOfMonths from "../../utils/months";

import happyImg from "../../assets/happy.svg";
import sadImg from "../../assets/sad.svg";
import grinningImg from "../../assets/grinning.svg";

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

  const totalExpenses = useMemo(() => {
    let total: number = 0;

    expenses.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch {
          throw new Error("Invalid amount. Amount must be a number");
        }
      }
    });
    return total;
  }, [monthSelected, yearSelected]);

  const totalGains = useMemo(() => {
    let total: number = 0;

    gains.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch {
          throw new Error("Invalid amount. Amount must be a number");
        }
      }
    });
    return total;
  }, [monthSelected, yearSelected]);

  const message = useMemo(() => {
    if (totalGains - totalExpenses < 0) {
      return {
        title: "Que triste",
        description: "Neste mês você gastou mais do que tinha.",
        footerText:
          "Verifique seus gastos e tente cortar algumas coisas desnecessárias.",
        icon: sadImg,
      };
    } else if (totalGains - totalExpenses === 0) {
      return {
        title: "Ufaaa!!!",
        description: "Nesse mês você gastou tudo que ganhou.",
        footerText: "Tome cuidado!!!",
        icon: grinningImg,
      };
    } else {
      return {
        title: "Muito bem!!!",
        description: "Sua carteira está positiva",
        footerText: "Continue assim, considere investir.",
        icon: happyImg,
      };
    }
  }, [totalGains, totalExpenses]);

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
          amount={totalGains - totalExpenses}
          footerLabel='atualizado com base nas entradas e saídas'
          icon='dollar'
        />
        <WalletBox
          color='#F7931B'
          title='entradas'
          amount={totalGains}
          footerLabel='atualizado com base nas entradas e saídas'
          icon='arrowUp'
        />
        <WalletBox
          color='#E44C4E'
          title='saídas'
          amount={totalExpenses}
          footerLabel='atualizado com base nas entradas e saídas'
          icon='arrowDown'
        />
        <MessageBox
          title={message.title}
          description={message.description}
          footerText={message.footerText}
          icon={message.icon}
        />

        <PieChart />
      </Content>
    </Container>
  );
};

export default Dashboard;
