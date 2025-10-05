
import React, { useState, useEffect } from "react";
import { HandwritingGeneration } from "@/entities/HandwritingGeneration";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Clock, FileText, Images, FileOutput } from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createPageUrl } from '@/utils';


const HistoryItemDialog = ({ generation }) => {
  const handleDownload = (url, pageNumber) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `handwritten-page-${pageNumber}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleExportPDF = (pages) => {
    const urls = pages.map(p => encodeURIComponent(p)).join(',');
    const url = createPageUrl('Print') + '?pages=' + urls;
    window.open(url, '_blank');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">View Pages</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-5xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <div className="flex justify-between items-center pr-6">
            <DialogTitle>Generated Pages</DialogTitle>
            {generation.generated_image_urls?.length > 0 && (
              <Button onClick={() => handleExportPDF(generation.generated_image_urls)} size="sm">
                <FileOutput className="w-4 h-4 mr-2" />
                Export to PDF
              </Button>
            )}
          </div>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generation.generated_image_urls?.map((url, index) => (
              <div key={index} className="border rounded-lg overflow-hidden group relative shadow-md hover:shadow-xl transition-shadow">
                <div className="aspect-[210/297] bg-slate-50">
                  <img src={url} alt={`Page ${index + 1}`} className="w-full h-full object-contain" />
                </div>
                 <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button onClick={() => handleDownload(url, index + 1)} variant="secondary">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                 </div>
                 <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm text-center py-2 font-medium">
                    Page {index + 1}
                 </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


export default function HistoryPage() {
  const [generations, setGenerations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setIsLoading(true);
    const data = await HandwritingGeneration.list("-created_date", 50);
    setGenerations(data);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Generation History</h1>
          <p className="text-slate-600">View and download your previously generated documents</p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-32 w-full" />
                <CardContent className="p-4 space-y-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-8 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : generations.length === 0 ? (
          <Card className="backdrop-blur-sm bg-white/80 shadow-xl">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center">
                <FileText className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No Generations Yet</h3>
              <p className="text-slate-500">Start creating handwritten text to see your history here</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {generations.map((gen) => (
              <Card key={gen.id} className="flex flex-col justify-between backdrop-blur-sm bg-white/80 hover:shadow-xl transition-all duration-300">
                <CardHeader className="p-4">
                  <CardTitle className="text-base font-medium text-slate-900 line-clamp-3 leading-snug">
                    {gen.input_text}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                   <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                    <Images className="w-3 h-3" />
                    <span>{gen.generated_image_urls?.length || 0} Pages</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                    <Clock className="w-3 h-3" />
                    {format(new Date(gen.created_date), "MMM d, yyyy")}
                  </div>
                  <HistoryItemDialog generation={gen} />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
