import CurrencyText from "../../../../components/UI/CurrencyText";

interface ClickableStatProps {
  title: string;
  success?: boolean;
  value: number;
}

const ClickableStat = ({ title, success, value }: ClickableStatProps) => {
  const valueString = value.toString();

  return (
    <div className="col-span-6 rounded-box max-h-full bg-base-100 p-8 shadow-xl xl:col-span-3 hover:bg-base-200 hover:cursor-pointer">
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
          <CurrencyText value={valueString} decimalScale={0} />
        </p>
      </div>
    </div>
  );
};

export default ClickableStat;
