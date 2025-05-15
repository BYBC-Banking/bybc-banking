
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

interface EducationHeaderProps {
  name: string;
}

const EducationHeader = ({ name }: EducationHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Hello, {name}
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Continue your financial learning journey
        </p>
      </div>
      <Link to="/topics" className="h-10 w-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
        <BookOpen className="h-5 w-5" />
      </Link>
    </div>
  );
};

export default EducationHeader;
