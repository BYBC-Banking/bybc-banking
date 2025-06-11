
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle, AlertTriangle } from "lucide-react";

// Simplified BIP39 wordlist - just the most common words for demo
const commonBip39Words = [
  "abandon", "ability", "able", "about", "above", "absent", "absorb", "abstract", "absurd", "abuse",
  "access", "accident", "account", "accuse", "achieve", "acid", "acoustic", "acquire", "across", "act",
  "action", "actor", "actual", "adapt", "add", "address", "adjust", "admit", "adult", "advance",
  "advice", "afford", "afraid", "again", "agent", "agree", "ahead", "aim", "air", "airport",
  "alarm", "album", "alert", "alien", "all", "allow", "almost", "alone", "alpha", "already",
  "also", "alter", "always", "amazing", "among", "amount", "ancient", "anger", "angle", "angry",
  "animal", "ankle", "announce", "another", "answer", "antenna", "any", "apart", "appear", "apple",
  "approve", "april", "area", "arena", "argue", "army", "around", "arrange", "arrive", "arrow",
  "art", "artist", "ask", "assist", "assume", "attack", "attend", "attract", "auction", "august",
  "aunt", "author", "autumn", "average", "avoid", "awake", "aware", "away", "awesome", "awful"
];

interface SeedPhraseInputProps {
  onComplete: (words: string[]) => void;
}

const SeedPhraseInput = ({ onComplete }: SeedPhraseInputProps) => {
  const [phraseLength, setPhraseLength] = useState<"12" | "24">("12");
  const [words, setWords] = useState<string[]>(Array(12).fill(""));
  const [suggestions, setSuggestions] = useState<string[][]>(Array(12).fill([]));
  const [errors, setErrors] = useState<string[]>(Array(12).fill(""));
  const [isValid, setIsValid] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const length = parseInt(phraseLength);
    setWords(Array(length).fill(""));
    setSuggestions(Array(length).fill([]));
    setErrors(Array(length).fill(""));
    inputRefs.current = Array(length).fill(null);
  }, [phraseLength]);

  useEffect(() => {
    validatePhrase();
  }, [words]);

  const validatePhrase = () => {
    const filledWords = words.filter(word => word.trim() !== "");
    const expectedLength = parseInt(phraseLength);
    
    if (filledWords.length === expectedLength) {
      const allValid = words.every(word => commonBip39Words.includes(word.toLowerCase()));
      setIsValid(allValid);
    } else {
      setIsValid(false);
    }
  };

  const handleWordChange = (index: number, value: string) => {
    const newWords = [...words];
    newWords[index] = value.toLowerCase().trim();
    setWords(newWords);

    // Clear error for this field
    const newErrors = [...errors];
    newErrors[index] = "";
    setErrors(newErrors);

    // Generate suggestions
    if (value.length > 0) {
      const matches = commonBip39Words.filter(word => 
        word.startsWith(value.toLowerCase())
      ).slice(0, 5);
      
      const newSuggestions = [...suggestions];
      newSuggestions[index] = matches;
      setSuggestions(newSuggestions);
    } else {
      const newSuggestions = [...suggestions];
      newSuggestions[index] = [];
      setSuggestions(newSuggestions);
    }

    // Validate individual word
    if (value.length > 2 && !commonBip39Words.includes(value.toLowerCase())) {
      const newErrors = [...errors];
      newErrors[index] = "Word not found in wordlist";
      setErrors(newErrors);
    }
  };

  const handleSuggestionClick = (index: number, suggestion: string) => {
    const newWords = [...words];
    newWords[index] = suggestion;
    setWords(newWords);

    const newSuggestions = [...suggestions];
    newSuggestions[index] = [];
    setSuggestions(newSuggestions);

    // Move to next input
    if (index < words.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (suggestions[index].length > 0) {
        handleSuggestionClick(index, suggestions[index][0]);
      } else if (index < words.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (e.key === 'Backspace' && words[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    if (isValid) {
      onComplete(words);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enter Your Recovery Seed Phrase</CardTitle>
        <CardDescription>
          Enter the words in the exact order you wrote them down. We'll help with auto-complete.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm font-medium">Phrase Length</Label>
          <RadioGroup 
            value={phraseLength} 
            onValueChange={(value: "12" | "24") => setPhraseLength(value)}
            className="flex gap-6 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="12" id="12" />
              <Label htmlFor="12">12 words</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="24" id="24" />
              <Label htmlFor="24">24 words</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {words.map((word, index) => (
            <div key={index} className="relative">
              <Label className="text-xs text-gray-500">
                Word {index + 1}
              </Label>
              <div className="relative">
                <Input
                  ref={(el) => (inputRefs.current[index] = el)}
                  value={word}
                  onChange={(e) => handleWordChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  placeholder={`Word ${index + 1}`}
                  className={`${
                    errors[index] ? 'border-red-300' : 
                    word && commonBip39Words.includes(word) ? 'border-green-300' : ''
                  }`}
                />
                {word && commonBip39Words.includes(word) && (
                  <CheckCircle className="absolute right-2 top-2.5 h-4 w-4 text-green-500" />
                )}
              </div>
              
              {/* Suggestions dropdown */}
              {suggestions[index].length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-32 overflow-y-auto">
                  {suggestions[index].map((suggestion, suggestionIndex) => (
                    <button
                      key={suggestionIndex}
                      onClick={() => handleSuggestionClick(index, suggestion)}
                      className="w-full px-3 py-2 text-left hover:bg-gray-100 text-sm"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
              
              {errors[index] && (
                <p className="text-xs text-red-500 mt-1">{errors[index]}</p>
              )}
            </div>
          ))}
        </div>

        {words.some(word => word && !commonBip39Words.includes(word)) && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Don't worry - let's double-check the highlighted words together. Make sure spelling matches exactly.
            </AlertDescription>
          </Alert>
        )}

        <Button 
          onClick={handleSubmit}
          disabled={!isValid}
          className="w-full"
        >
          {isValid ? "Continue to Next Step" : `Enter all ${phraseLength} words to continue`}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SeedPhraseInput;
