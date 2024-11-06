export default function Form({ children, className, onSubmitFunc }) {
  return (
    <form className={className} onSubmit={onSubmitFunc}>
      {children}
    </form>
  );
}
