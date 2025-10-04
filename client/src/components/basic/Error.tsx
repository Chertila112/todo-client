interface IErrorProps {
  error: Error | null;
}

const Error: React.FC<IErrorProps> = ({ error }) => {
  return error && <p className="error">{error.message}</p>;
};

export default Error;
