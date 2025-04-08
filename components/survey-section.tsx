"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
} from "lucide-react";
import { updateSurveyStatus } from "@/lib/email-service";

interface SurveySectionProps {
  email: string;
  onComplete?: (surveyData: SurveyData) => void;
}

interface SurveyData {
  age: string;
  findMethod: string;
  frustration: string;
  payForSchedule: string;
}

export function SurveySection({ email, onComplete }: SurveySectionProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    reason: "",
    frustration: "",
    findMethod: "",
    payForSchedule: "",
    payForVerification: "",
    age: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await updateSurveyStatus(email, formData);
      if (result.success) {
        setSubmitted(true);
        if (onComplete) {
          onComplete(formData as SurveyData);
        }
      } else {

      }
    } catch (error) {
      
    }
  };

  const questions = [
    {
      title: "What's your age?",
      name: "age",
      type: "radio",
      options: ["Below 18", "18-24", "24-30", "Above 30"],
    },
    {
      title: "How did you find your last PG?",
      name: "findMethod",
      type: "radio",
      options: [
        "Broker",
        "Facebook/WhatsApp group",
        "Google/JustDial",
        "Friend/Referral",
        "Haven't lived in one yet",
      ],
    },
    {
      title: "What has been the most frustrating part of finding a PG?",
      name: "frustration",
      type: "text",
    },
    {
      title:
        "Would you pay ₹99 to instantly schedule a PG visit and talk directly to the owner?",
      name: "payForSchedule",
      type: "radio",
      options: ["Yes", "Maybe", "No"],
    },
  ];

  // Check if the current question has been answered
  const isCurrentQuestionAnswered = () => {
    const currentQuestion = questions[currentStep];
    const responseValue =
      formData[currentQuestion.name as keyof typeof formData];
    return responseValue !== undefined && responseValue !== "";
  };

  if (submitted) {
    return null;
  }

  const currentQuestion = questions[currentStep];

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-50 to-pink-50 relative animate-fade-in">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-pink-200/30 to-purple-200/30 rounded-full blur-3xl"></div>

      <div className="container mx-auto max-w-2xl relative z-10">
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-pink-500/5 to-purple-600/5 opacity-50"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-pink-500/20 to-purple-500/20 rounded-full blur-xl"></div>

          <CardContent className="p-4 md:p-8 relative">
            <div className="text-center mb-4 md:mb-8">
              <div className="inline-block mb-2 md:mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 blur-md rounded-full"></div>
                  <div className="relative bg-white rounded-full p-2 md:p-3">
                    <ClipboardCheck className="h-6 w-6 md:h-8 md:w-8 text-purple-500" />
                  </div>
                </div>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-purple-900 mb-2 md:mb-4">
                Thanks for signing up!
              </h2>
              <p className="text-sm md:text-base text-purple-800/70">
                (Optional) If you're open to helping us improve PGNear.me, we'd
                love your input — this will only take 30 seconds.
              </p>
            </div>

            <div className="mb-4 md:mb-6">
              <div className="w-full bg-gray-200 rounded-full h-1.5 md:h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-600 to-pink-600 h-1.5 md:h-2 rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${((currentStep + 1) / questions.length) * 100}%`,
                  }}
                ></div>
              </div>
              <p className="text-right text-xs md:text-sm text-purple-600/70 mt-1">
                Question {currentStep + 1} of {questions.length}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4 md:mb-8">
                <h3 className="text-lg md:text-xl font-semibold text-purple-900 mb-2 md:mb-4">
                  {currentQuestion.title}
                </h3>

                {currentQuestion.type === "radio" && (
                  <RadioGroup
                    value={
                      formData[currentQuestion.name as keyof typeof formData]
                    }
                    onValueChange={(value) =>
                      handleRadioChange(currentQuestion.name, value)
                    }
                    className="space-y-2 md:space-y-3"
                  >
                    {currentQuestion.options?.map((option, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 p-2 md:p-3 rounded-lg hover:bg-purple-50 transition-colors"
                      >
                        <RadioGroupItem
                          value={option}
                          id={`${currentQuestion.name}-${index}`}
                          className="text-purple-600 border-purple-300 focus:ring-purple-500"
                        />
                        <Label
                          htmlFor={`${currentQuestion.name}-${index}`}
                          className="text-sm md:text-base text-purple-900 cursor-pointer w-full"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {currentQuestion.type === "text" && (
                  <Textarea
                    name={currentQuestion.name}
                    value={
                      formData[currentQuestion.name as keyof typeof formData]
                    }
                    onChange={handleInputChange}
                    placeholder="Type your answer here..."
                    className="w-full border-purple-200 focus:border-purple-500 focus:ring-purple-500 text-sm md:text-base"
                    rows={3}
                  />
                )}
              </div>

              <div className="flex justify-between">
                <Button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  variant="outline"
                  className="rounded-lg border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800 disabled:opacity-50 text-sm md:text-base"
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Previous
                </Button>

                {currentStep < questions.length - 1 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={!isCurrentQuestionAnswered()}
                    className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                  >
                    Next
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={!isCurrentQuestionAnswered()}
                    className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                  >
                    Submit
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
