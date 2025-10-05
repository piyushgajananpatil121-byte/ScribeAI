
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { InvokeLLM, GenerateImage } from "@/integrations/Core";
import { HandwritingGeneration } from "@/entities/HandwritingGeneration";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { HANDWRITING_STYLES } from "../components/generator/HandwritingStyles";

import StepIndicator from "../components/generator/StepIndicator";
import StyleSelectionSection from "../components/generator/StyleSelectionSection";
import TextInputSection from "../components/generator/TextInputSection";
import GenerationSection from "../components/generator/GenerationSection";

const MAX_CHARACTERS = 7000;

// Helper function to calculate chars per page based on density
const getCharsPerPage = (density, pageSize) => {
  let baseDensity;
  if (density === 'compact') {
    baseDensity = 500;
  } else if (density === 'normal') {
    baseDensity = 350;
  } else { // 'sparse'
    baseDensity = 200;
  }

  let sizeMultiplier;
  if (pageSize === 'A4') {
    sizeMultiplier = 1;
  } else if (pageSize === 'Letter') {
    sizeMultiplier = 0.95;
  } else { // 'A5'
    sizeMultiplier = 0.8;
  }
  return Math.floor(baseDensity * sizeMultiplier);
};

// Helper function to handle retries for image generation
const generateImageWithRetry = async (prompt, retries = 2, delay = 2000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await GenerateImage({ prompt });
      if (result && result.url) {
        return result; // Success
      }
      throw new Error("Image generation returned an empty URL.");
    } catch (error) {
      console.error(`Generation attempt ${i + 1} failed:`, error);
      if (i === retries - 1) { // Last attempt
        throw error; // Re-throw the error to be caught by the main handler
      }
      // Wait before next retry
      await new Promise(res => setTimeout(res, delay));
    }
  }
};


export default function GeneratorPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [inputText, setInputText] = useState("");
  const [generatedPages, setGeneratedPages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [generationProgress, setGenerationProgress] = useState({ current: 0, total: 0 });
  
  const [selectedStyle, setSelectedStyle] = useState(HANDWRITING_STYLES[0]);
  const [paperStyle, setPaperStyle] = useState('plain white paper');
  const [penColorHex, setPenColorHex] = useState('#0033cc');
  const [penColorName, setPenColorName] = useState('dark blue');
  const [pageSize, setPageSize] = useState('A4');
  const [density, setDensity] = useState('normal');

  useEffect(() => {
    const handler = setTimeout(async () => {
      try {
        const result = await InvokeLLM({ prompt: `What is the common name for the color with hex code ${penColorHex}? Respond with only the color name, for example: 'light blue' or 'deep red'.`});
        setPenColorName(result.toLowerCase());
      } catch (e) {
        console.error("Could not get color name", e);
        setPenColorName('blue'); // fallback
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [penColorHex]);


  const handleGenerate = async () => {
    if (inputText.length > MAX_CHARACTERS) {
      setError(`Text is too long. Please keep it under ${MAX_CHARACTERS} characters.`);
      return;
    }
    if (inputText.trim().length === 0) {
      setError("Please enter some text to generate.");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedPages([]);

    const charsPerPage = getCharsPerPage(density, pageSize);
    const textChunks = [];
    for (let i = 0; i < inputText.length; i += charsPerPage) {
      textChunks.push(inputText.substring(i, i + charsPerPage));
    }
    setGenerationProgress({ current: 0, total: textChunks.length });

    const allPageUrls = [];

    for (let i = 0; i < textChunks.length; i++) {
      setGenerationProgress({ current: i + 1, total: textChunks.length });
      const chunk = textChunks[i];
      
      const prompt = `Realistic photo of handwritten text in ${selectedStyle.keywords} style, ${penColorName} ink on ${paperStyle} (${pageSize}). 

Write ALL text including letters, numbers (0-9), and symbols (+ - × ÷ = √ π % @ # ! ? etc). Preserve line breaks and spacing exactly.

Headings in BLACK INK (bolder). Fix spelling naturally. Math notation: superscripts (x²), subscripts (x₁), fractions, Greek letters.

Natural handwriting effects:
- Stroke thickness varies (pressure changes)
- Slightly uneven letter/word spacing
- Gentle baseline waviness, not perfectly straight
- Minor ink smudges, fading (1-2 per page)
- Letter size variations
- Rare crossed-out words or corrections
- Subtle paper texture visible
- Soft blur, not digitally sharp
- Natural shadows

Text to write:
"""
${chunk}
"""`;

      try {
        const { url } = await generateImageWithRetry(prompt);
        if (!url) {
          throw new Error(`Image generation failed for page ${i + 1}.`);
        }
        allPageUrls.push(url);
        setGeneratedPages(prev => [...prev, { pageNumber: i + 1, imageUrl: url }]);
      } catch (err) {
        setError(`Failed to generate page ${i + 1}. The service may be busy or your text may be too complex. Try shorter text or simpler content.`);
        console.error(err);
        setIsGenerating(false);
        return;
      }
    }

    await HandwritingGeneration.create({
      style_name: selectedStyle.name,
      pen_color: penColorName,
      paper_style: paperStyle,
      page_size: pageSize,
      density: density,
      input_text: inputText,
      generated_image_urls: allPageUrls
    });

    setIsGenerating(false);
  };
  
  const canProceedToStep2 = selectedStyle;
  const canProceedToStep3 = inputText.trim().length > 0 && inputText.length <= MAX_CHARACTERS;

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Handwriting Generator
          </h1>
          <p className="text-slate-600 text-lg">Choose a style, pick your colors, and bring your text to life.</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6 animate-pulse">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <StepIndicator currentStep={currentStep} />

        <div className="my-12">
          {currentStep === 1 && (
            <StyleSelectionSection 
              selectedStyle={selectedStyle}
              setSelectedStyle={setSelectedStyle}
              paperStyle={paperStyle}
              setPaperStyle={setPaperStyle}
              penColorHex={penColorHex}
              setPenColorHex={setPenColorHex}
              pageSize={pageSize}
              setPageSize={setPageSize}
              density={density}
              setDensity={setDensity}
            />
          )}

          {currentStep === 2 && (
            <TextInputSection 
              text={inputText}
              onChange={setInputText}
              maxCharacters={MAX_CHARACTERS}
              density={density}
              pageSize={pageSize}
            />
          )}

          {currentStep === 3 && (
            <GenerationSection 
              isGenerating={isGenerating}
              generatedPages={generatedPages}
              onGenerate={handleGenerate}
              generationProgress={generationProgress}
            />
          )}
        </div>

        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => {
              setCurrentStep(Math.max(1, currentStep - 1));
              setError(null);
            }}
            disabled={currentStep === 1}
            className="backdrop-blur-xl"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {currentStep < 3 && (
            <Button
              onClick={() => {
                setCurrentStep(currentStep + 1);
                setError(null);
              }}
              disabled={
                (currentStep === 1 && !canProceedToStep2) ||
                (currentStep === 2 && !canProceedToStep3)
              }
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/30"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
