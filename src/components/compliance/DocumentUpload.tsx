
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, AlertCircle, CheckCircle } from "lucide-react";

interface DocumentUploadProps {
  onUpload: (files: File[]) => void;
  maxFiles?: number;
  maxSizePerFile?: number; // in MB
}

interface UploadProgress {
  file: File;
  progress: number;
  status: "uploading" | "completed" | "error";
}

const DocumentUpload = ({ onUpload, maxFiles = 5, maxSizePerFile = 10 }: DocumentUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const allowedTypes = [
    "application/pdf",
    "image/jpeg", 
    "image/jpg",
    "image/png",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];

  const validateFile = (file: File): string | null => {
    if (!allowedTypes.includes(file.type)) {
      return "File type not supported. Please use PDF, JPG, PNG, or DOC files.";
    }
    
    if (file.size > maxSizePerFile * 1024 * 1024) {
      return `File too large. Maximum size is ${maxSizePerFile}MB.`;
    }
    
    return null;
  };

  const simulateUpload = (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      const progress = { file, progress: 0, status: "uploading" as const };
      setUploadProgress(prev => [...prev, progress]);
      
      const interval = setInterval(() => {
        setUploadProgress(prev => prev.map(p => 
          p.file === file 
            ? { ...p, progress: Math.min(p.progress + 20, 100) }
            : p
        ));
      }, 200);
      
      setTimeout(() => {
        clearInterval(interval);
        setUploadProgress(prev => prev.map(p => 
          p.file === file 
            ? { ...p, progress: 100, status: "completed" }
            : p
        ));
        resolve();
      }, 1000);
    });
  };

  const handleFiles = async (files: FileList) => {
    const fileArray = Array.from(files);
    
    if (fileArray.length > maxFiles) {
      toast({
        title: "Too many files",
        description: `You can only upload up to ${maxFiles} files at once.`,
        variant: "destructive"
      });
      return;
    }

    const validFiles: File[] = [];
    const errors: string[] = [];

    fileArray.forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      toast({
        title: "Upload errors",
        description: errors.join("\n"),
        variant: "destructive"
      });
    }

    if (validFiles.length > 0) {
      try {
        // Simulate upload for each file
        await Promise.all(validFiles.map(file => simulateUpload(file)));
        onUpload(validFiles);
        
        toast({
          title: "Upload successful",
          description: `${validFiles.length} file(s) uploaded successfully.`,
        });
        
        // Clear progress after a delay
        setTimeout(() => {
          setUploadProgress([]);
        }, 2000);
        
      } catch (error) {
        toast({
          title: "Upload failed",
          description: "Please try again or contact support.",
          variant: "destructive"
        });
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragging 
            ? "border-primary bg-primary/10" 
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
        <p className="text-sm font-medium mb-1">
          Drop files here or click to browse
        </p>
        <p className="text-xs text-muted-foreground mb-3">
          PDF, JPG, PNG, DOC files up to {maxSizePerFile}MB each
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
        >
          Select Files
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Upload Progress */}
      {uploadProgress.length > 0 && (
        <div className="space-y-2">
          {uploadProgress.map((item, index) => (
            <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
              <div className="flex items-center gap-2 flex-1">
                <FileText className="h-4 w-4" />
                <span className="text-sm truncate">{item.file.name}</span>
              </div>
              <div className="flex items-center gap-2 w-32">
                {item.status === "uploading" && (
                  <>
                    <Progress value={item.progress} className="h-2 flex-1" />
                    <span className="text-xs text-muted-foreground">{item.progress}%</span>
                  </>
                )}
                {item.status === "completed" && (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                )}
                {item.status === "error" && (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Help Text */}
      <div className="text-xs text-muted-foreground">
        <p className="font-medium mb-1">Helpful documents to include:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Invoice or receipt for the transaction</li>
          <li>Business documentation or contracts</li>
          <li>Proof of relationship with recipient</li>
          <li>Any relevant correspondence</li>
        </ul>
      </div>
    </div>
  );
};

export default DocumentUpload;
