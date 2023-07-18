import './NotImplemented.scss';

type Props = {
  callback: () => void;
  message?: string;
};

export const NotImplemented: React.FC<Props> = ({
  callback,
  message = 'We are sorry, but this feature is not implemented yet',
}) => {
  return (
    <div className="not-implemented">
      <div className="not-implemented__container">
        <p className="not-implemented__message">{message}</p>
        <button
          type="button"
          className="not-implemented__button"
          onClick={callback}
        >
          OK
        </button>
      </div>
    </div>
  );
};
