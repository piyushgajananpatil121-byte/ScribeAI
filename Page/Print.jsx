import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const PrintPage = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pagesParam = urlParams.get('pages');
    if (pagesParam) {
      const decodedUrls = pagesParam.split(',').map(url => decodeURIComponent(url));
      setImages(decodedUrls);
    }
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const imagePromises = images.map(src => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      Promise.all(imagePromises)
        .then(() => {
          setIsLoading(false);
          setTimeout(() => window.print(), 500);
        })
        .catch(err => {
          console.error("Error loading images for printing", err);
          setIsLoading(false);
        });
    }
  }, [images]);

  return (
    <div>
      <style>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          .print-container {
            width: 100%;
          }
          .print-page {
            page-break-after: always;
            width: 210mm;
            height: 297mm;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }
          .print-page img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
          }
          .no-print {
            display: none !important;
          }
        }
        @page {
          size: A4;
          margin: 0;
        }
      `}</style>
      
      <div className="no-print min-h-screen bg-slate-100 flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">Preparing your document for printing...</h1>
        {isLoading ? (
            <div className="flex items-center gap-3 text-slate-600">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Loading pages...</span>
            </div>
        ) : (
            <>
                <p className="text-slate-600 mb-4">Your document is ready. The print dialog should open automatically.</p>
                <p className="text-sm text-slate-500">If it doesn't, please press <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Ctrl+P</kbd> or <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Cmd+P</kbd>.</p>
                <p className="mt-4 text-sm text-slate-500">In the print dialog, choose 'Save as PDF' as the destination.</p>
            </>
        )}
      </div>

      <div className="print-container">
        {images.map((src, index) => (
          <div key={index} className="print-page">
            <img src={src} alt={`Page ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrintPage;
