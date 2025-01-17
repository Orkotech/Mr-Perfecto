import React, { useState } from 'react';
import { Heart, ChevronRight, ChevronLeft } from 'lucide-react';

interface Question {
  text: string;
  score: number;
}

interface Section {
  title: string;
  questions: Question[];
}

export default function RelationshipQuiz() {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const sections: Section[] = [
    {
      title: "Communication",
      questions: [
        { text: "I feel comfortable expressing my thoughts and feelings to my partner.", score: 0 },
        { text: "My partner listens to me without judgment or interruption.", score: 0 },
        { text: "We openly discuss challenges or conflicts and work to resolve them together.", score: 0 },
        { text: "I actively listen when my partner speaks, without distractions.", score: 0 },
        { text: "I regularly check in with my partner about how they're feeling.", score: 0 },
      ]
    },
    {
      title: "Emotional Connection",
      questions: [
        { text: "I feel emotionally supported by my partner.", score: 0 },
        { text: "We share moments of vulnerability and deepen our connection.", score: 0 },
        { text: "My partner knows and appreciates what makes me happy.", score: 0 },
        { text: "I understand my partner's love language and use it to show affection.", score: 0 },
        { text: "We make an effort to spend quality time together.", score: 0 },
      ]
    },
    {
      title: "Physical Intimacy",
      questions: [
        { text: "We openly discuss our physical intimacy and desires.", score: 0 },
        { text: "I make an effort to initiate affection in ways that my partner enjoys.", score: 0 },
        { text: "Our physical relationship feels satisfying for both of us.", score: 0 },
        { text: "I pay attention to my partner's comfort and boundaries.", score: 0 },
        { text: "I am open to trying new ways to enhance our physical connection.", score: 0 },
      ]
    },
    {
      title: "Shared Goals and Values",
      questions: [
        { text: "My partner and I share similar long-term goals and values.", score: 0 },
        { text: "We discuss plans for the future and how to achieve them together.", score: 0 },
        { text: "We respect each other's individual goals and aspirations.", score: 0 },
        { text: "We trust each other to handle shared responsibilities.", score: 0 },
        { text: "I feel like we are a team working toward common objectives.", score: 0 },
      ]
    }
  ];

  const handleAnswer = (questionIndex: number, score: number) => {
    const key = `${currentSection}-${questionIndex}`;
    setAnswers({ ...answers, [key]: score });
  };

  const calculateScore = () => {
    return Object.values(answers).reduce((sum, score) => sum + score, 0);
  };

  const getAssessment = (score: number) => {
    if (score >= 80) return {
      title: "Power Couple Status",
      description: "Your relationship is strong, but there's always room to deepen the bond!",
      color: "text-green-500"
    };
    if (score >= 60) return {
      title: "Room for Growth",
      description: "You have a solid foundation but can strengthen specific areas for even greater connection.",
      color: "text-blue-500"
    };
    if (score >= 40) return {
      title: "Reconnection Needed",
      description: "Identifying and addressing challenges could help you rebuild and grow closer.",
      color: "text-yellow-500"
    };
    return {
      title: "Time to Reflect",
      description: "Consider focusing on communication and mutual understanding as a first step.",
      color: "text-red-500"
    };
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-rose-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-rose-500/20 shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-rose-500" />
              <h1 className="text-3xl font-bold text-white ml-2">How Strong Is Your Relationship Foundation?</h1>
            </div>
            {!showResults && (
              <p className="text-gray-300 mt-2">
                Rate each statement from 1 (Strongly Disagree) to 5 (Strongly Agree)
              </p>
            )}
          </div>

          {!showResults ? (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold text-rose-400 mb-6">
                {sections[currentSection].title}
              </h2>

              {sections[currentSection].questions.map((question, index) => (
                <div key={index} className="space-y-4">
                  <p className="text-white">{question.text}</p>
                  <div className="flex justify-between gap-2">
                    {[1, 2, 3, 4, 5].map((score) => (
                      <button
                        key={score}
                        onClick={() => handleAnswer(index, score)}
                        className={`w-12 h-12 rounded-full ${
                          answers[`${currentSection}-${index}`] === score
                            ? 'bg-rose-500 text-white'
                            : 'bg-white/10 text-white hover:bg-rose-500/50'
                        } transition-colors duration-200`}
                      >
                        {score}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrevious}
                  disabled={currentSection === 0}
                  className="flex items-center px-4 py-2 text-white disabled:opacity-50"
                >
                  <ChevronLeft className="h-5 w-5 mr-2" />
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  className="flex items-center px-6 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition-colors duration-200"
                >
                  {currentSection === sections.length - 1 ? 'See Results' : 'Next'}
                  <ChevronRight className="h-5 w-5 ml-2" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Your Results</h2>
                <div className="text-6xl font-bold text-rose-500 mb-4">
                  {calculateScore()}/100
                </div>
                <div className={`text-xl font-semibold ${getAssessment(calculateScore()).color} mb-2`}>
                  {getAssessment(calculateScore()).title}
                </div>
                <p className="text-gray-300">
                  {getAssessment(calculateScore()).description}
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white">Recommendations</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="bg-white/5 rounded-lg p-6 border border-rose-500/20">
                    <h4 className="text-lg font-semibold text-rose-400 mb-3">Strengthen Your Bond</h4>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Schedule weekly date nights</li>
                      <li>• Practice active listening exercises</li>
                      <li>• Share daily gratitude moments</li>
                    </ul>
                  </div>
                  <div className="bg-white/5 rounded-lg p-6 border border-rose-500/20">
                    <h4 className="text-lg font-semibold text-rose-400 mb-3">Next Steps</h4>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Book a relationship coaching session</li>
                      <li>• Try our communication exercises</li>
                      <li>• Join our couples workshop</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowResults(false);
                  setCurrentSection(0);
                  setAnswers({});
                }}
                className="w-full mt-8 px-6 py-3 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition-colors duration-200"
              >
                Take Quiz Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 