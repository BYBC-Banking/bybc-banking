
import { Link } from "react-router-dom";

const LoginLinks = () => {
  return (
    <div className="text-center space-y-2 pt-2">
      <Link
        to="/account-recovery"
        className="text-sm text-[#999] hover:underline transition-all block"
      >
        Forgot Password?
      </Link>
      
      <Link
        to="/recovery"
        className="text-sm text-[#7E69AB] hover:underline transition-all block font-medium"
      >
        Can't access account?
      </Link>
      
      <p className="text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link to="/register" className="text-[#7E69AB] font-medium hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginLinks;
