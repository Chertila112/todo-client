interface ButtonProps {
  text: string;
  isPending: boolean;
  isSubmitting: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  isPending,
  isSubmitting,
}) => {
  return (
    <button
      className="submit-available"
      type="submit"
      disabled={isPending || isSubmitting}
    >
      {isPending || isSubmitting ? (
        <>
          <div className="w-5 h-5 border-3 border-black border-t-transparent rounded-full animate-spin"></div>
          <span className="font-bold">Загрузка...</span>
        </>
      ) : (
        <span className="font-bold">{text}</span>
      )}
    </button>
  );
};
