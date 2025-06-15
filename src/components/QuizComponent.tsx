
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, X, ArrowRight } from "lucide-react";
import { Lesson } from "@/data/topicsData";

interface QuizComponentProps {
  lesson: Lesson;
}

const QuizComponent = ({ lesson }: QuizComponentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

  const questions = lesson.quizQuestions || [];

  if (questions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Quiz questions are being prepared...</p>
      </div>
    );
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    setAnsweredQuestions([...answeredQuestions, selectedAnswer]);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const isQuizComplete = currentQuestion === questions.length - 1 && showResult;
  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">{lesson.title}</h2>
        <div className="flex items-center gap-4">
          <Badge variant="outline">
            Question {currentQuestion + 1} of {questions.length}
          </Badge>
          <div className="text-sm text-muted-foreground">
            Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {currentQuestionData.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {currentQuestionData.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showResult && handleAnswerSelect(index)}
              disabled={showResult}
              className={`w-full p-3 text-left border rounded-md transition-colors ${
                showResult
                  ? index === currentQuestionData.correctAnswer
                    ? "border-green-500 bg-green-50"
                    : index === selectedAnswer && selectedAnswer !== currentQuestionData.correctAnswer
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200"
                  : selectedAnswer === index
                  ? "border-finance-blue bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showResult && (
                  <>
                    {index === currentQuestionData.correctAnswer && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {index === selectedAnswer && selectedAnswer !== currentQuestionData.correctAnswer && (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                  </>
                )}
              </div>
            </button>
          ))}

          {showResult && (
            <div className="mt-4 p-4 bg-slate-50 rounded-md">
              <p className="font-medium mb-2">
                {selectedAnswer === currentQuestionData.correctAnswer ? "Correct!" : "Incorrect"}
              </p>
              <p className="text-sm text-muted-foreground">
                {currentQuestionData.explanation}
              </p>
            </div>
          )}

          <div className="flex justify-between pt-4">
            {!showResult ? (
              <Button 
                onClick={handleSubmitAnswer} 
                disabled={selectedAnswer === null}
                className="ml-auto"
              >
                Submit Answer
              </Button>
            ) : isQuizComplete ? (
              <div className="w-full text-center">
                <div className="mb-4 p-4 bg-finance-blue/10 rounded-md">
                  <h3 className="font-bold text-lg mb-2">Quiz Complete!</h3>
                  <p className="text-muted-foreground">
                    Final Score: {score}/{questions.length} ({Math.round((score/questions.length) * 100)}%)
                  </p>
                </div>
              </div>
            ) : (
              <Button onClick={handleNextQuestion} className="ml-auto">
                Next Question <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizComponent;
