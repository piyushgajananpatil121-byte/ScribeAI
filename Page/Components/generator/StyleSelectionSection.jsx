
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle } from "lucide-react";
import { HANDWRITING_STYLES } from './HandwritingStyles';

const StyleCard = ({ style, isSelected, onSelect }) => {
  return (
    <div 
      className={`relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-200 ${isSelected ? 'border-indigo-500 shadow-2xl' : 'border-transparent hover:shadow-lg'}`}
      onClick={() => onSelect(style)}
    >
      <img src={style.preview} alt={style.name} className="w-full h-auto aspect-[16/10] object-cover" />
      {isSelected && (
        <div className="absolute top-2 right-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white border-2 border-white">
          <CheckCircle className="w-4 h-4" />
        </div>
      )}
      <div className={`absolute bottom-0 left-0 right-0 p-2 text-center text-sm font-semibold text-white ${isSelected ? 'bg-indigo-500' : 'bg-black/50'}`}>
        {style.name}
      </div>
    </div>
  );
};

export default function StyleSelectionSection({
  selectedStyle,
  setSelectedStyle,
  paperStyle,
  setPaperStyle,
  penColorHex,
  setPenColorHex,
  pageSize,
  setPageSize,
  density,
  setDensity
}) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900">Choose Your Handwriting Style</h2>
        <p className="text-slate-500 max-w-lg mx-auto mt-2">
          Select a handwriting from our library, then customize your paper, ink, and layout.
        </p>
      </div>

      <div>
        <Label className="text-xl font-bold text-slate-800 mb-4 block">1. Select a Handwriting Style</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {HANDWRITING_STYLES.map(style => (
            <StyleCard 
              key={style.name} 
              style={style} 
              isSelected={selectedStyle?.name === style.name}
              onSelect={setSelectedStyle}
            />
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Label className="text-xl font-bold text-slate-800 mb-4 block">2. Select Paper Style & Size</Label>
          <Card className="p-6 backdrop-blur-sm bg-white/80 space-y-4">
            <div>
              <Label className="text-sm font-semibold text-slate-700 mb-2 block">Paper Type</Label>
              <RadioGroup value={paperStyle} onValueChange={setPaperStyle} className="space-y-3">
                <div className="flex items-center space-x-2"><RadioGroupItem value="plain white paper" id="p_plain" /><Label htmlFor="p_plain">Plain White</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="blue-lined notebook paper" id="p_lined" /><Label htmlFor="p_lined">Lined Paper</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="graph paper" id="p_grid" /><Label htmlFor="p_grid">Graph Paper</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="yellow legal pad paper" id="p_yellow" /><Label htmlFor="p_yellow">Yellow Legal Pad</Label></div>
              </RadioGroup>
            </div>
            <div className="border-t pt-4">
              <Label className="text-sm font-semibold text-slate-700 mb-2 block">Paper Size</Label>
              <RadioGroup value={pageSize} onValueChange={setPageSize} className="space-y-3">
                <div className="flex items-center space-x-2"><RadioGroupItem value="A4" id="size_a4" /><Label htmlFor="size_a4">A4 (210 × 297 mm)</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="Letter" id="size_letter" /><Label htmlFor="size_letter">Letter (8.5 × 11 in)</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="A5" id="size_a5" /><Label htmlFor="size_a5">A5 (148 × 210 mm)</Label></div>
              </RadioGroup>
            </div>
          </Card>
        </div>
        <div className="space-y-6">
          <div>
            <Label className="text-xl font-bold text-slate-800 mb-4 block">3. Choose Ink Color</Label>
            <Card className="p-6 backdrop-blur-sm bg-white/80">
              <div className="flex items-center gap-4">
                <input 
                  type="color" 
                  value={penColorHex}
                  onChange={(e) => setPenColorHex(e.target.value)}
                  className="w-16 h-16 p-1 bg-white border border-slate-300 rounded-md cursor-pointer"
                />
                <div>
                  <p className="font-medium text-slate-700">Custom Color</p>
                  <p className="text-sm text-slate-500">Pick any color. Headings will be in black.</p>
                  <p className="font-mono text-xs mt-1 bg-slate-100 px-2 py-1 rounded w-fit">{penColorHex}</p>
                </div>
              </div>
            </Card>
          </div>
          <div>
            <Label className="text-xl font-bold text-slate-800 mb-4 block">4. Writing Density</Label>
            <Card className="p-6 backdrop-blur-sm bg-white/80">
              <RadioGroup value={density} onValueChange={setDensity} className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="spacious" id="d_spacious" />
                  <Label htmlFor="d_spacious" className="flex flex-col">
                    <span className="font-medium">Spacious</span>
                    <span className="text-xs text-slate-500">~200 characters per page</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="normal" id="d_normal" />
                  <Label htmlFor="d_normal" className="flex flex-col">
                    <span className="font-medium">Normal</span>
                    <span className="text-xs text-slate-500">~350 characters per page</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="compact" id="d_compact" />
                  <Label htmlFor="d_compact" className="flex flex-col">
                    <span className="font-medium">Compact</span>
                    <span className="text-xs text-slate-500">~500 characters per page</span>
                  </Label>
                </div>
              </RadioGroup>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
