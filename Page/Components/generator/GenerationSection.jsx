
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Download, Sparkles, FileImage, FileOutput } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { createPageUrl } from '@/utils';

const handleExportPDF = (pages) => {
  const urls = pages.map(p => encodeURIComponent(p.imageUrl)).join(',');
  const url = createPageUrl('Print') + '?pages=' + urls;
  window.open(url, '_blank');
};

const PageCard = ({ page }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = page.imageUrl;
    link.download = `handwritten-page-${page.pageNumber}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="overflow-hidden group transition-all hover:shadow-2xl hover:-translate-y-1">
      <div className="relative aspect-[210/297] bg-slate-100">
        <img src={page.imageUrl} alt={`Page ${page.pageNumber}`} className="w-full h-full object-contain" />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button onClick={handleDownload} className="bg-white/90 text-slate-900 hover:bg-white">
            <Download className="w-4 h-4 mr-2" />
            Download Page
          </Button>
        </div>
      </div>
      <CardContent className="p-3 bg-slate-50/50">
        <p className="font-semibold text-sm text-center text-slate-600">Page {page.pageNumber}</p>
      </CardContent>
    </Card>
  );
};

export default function GenerationSection({ 
  isGenerating, 
  generatedPages, 
  onGenerate,
  generationProgress
}) {
  const hasStarted = generatedPages.length > 0 || isGenerating;
  const progressValue = generationProgress.total > 0 ? (generationProgress.current / generationProgress.total) * 100 : 0;

  if (!hasStarted) {
    return (
      <Card className="backdrop-blur-sm bg-white/80 shadow-xl">
        <div className="p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Ready to Generate</h3>
          <p className="text-slate-500 mb-6">Your text will be converted into realistic handwritten pages.</p>
          <Button
            onClick={onGenerate}
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 shadow-lg shadow-purple-500/30"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Generate Handwriting
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 backdrop-blur-sm bg-white/80 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <h3 className="text-2xl font-bold text-slate-900">Your Document</h3>
          {!isGenerating && generatedPages.length > 0 && (
            <div className="flex gap-2">
               <Button
                onClick={() => handleExportPDF(generatedPages)}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <FileOutput className="w-4 h-4 mr-2" />
                Export to PDF
              </Button>
              <Button
                onClick={onGenerate}
                variant="outline"
                className="backdrop-blur-xl"
              >
                Regenerate All Pages
              </Button>
            </div>
          )}
        </div>

        {isGenerating && (
          <div className="text-center space-y-3 p-4 border rounded-lg bg-slate-50">
             <div className="flex items-center justify-center gap-3">
              <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
              <p className="font-semibold text-indigo-700">Generating page {generationProgress.current} of {generationProgress.total}...</p>
             </div>
             <Progress value={progressValue} className="w-full h-2" />
          </div>
        )}

        {!isGenerating && generatedPages.length === 0 && (
           <div className="text-center py-10">
              <FileImage className="w-12 h-12 mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500">Generation complete. Your pages will appear here.</p>
           </div>
        )}
      </Card>
      
      {generatedPages.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {generatedPages.map(page => (
            <PageCard key={page.pageNumber} page={page} />
          ))}
        </div>
      )}
    </div>
  );
}
