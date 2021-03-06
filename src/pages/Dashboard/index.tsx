import React, { useMemo, useState, useCallback } from "react";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import WalletBox from "../../components/WalletBox";
import MessageBox from "../../components/MessageBox";
import PieChartBox from "../../components/PieChartBox";
import HistoryBox from "../../components/HistoryBox";
import BarChartBox from "../../components/BarChartBox";

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
    } else if (totalGains === 0 && totalExpenses === 0) {
      return {
        title: "Op's",
        description: "Não há registro no período selecionado",
        footerText: "Fique atento!!!",
        icon: grinningImg,
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

  const relationExpensesVersusGains = useMemo(() => {
    const total = totalGains + totalExpenses;

    const percentGains = Number(((totalGains / total) * 100).toFixed(1));
    const percentExpenses = Number(((totalExpenses / total) * 100).toFixed(1));

    const data = [
      {
        name: "Entradas",
        value: totalGains,
        percent: percentGains ? percentGains : 0,
        color: "#F7931B",
      },
      {
        name: "Saídas",
        value: totalExpenses,
        percent: percentExpenses ? percentExpenses : 0,
        color: "#E44C4E",
      },
    ];

    return data;
  }, [totalGains, totalExpenses]);

  const historyData = useMemo(() => {
    return listOfMonths
      .map((_, month) => {
        let amountEntry = 0;
        gains.forEach((gain) => {
          const date = new Date(gain.date);
          const gainMonth = date.getMonth();
          const gainYear = date.getFullYear();

          if (gainMonth === month && gainYear === yearSelected) {
            try {
              amountEntry += Number(gain.amount);
            } catch {
              throw new Error(
                "Amount entry is invalid, amountEntry must be a number"
              );
            }
          }
        });

        let amountOutput = 0;
        expenses.forEach((expense) => {
          const date = new Date(expense.date);
          const expenseMonth = date.getMonth();
          const expenseYear = date.getFullYear();

          if (expenseMonth === month && expenseYear === yearSelected) {
            try {
              amountOutput += Number(expense.amount);
            } catch {
              throw new Error(
                "Amount output is invalid, amountOutput must be a number"
              );
            }
          }
        });

        return {
          monthNumber: month,
          month: listOfMonths[month].substr(0, 3),
          amountEntry,
          amountOutput,
        };
      })
      .filter((item) => {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        return (
          (yearSelected === currentYear && item.monthNumber <= currentMonth) ||
          yearSelected < currentYear
        );
      });
  }, [yearSelected]);

  const relationExpensesRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    expenses
      .filter((expense) => {
        const date = new Date(expense.date);
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return month === monthSelected && year === yearSelected;
      })
      .forEach((expense) => {
        if (expense.frequency === "recorrente") {
          return (amountRecurrent += Number(expense.amount));
        }

        if (expense.frequency === "eventual") {
          return (amountEventual += Number(expense.amount));
        }
      });

    const total = amountEventual + amountRecurrent;

    const recurrentPercent = Number(
      ((amountRecurrent / total) * 100).toFixed(1)
    );

    const eventualPercent = Number(
      Number(((amountEventual / total) * 100).toFixed(1))
    );

    return [
      {
        name: "Recorrentes",
        amount: amountRecurrent,
        percent: recurrentPercent ? recurrentPercent : 0,
        color: "#F7931B",
      },
      {
        name: "Eventuais",
        amount: amountEventual,
        percent: eventualPercent ? eventualPercent : 0,
        color: "#E44C4E",
      },
    ];
  }, [monthSelected, yearSelected]);

  const relationGainsRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    gains
      .filter((gain) => {
        const date = new Date(gain.date);
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return month === monthSelected && year === yearSelected;
      })
      .forEach((gain) => {
        if (gain.frequency === "recorrente") {
          return (amountRecurrent += Number(gain.amount));
        }

        if (gain.frequency === "eventual") {
          return (amountEventual += Number(gain.amount));
        }
      });

    const total = amountEventual + amountRecurrent;

    const recurrentPercent = Number(
      ((amountRecurrent / total) * 100).toFixed(1)
    );

    const eventualPercent = Number(
      Number(((amountEventual / total) * 100).toFixed(1))
    );

    return [
      {
        name: "Recorrentes",
        amount: amountRecurrent,
        percent: recurrentPercent ? recurrentPercent : 0,
        color: "#F7931B",
      },
      {
        name: "Eventuais",
        amount: amountEventual,
        percent: eventualPercent ? eventualPercent : 0,
        color: "#E44C4E",
      },
    ];
  }, [monthSelected, yearSelected]);

  const handleMonthSelected = useCallback((month: string) => {
    try {
      const parsedMonth = Number(month);
      setMonthSelected(parsedMonth);
    } catch (error) {
      throw new Error("Invalid month value");
    }
  }, []);

  const handleYearSelected = useCallback((year: string) => {
    try {
      const parsedYear = Number(year);
      setYearSelected(parsedYear);
    } catch (error) {
      throw new Error("Invalid year value");
    }
  }, []);

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

        <PieChartBox data={relationExpensesVersusGains} />

        <HistoryBox
          data={historyData}
          lineColorAmountEntry='#F7931B'
          lineColorAmountOutput='#E44C4E'
        />

        <BarChartBox
          title='Saídas'
          data={relationExpensesRecurrentVersusEventual}
        />

        <BarChartBox
          title='Entradas'
          data={relationGainsRecurrentVersusEventual}
        />
      </Content>
    </Container>
  );
};

export default Dashboard;
