import Spinner from "./Spinner";

interface ButtonProps {
    onClick: () => void;
    text: string;
    isLoading: boolean;
  }
  
  const Button: React.FC<ButtonProps> = ({ onClick, text, isLoading }) => {
    return (
      <button onClick={onClick} className="btn" disabled={isLoading}>
        {isLoading ? <Spinner /> : text}
      </button>
    );
  };
  
  export default Button;