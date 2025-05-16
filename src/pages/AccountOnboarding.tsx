
import React, { useState, useRef } from 'react';
import { ArrowLeft, Upload, Camera, Check, ChevronRight } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// Form step interface
interface FormStep {
  title: string;
  description: string;
}

// Form field interface
interface FormField {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  step?: string;
  accountTypes?: string[];
}

// Account types data
const accountTypes = {
  "spending": {
    title: "Spending Account",
    description: "Complete your details to open a spending account",
    color: "bg-finance-blue"
  },
  "savings": {
    title: "Savings Account",
    description: "Complete your details to open a savings account",
    color: "bg-finance-green"
  },
  "business": {
    title: "Business Account",
    description: "Complete your details to open a business account",
    color: "bg-[#7E69AB]"
  },
  "investment": {
    title: "Investment Account",
    description: "Complete your details to open an investment account",
    color: "bg-teal-600"
  },
  "nonprofit": {
    title: "Nonprofit Account",
    description: "Complete your details to open a nonprofit account",
    color: "bg-orange-500"
  }
};

// Form steps
const formSteps: FormStep[] = [
  {
    title: "Personal Information",
    description: "Provide your basic personal details"
  },
  {
    title: "Identification",
    description: "Upload identity verification documents"
  },
  {
    title: "Contact Details",
    description: "Provide your contact information"
  },
  {
    title: "Additional Information",
    description: "Complete required information for your account type"
  }
];

// Form fields configuration
const formFields: FormField[] = [
  // Step 1: Personal information
  { id: "firstName", label: "First Name", type: "text", placeholder: "Enter your first name", required: true, step: "0" },
  { id: "lastName", label: "Last Name", type: "text", placeholder: "Enter your last name", required: true, step: "0" },
  { id: "dateOfBirth", label: "Date of Birth", type: "date", placeholder: "", required: true, step: "0" },
  
  // Step 2: Identification
  { id: "idType", label: "ID Type", type: "select", placeholder: "Select ID type", required: true, step: "1" },
  { id: "idNumber", label: "ID Number", type: "text", placeholder: "Enter your ID number", required: true, step: "1" },
  { id: "idUpload", label: "Upload ID Document", type: "file", placeholder: "", required: true, step: "1" },
  { id: "selfie", label: "Take a Selfie", type: "camera", placeholder: "", required: true, step: "1" },
  
  // Step 3: Contact details
  { id: "email", label: "Email Address", type: "email", placeholder: "Enter your email address", required: true, step: "2" },
  { id: "phone", label: "Phone Number", type: "tel", placeholder: "+27", required: true, step: "2" },
  { id: "address", label: "Physical Address", type: "text", placeholder: "Enter your address", required: true, step: "2" },
  
  // Step 4: Additional information - Business specific
  { id: "companyName", label: "Company Name", type: "text", placeholder: "Enter your company name", required: true, step: "3", accountTypes: ["business"] },
  { id: "registrationNumber", label: "Registration Number", type: "text", placeholder: "Enter company registration number", required: true, step: "3", accountTypes: ["business"] },
  { id: "taxNumber", label: "Tax Number", type: "text", placeholder: "Enter tax number", required: true, step: "3", accountTypes: ["business", "nonprofit"] },
  
  // Nonprofit specific
  { id: "organizationName", label: "Organization Name", type: "text", placeholder: "Enter organization name", required: true, step: "3", accountTypes: ["nonprofit"] },
  { id: "npoNumber", label: "NPO Registration Number", type: "text", placeholder: "Enter NPO registration number", required: true, step: "3", accountTypes: ["nonprofit"] },
  
  // Investment specific
  { id: "investmentExperience", label: "Investment Experience", type: "select", placeholder: "Select your experience level", required: true, step: "3", accountTypes: ["investment"] },
  { id: "riskTolerance", label: "Risk Tolerance", type: "select", placeholder: "Select your risk tolerance", required: true, step: "3", accountTypes: ["investment"] }
];

