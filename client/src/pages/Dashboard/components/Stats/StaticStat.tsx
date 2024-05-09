import CurrencyText from "../../../../components/UI/CurrencyText";

interface StaticStatProps {
  title: string;
  success?: boolean;
  value: number | string | null;
  currency?: boolean;
}

const StaticStat = ({
  title,
  success,
  value,
  currency = true,
}: StaticStatProps) => {
  const valueString = value?.toString();

  return (
    <div className="col-span-6 rounded-box max-h-full bg-base-100 p-8 shadow-xl xl:col-span-3">
      <div className="flex flex-col items-center justify-center">
        <h2 className="font-bold text-lg xl:text-xl">{title}</h2>
        <p
          className={`text-xl ${
            success === true
              ? "text-success"
              : success === false
              ? "text-error"
              : null
          }`}
        >
          {currency && valueString ? (
            <CurrencyText value={valueString} decimalScale={0} />
          ) : (
            value
          )}
        </p>
      </div>
    </div>
  );
};

export default StaticStat;
