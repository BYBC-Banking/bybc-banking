
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Shield, Key, ArrowLeft, ArrowRight } from "lucide-react";

interface EducationStepProps {
  onComplete: () => void;
}

const EDUCATION_SCREENS = [
  {
    id: 1,
    icon: Wallet,
    title: "Digital Wallet = Digital Money You Control",
    content: "Your crypto wallet is like a digital bank account, but YOU are the bank. No one else can access your money without your permission.",
    keyPoints: [
      "You own your crypto completely",
      "No bank can freeze your account",
      "Transactions happen 24/7 worldwide"
    ]
  },
  {
    id: 2,
    icon: Shield,
    title: "No Password Reset Exists - You Are Your Own Bank",
    content: "Unlike traditional apps, there's no 'forgot password' button. If you lose access, your crypto is gone forever. This is why security is crucial.",
    keyPoints: [
      "No customer support can recover your wallet",
      "You are 100% responsible for security",
      "This gives you complete control"
    ]
  },
  {
    id: 3,
    icon: Key,
    title: "Seed Phrase = 12 Words That Unlock Your Crypto",
    content: "Your seed phrase is 12 random words that can restore your entire wallet. These words are more valuable than cash - protect them like R50,000.",
    keyPoints: [
      "12 words can restore everything",
      "Never store digitally (photos, cloud, etc.)",
      "Write on paper, store safely"
    ]
  }
];

const EducationStep = ({ onComplete }: EducationStepProps) => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [completedScreens, setCompletedScreens] = useState<number[]>([]);

  const screen = EDUCATION_SCREENS[currentScreen];
  const isLastScreen = currentScreen === EDUCATION_SCREENS.length - 1;

  const handleNext = () => {
    setCompletedScreens(prev => [...new Set([...prev, currentScreen])]);
    
    if (isLastScreen) {
      onComplete();
    } else {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const handlePrevious = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Crypto Education
        </h2>
        <p className="text-gray-600">
          Learn the basics before we create your wallet
        </p>
        <div className="flex justify-center gap-2 mt-4">
          {EDUCATION_SCREENS.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentScreen
                  ? 'bg-blue-600'
                  : completedScreens.includes(index)
                  ? 'bg-green-500'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      <Card className="border-none shadow-lg min-h-[400px]">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <screen.icon className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-xl leading-tight">
            {screen.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-700 text-center leading-relaxed">
            {screen.content}
          </p>

          <div className="space-y-3">
            {screen.keyPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                <p className="text-gray-700">{point}</p>
              </div>
            ))}
          </div>

          {screen.id === 3 && (
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg mt-4">
              <p className="text-red-800 text-sm font-medium text-center">
                ⚠️ Never share your seed phrase with anyone, ever!
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-3">
        {currentScreen > 0 && (
          <Button
            variant="outline"
            onClick={handlePrevious}
            className="flex-1"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
        )}
        
        <Button
          onClick={handleNext}
          className={`${currentScreen === 0 ? 'w-full' : 'flex-1'} h-12`}
        >
          {isLastScreen ? 'Continue to Wallet Creation' : 'Next'}
          {!isLastScreen && <ArrowRight className="h-4 w-4 ml-2" />}
        </Button>
      </div>
    </div>
  );
};

export default EducationStep;
