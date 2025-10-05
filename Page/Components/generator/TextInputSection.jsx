
import React from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function TextInputSection({ text, onChange, maxCharacters, density, pageSize }) {
  const isOverLimit = text.length > maxCharacters;
  
  const getCharsPerPage = (density, pageSize) => {
    const baseDensity = density === 'compact' ? 500 : density === 'normal' ? 350 : 200;
    const sizeMultiplier = pageSize === 'A4' ? 1 : pageSize === 'Letter' ? 0.95 : 0.8;
    return Math.floor(baseDensity * sizeMultiplier);
  };
  
  const charsPerPage = getCharsPerPage(density, pageSize);
  const estimatedPages = Math.ceil(text.length / charsPerPage);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-slate-900">Enter Your Text</h2>
        <p className="text-slate-500 max-w-md mx-auto">
          Enter your text with proper formatting. Line breaks and spacing will be preserved.
        </p>
      </div>

      <Alert className="bg-blue-50/50 border-blue-200 backdrop-blur-sm">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-900">
          <strong>Tips:</strong> Format your text naturally with line breaks. Math expressions (x², √16, π) and numbers will be written correctly with natural pen pressure variations. Spelling mistakes auto-corrected. Headings appear in black ink with slight natural imperfections.
        </AlertDescription>
      </Alert>

      <Card className="backdrop-blur-sm bg-white/80 shadow-xl">
        <div className="p-8 space-y-4">
          <Label htmlFor="input-text" className="text-base font-semibold text-slate-900">
            Your Text (Max {maxCharacters} Characters)
          </Label>
          <Textarea
            id="input-text"
            value={text}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Example:

Introduction to Physics

Newton's second law states that F = ma, where F is force, m is mass, and a is acceleration.

Energy equation: E = mc²

For a circle: Area = πr²
Circumference = 2πr

Special symbols: ≤ ≥ ± ∞ √ ∑ ∫"
            className={`min-h-[400px] text-base leading-relaxed resize-y font-mono ${
              isOverLimit 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500'
            }`}
          />
          <div className="flex justify-between items-center text-sm">
            <div className="space-y-1">
              <span className={isOverLimit ? 'text-red-600 font-semibold' : 'text-slate-500'}>
                {text.length} / {maxCharacters} characters
              </span>
              {text.length > 0 && (
                <p className="text-xs text-slate-500">
                  Estimated pages: <strong>{estimatedPages}</strong> ({charsPerPage} chars/page)
                </p>
              )}
            </div>
            {isOverLimit && (
              <span className="text-red-600 font-semibold">
                Text is too long
              </span>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
