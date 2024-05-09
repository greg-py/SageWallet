import { NumericFormat } from "react-number-format";

interface CurrencyTextProps {
  value: string;
  decimalScale?: number;
}

const CurrencyText = ({ value, decimalScale = 2 }: CurrencyTextProps) => {
  return (
    <NumericFormat
      value={value}
      displayType="text"
      thousandSeparator={true}
      prefix={"$"}
      decimalScale={decimalScale}
    />
  );
};

export default CurrencyText;