const AccountOnboarding = () => {
  const { accountType } = useParams<{ accountType: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [filePreview, setFilePreview] = useState<Record<string, string>>({});
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  
  // Get account type info
  const accountTypeInfo = accountTypes[accountType as keyof typeof accountTypes] || accountTypes.spending;
  
  // Filter fields based on current step and account type
  const getCurrentStepFields = () => {
    return formFields.filter(field => 
      field.step === currentStep.toString() && 
      (!field.accountTypes || field.accountTypes.includes(accountType || "spending"))
    );
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldId: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(prev => ({ ...prev, [fieldId]: reader.result as string }));
        setFormData(prev => ({ ...prev, [fieldId]: file }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleCameraCapture = (fieldId: string) => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click();
      cameraInputRef.current.onchange = (e: Event) => {
        const input = e.target as HTMLInputElement;
        const file = input.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setFilePreview(prev => ({ ...prev, [fieldId]: reader.result as string }));
            setFormData(prev => ({ ...prev, [fieldId]: file }));
          };
          reader.readAsDataURL(file);
        }
      };
    }
  };
  
  const nextStep = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      // Submit the form
      handleSubmit();
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleSubmit = () => {
    toast({
      title: "Account Application Submitted",
      description: "We'll review your application and be in touch soon",
    });
    navigate("/dashboard");
  };
  
  // Select options for different fields
  const getSelectOptions = (fieldId: string) => {
    switch (fieldId) {
      case "idType":
        return [
          { value: "national_id", label: "National ID" },
          { value: "passport", label: "Passport" },
          { value: "drivers_license", label: "Driver's License" }
        ];
      case "investmentExperience":
        return [
          { value: "none", label: "No Experience" },
          { value: "beginner", label: "Beginner" },
          { value: "intermediate", label: "Intermediate" },
          { value: "advanced", label: "Advanced" }
        ];
      case "riskTolerance":
        return [
          { value: "low", label: "Low Risk" },
          { value: "medium", label: "Medium Risk" },
          { value: "high", label: "High Risk" }
        ];
      default:
        return [];
    }
  };
  
  // Render field based on type
  const renderField = (field: FormField) => {
    switch (field.type) {
      case "text":
      case "email":
      case "tel":
      case "date":
        return (
          <Input
            id={field.id}
            name={field.id}
            type={field.type}
            placeholder={field.placeholder}
            value={formData[field.id] || ""}
            onChange={handleChange}
            required={field.required}
            className="w-full"
          />
        );
        
      case "select":
        const options = getSelectOptions(field.id);
        return (
          <select
            id={field.id}
            name={field.id}
            value={formData[field.id] || ""}
            onChange={handleChange}
            required={field.required}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">{field.placeholder}</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        );
        
      case "file":
        return (
          <div>
            <div 
              className={cn(
                "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-slate-50 transition-colors",
                filePreview[field.id] ? "border-finance-blue" : "border-gray-300"
              )}
              onClick={() => fileInputRef.current?.click()}
            >
              {filePreview[field.id] ? (
                <div className="flex flex-col items-center">
                  <div className="relative w-full max-w-xs">
                    <img 
                      src={filePreview[field.id]} 
                      alt="Document preview" 
                      className="max-h-48 rounded mx-auto object-contain"
                    />
                    <div className="absolute -top-2 -right-2 bg-finance-green text-white rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  </div>
                  <p className="text-sm mt-2 text-finance-blue">Document uploaded successfully</p>
                </div>
              ) : (
                <div className="flex flex-col items-center py-4">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm font-medium">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">PDF, JPG or PNG (max 5MB)</p>
                </div>
              )}
              <input 
                ref={fileInputRef}
                id={field.id}
                name={field.id}
                type="file"
                accept="image/*, application/pdf"
                className="hidden"
                onChange={(e) => handleFileChange(e, field.id)}
                required={field.required}
              />
            </div>
          </div>
        );
        
      case "camera":
        return (
          <div>
            <div 
              className={cn(
                "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-slate-50 transition-colors",
                filePreview[field.id] ? "border-finance-blue" : "border-gray-300"
              )}
              onClick={() => handleCameraCapture(field.id)}
            >
              {filePreview[field.id] ? (
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-32">
                    <img 
                      src={filePreview[field.id]} 
                      alt="Selfie preview" 
                      className="w-full h-full rounded-full object-cover"
                    />
                    <div className="absolute -top-2 -right-2 bg-finance-green text-white rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  </div>
                  <p className="text-sm mt-2 text-finance-blue">Selfie captured successfully</p>
                </div>
              ) : (
                <div className="flex flex-col items-center py-4">
                  <Camera className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm font-medium">Click to take a selfie</p>
                  <p className="text-xs text-gray-500 mt-1">Enable camera when prompted</p>
                </div>
              )}
              <input 
                ref={cameraInputRef}
                id={field.id}
                name={field.id}
                type="file"
                accept="image/*"
                capture="user"
                className="hidden"
                onChange={(e) => handleFileChange(e, field.id)}
                required={field.required}
              />
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#1A1F2C] to-[#7E69AB] min-h-screen">
      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Header */}
        <header className="flex items-center gap-4 mb-6 text-white">
          <Link to="/create-account" className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">{accountTypeInfo.title}</h1>
        </header>
        
        {/* Progress indicator */}
        <div className="flex justify-between mb-6">
          {formSteps.map((step, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center"
              style={{ width: `${100 / formSteps.length}%` }}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                index < currentStep ? "bg-finance-green text-white" : 
                index === currentStep ? accountTypeInfo.color + " text-white" : 
                "bg-white/20 text-white/50"
              )}>
                {index < currentStep ? <Check className="h-4 w-4" /> : (index + 1)}
              </div>
              {index < formSteps.length - 1 && (
                <div className={cn(
                  "h-1 w-full mt-4 rounded-full",
                  index < currentStep ? "bg-finance-green" : "bg-white/20"
                )}></div>
              )}
            </div>
          ))}
        </div>
        
        <Card className="mb-6 border-0 shadow-lg">
          <CardHeader>
            <CardTitle>{formSteps[currentStep].title}</CardTitle>
            <CardDescription>{formSteps[currentStep].description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {getCurrentStepFields().map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={field.id} className="text-sm font-medium">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  {renderField(field)}
                </div>
              ))}
              
              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={nextStep}
                  className={cn("text-white", accountTypeInfo.color)}
                >
                  {currentStep === formSteps.length - 1 ? "Submit" : "Next"}
                  {currentStep !== formSteps.length - 1 && <ChevronRight className="ml-1 h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountOnboarding;
