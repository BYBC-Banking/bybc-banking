
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const SendPageHeader = () => {
  return (
    <header className="flex items-center gap-4 mb-6">
      <Link to="/" className="p-2">
        <ArrowLeft className="h-5 w-5" />
      </Link>
      <h1 className="text-2xl font-bold">Send Money</h1>
    </header>
  );
};

export default SendPageHeader;
