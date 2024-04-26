interface CardProps {
  title: string;
  children: JSX.Element | JSX.Element[];
  showAction?: boolean;
  actionLabel?: string;
  actionFn?: () => void;
}

export const Card = ({
  title,
  children,
  showAction = false,
  actionLabel = "",
  actionFn = () => null,
}: CardProps) => {
  return (
    <div className="card glass w-full bg-base-100 shadow-xl outline outline-1 outline-slate-200">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        {children}
        {showAction && (
          <div className="card-actions justify-end">
            <button onClick={actionFn} className="btn btn-primary">
              {actionLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
