import { format } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { SelectInput } from "@/components/templates/elements/select-input";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/templates/ui/chart";
import { Input } from "@/components/templates/ui/input";
import { Label } from "@/components/templates/ui/label";
import { ITransaction } from "@/store/user/types";

interface Props {
  transactions: ITransaction[];
}

const LOCAL_STORAGE_KEY = "transaction-filters";

// Helper function to get filters from localStorage
const getSavedFilters = () => {
  if (typeof window === "undefined") return null;
  const savedFilters = localStorage?.getItem(LOCAL_STORAGE_KEY);
  if (savedFilters) {
    const parsedFilters = JSON.parse(savedFilters);
    // Convert string dates back into Date objects
    parsedFilters.dateRange = parsedFilters.dateRange.map(
      (date: string | null) => (date ? new Date(date) : null),
    );
    return parsedFilters;
  }
  return {
    dateRange: [null, null],
    account: "",
    industry: "",
    state: "",
  };
};

// Helper function to save filters to localStorage
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const saveFilters = (filters: any) => {
  // Convert Date objects to strings before saving
  const filtersToSave = {
    ...filters,
    dateRange: filters.dateRange.map((date: Date | null) =>
      date ? date.toISOString() : null,
    ),
  };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtersToSave));
};

export default function TransactionChart({ transactions }: Props) {
  // Initialize state with saved filters or defaults
  const [filters, setFilters] = useState<{
    dateRange: [Date | null, Date | null];
    account: string;
    industry: string;
    state: string;
  }>(
    () =>
      getSavedFilters() || {
        dateRange: [null, null],
        account: "",
        industry: "",
        state: "",
      },
  );

  // Persist filters in localStorage when they change
  useEffect(() => {
    saveFilters(filters);
  }, [filters]);

  // Extract unique values for select options
  const uniqueAccounts = useMemo(
    () => Array.from(new Set(transactions.map((t) => t.account))),
    [transactions],
  );
  const uniqueIndustries = useMemo(
    () => Array.from(new Set(transactions.map((t) => t.industry))),
    [transactions],
  );
  const uniqueStates = useMemo(
    () => Array.from(new Set(transactions.map((t) => t.state))),
    [transactions],
  );

  // Handler for updating the date range
  const handleDateChange = useCallback((index: 0 | 1, value: string) => {
    const date = value ? new Date(value) : null;
    setFilters((prev) => {
      const newDateRange = [...prev.dateRange];
      newDateRange[index] = date;
      return { ...prev, dateRange: newDateRange as [Date | null, Date | null] };
    });
  }, []);

  // Handler for updating other filters
  const handleFilterChange = useCallback(
    (filterType: "account" | "industry" | "state", value: string) => {
      setFilters((prev) => ({ ...prev, [filterType]: value }));
    },
    [],
  );

  // Apply filters to transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const date = new Date(transaction.date);
      const [startDate, endDate] = filters.dateRange;

      // Check if the transaction falls within the selected date range
      const isDateInRange =
        (startDate ? date >= startDate : true) &&
        (endDate ? date <= endDate : true);

      // Check if the transaction matches the selected account, industry, and state
      const isAccountMatch = filters.account
        ? transaction.account === filters.account
        : true;
      const isIndustryMatch = filters.industry
        ? transaction.industry === filters.industry
        : true;
      const isStateMatch = filters.state
        ? transaction.state === filters.state
        : true;

      return isDateInRange && isAccountMatch && isIndustryMatch && isStateMatch;
    });
  }, [transactions, filters]);

  // Aggregating data by month for the chart
  const aggregatedData = useMemo(() => {
    const dataMap: { [key: string]: number } = {};

    filteredTransactions.forEach((transaction) => {
      const dateKey = format(new Date(transaction.date), "MMM yyyy");
      const amount = parseFloat(transaction.amount);

      if (dataMap[dateKey]) {
        dataMap[dateKey] += amount; // Sum transactions per month
      } else {
        dataMap[dateKey] = amount;
      }
    });

    return Object.keys(dataMap).map((date) => ({
      date,
      amount: dataMap[date],
    }));
  }, [filteredTransactions]);

  const chartConfig = {
    amount: {
      label: "Transaction Amount",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <div className="flex w-full flex-col  gap-5">
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-bold ">Transaction Amount Over Time</h3>
        <p className="text-sm">Monthly aggregated transaction amounts</p>
      </div>

      {/* Filter Inputs */}
      <div className="mx-auto mb-4 flex gap-2 py-2 max-lg:flex-col">
        <div>
          <Label className="text-xs font-bold">Start Date:</Label>
          <Input
            type="date"
            value={
              filters.dateRange[0]
                ? format(filters.dateRange[0], "yyyy-MM-dd")
                : ""
            }
            onChange={(e) => handleDateChange(0, e.target.value)}
          />
        </div>
        <div>
          <Label className="text-xs font-bold"> End Date:</Label>
          <Input
            type="date"
            value={
              filters.dateRange[1]
                ? format(filters.dateRange[1], "yyyy-MM-dd")
                : ""
            }
            onChange={(e) => handleDateChange(1, e.target.value)}
          />
        </div>
        <div className="flex-col pt-2">
          <Label className="flex  text-xs font-bold"> Account:</Label>
          <SelectInput
            value={filters.account}
            onChange={(e) => handleFilterChange("account", e.target.value)}
          >
            <option value="">All</option>
            {uniqueAccounts.map((account) => (
              <option key={account} value={account}>
                {account}
              </option>
            ))}
          </SelectInput>
        </div>
        <div className="flex-col pt-2">
          <Label className="flex text-xs font-bold"> Industry:</Label>

          <SelectInput
            value={filters.industry}
            onChange={(e) => handleFilterChange("industry", e.target.value)}
          >
            <option value="">All</option>
            {uniqueIndustries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </SelectInput>
        </div>
        <div className="flex-col pt-2">
          <Label className="flex text-xs font-bold">State:</Label>

          <SelectInput
            value={filters.state}
            onChange={(e) => handleFilterChange("state", e.target.value)}
          >
            <option value="">All</option>
            {uniqueStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </SelectInput>
        </div>
      </div>
      <div className="w-full">
        {/* Display the chart or show a message if no data is available */}
        {aggregatedData.length === 0 ? (
          <div className="mx-auto flex w-full p-5">
            <p>No data available for the selected filters.</p>
          </div>
        ) : (
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={aggregatedData}
              margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="amount" fill="var(--color-amount)" radius={4} />
            </BarChart>
          </ChartContainer>
        )}
      </div>
    </div>
  );
}
