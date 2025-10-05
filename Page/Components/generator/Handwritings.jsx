
export const HANDWRITING_STYLES = [
  // Neat & Legible
  { name: "The Scholar", keywords: "very neat, consistent, legible academic print-script", preview: "https://dummyimage.com/400x250/e0f2fe/083344&text=The+Scholar" },
  { name: "Minimalist Print", keywords: "clean, simple, minimalist, and widely spaced modern print handwriting", preview: "https://dummyimage.com/400x250/f1f5f9/1e293b&text=Minimalist+Print" },
  { name: "Architect's Hand", keywords: "sharp, clean, all-caps block letters, like an architect's precise handwriting", preview: "https://dummyimage.com/400x250/e2e8f0/0f172a&text=Architect's+Hand" },
  { name: "Teacher's Pet", keywords: "perfectly neat, rounded, and clear elementary school handwriting", preview: "https://dummyimage.com/400x250/dbeafe/1e40af&text=Teacher's+Pet" },
  { name: "Librarian's Index", keywords: "tidy, slightly condensed, and uniform print, like a library card catalog entry", preview: "https://dummyimage.com/400x250/e5e7eb/1f2937&text=Librarian's+Index" },
  { name: "Engineer's Draft", keywords: "functional, slightly slanted, uppercase technical lettering", preview: "https://dummyimage.com/400x250/e5e5e5/262626&text=Engineer's+Draft" },

  // Cursive & Elegant
  { name: "Elegant Cursive", keywords: "beautiful, flowing, elegant cursive script with perfect loops", preview: "https://dummyimage.com/400x250/fdf2f8/86198f&text=Elegant+Cursive" },
  { name: "Classic Cursive", keywords: "traditional, American-style school cursive handwriting", preview: "https://dummyimage.com/400x250/faf5ff/581c87&text=Classic+Cursive" },
  { name: "Spencerian Grace", keywords: "ornamental, 19th-century Spencerian script with delicate flourishes", preview: "https://dummyimage.com/400x250/f5f3ff/4c1d95&text=Spencerian+Grace" },
  { name: "Signature Flow", keywords: "fast, connected, and stylish cursive script suitable for a signature", preview: "https://dummyimage.com/400x250/eef2ff/312e81&text=Signature+Flow" },
  { name: "French Ronde", keywords: "formal, rounded, upright script with a historical French feel", preview: "https://dummyimage.com/400x250/f0f9ff/0c4a6e&text=French+Ronde" },
  { name: "Italian Hand", keywords: "swift, slanted, and slightly condensed Italic cursive script", preview: "https://dummyimage.com/400x250/fdfdea/854d0e&text=Italian+Hand" },

  // Casual & Everyday
  { name: "Casual Scrawl", keywords: "quick, slightly messy but legible everyday handwriting with a ballpoint pen", preview: "https://dummyimage.com/400x250/f0fdf4/14532d&text=Casual+Scrawl" },
  { name: "Hasty Notes", keywords: "hastily jotted down notes, slanted and quick, using a simple pen", preview: "https://dummyimage.com/400x250/f3f4f6/374151&text=Hasty+Notes" },
  { name: "Journaling Hand", keywords: "personal, introspective, and slightly varied print-script for journaling", preview: "https://dummyimage.com/400x250/f4f4f5/3f3f46&text=Journaling+Hand" },
  { name: "Friendly Print", keywords: "warm, approachable, and slightly rounded everyday print", preview: "https://dummyimage.com/400x250/f0fff4/276749&text=Friendly+Print" },
  { name: "Left-Hand Slant", keywords: "a typical left-handed handwriting style, with a backward slant", preview: "https://dummyimage.com/400x250/f5f5f4/3f3f46&text=Left-Hand+Slant" },
  { name: "Quick Memo", keywords: "condensed, fast, and functional handwriting for a quick office memo", preview: "https://dummyimage.com/400x250/e4e4e7/27272a&text=Quick+Memo" },
  
  // Bold & Expressive
  { name: "Bold Marker", keywords: "thick, bold handwriting written with a permanent felt-tip marker", preview: "https://dummyimage.com/400x250/fef2f2/7f1d1d&text=Bold+Marker" },
  { name: "Brush Stroke", keywords: "artistic, expressive strokes as if written with an ink brush", preview: "https://dummyimage.com/400x250/fefce8/854d0e&text=Brush+Stroke" },
  { name: "Graffiti Tag", keywords: "stylized, urban graffiti-style lettering or tagging", preview: "https://dummyimage.com/400x250/111827/d1d5db&text=Graffiti+Tag" },
  { name: "Headline Grab", keywords: "heavy, impactful, and eye-catching print for headlines", preview: "https://dummyimage.com/400x250/171717/fafafa&text=Headline+Grab" },
  { name: "Comic Book", keywords: "classic comic book lettering, all-caps with a dynamic feel", preview: "https://dummyimage.com/400x250/fef9c3/ca8a04&text=Comic+Book" },
  { name: "Chalkboard Write", keywords: "the texture and style of handwriting on a chalkboard with chalk", preview: "https://dummyimage.com/400x250/262626/e5e5e5&text=Chalkboard+Write" },

  // Youthful & Fun
  { name: "Youthful Bubble", keywords: "bubbly, rounded, youthful handwriting, often seen in high-school notebooks", preview: "https://dummyimage.com/400x250/fce7f3/86198f&text=Youthful+Bubble" },
  { name: "Teenage Dream", keywords: "a mix of print and cursive with hearts dotting the 'i's, teen style", preview: "https://dummyimage.com/400x250/fae8ff/701a75&text=Teenage+Dream" },
  { name: "Doodle Pad", keywords: "playful handwriting mixed with small, simple doodles in the margins", preview: "https://dummyimage.com/400x250/fafaf9/71717a&text=Doodle+Pad" },
  { name: "Gel Pen Shine", keywords: "smooth, consistent, and slightly shiny, like writing with a gel pen", preview: "https://dummyimage.com/400x250/ecfccb/3f6212&text=Gel+Pen+Shine" },
  { name: "Pencil Sketch", keywords: "the soft, graphite texture of writing done with a pencil", preview: "https://dummyimage.com/400x250/d4d4d8/52525b&text=Pencil+Sketch" },
  
  // Historical & Thematic
  { name: "Vintage Script", keywords: "old-fashioned, 1920s vintage handwriting with elegant flourishes", preview: "https://dummyimage.com/400x250/fef9f2/7c2d12&text=Vintage+Script" },
  { name: "Gothic Blackletter", keywords: "medieval, Gothic blackletter or Fraktur calligraphy", preview: "https://dummyimage.com/400x250/1c1917/e7e5e4&text=Gothic+Blackletter" },
  { name: "Steampunk Cog", keywords: "a mechanical, precise script with steampunk-style embellishments", preview: "https://dummyimage.com/400x250/f7f3ef/44403c&text=Steampunk+Cog" },
  { name: "Ancient Scroll", keywords: "ancient, weathered handwriting on a piece of papyrus or a scroll", preview: "https://dummyimage.com/400x250/fffbeb/78350f&text=Ancient+Scroll" },
  { name: "Detective's Casefile", keywords: "a gritty, hurried, all-caps print from a 1940s detective's notebook", preview: "https://dummyimage.com/400x250/a8a29e/292524&text=Detective's+Casefile" },
  { name: "Wizard's Grimoire", keywords: "mystical, arcane script with runic influences, from a wizard's spellbook", preview: "https://dummyimage.com/400x250/581c87/e9d5ff&text=Wizard's+Grimoire" },

  // Quirky & Unique
  { name: "Dot Matrix", keywords: "handwriting where each letter is formed by a series of dots", preview: "https://dummyimage.com/400x250/e0e0e0/555&text=Dot+Matrix" },
  { name: "Backwards Write", keywords: "legible text where all the letters are written backwards, like Leonardo da Vinci", preview: "https://dummyimage.com/400x250/d1d5db/1f2937&text=Backwards+Write" },
  { name: "Code Breaker", keywords: "a cypher-like script with unusual symbols mixed with letters", preview: "https://dummyimage.com/400x250/dcfce7/14532d&text=Code+Breaker" },
  { name: "Stitch & Thread", keywords: "handwriting that looks like it has been stitched with thread", preview: "https://dummyimage.com/400x250/f3e8ff/581c87&text=Stitch+%26+Thread" },
  { name: "Tall & Skinny", keywords: "extremely condensed, tall, and skinny vertical handwriting", preview: "https://dummyimage.com/400x250/e7e5e4/44403c&text=Tall+%26+Skinny" },
  { name: "Wide & Low", keywords: "very wide, short, and spread-out horizontal handwriting", preview: "https://dummyimage.com/400x250/e7e5e4/44403c&text=Wide+%26+Low" },

  // Professional Roles
  { name: "Doctor's Illegible", keywords: "very fast, almost illegible doctor's scribble, like a prescription note", preview: "https://dummyimage.com/400x250/e0f2fe/0369a1&text=Doctor's+Illegible" },
  { name: "CEO's Power Signature", keywords: "a bold, confident, and slightly illegible executive signature style", preview: "https://dummyimage.com/400x250/1e293b/dbeafe&text=CEO's+Signature" },
  { name: "Lawyer's Markup", keywords: "precise, annotated, and slightly cramped handwriting for legal notes", preview: "https://dummyimage.com/400x250/f1f5f9/475569&text=Lawyer's+Markup" },
  { name: "Poet's Flourish", keywords: "an emotional, artistic, and slightly dramatic handwriting style", preview: "https://dummyimage.com/400x250/fdf4ff/701a75&text=Poet's+Flourish" },
  { name: "Scientist's Logbook", keywords: "a mix of neat print, quick cursive, numbers, and scientific symbols", preview: "https://dummyimage.com/400x250/f8fafc/0f172a&text=Scientist's+Logbook" },
  { name: "Chef's Recipe Card", keywords: "quick, functional, and slightly grease-stained handwriting on a recipe card", preview: "https://dummyimage.com/400x250/fef3c7/92400e&text=Chef's+Recipe+Card" },
  { name: "Musician's Score", keywords: "handwritten musical notes and text on a score sheet", preview: "https://dummyimage.com/400x250/f5f5f4/18181b&text=Musician's+Score" },
  { name: "Pilot's Log", keywords: "clear, concise, all-caps print for a pilot's flight logbook", preview: "https://dummyimage.com/400x250/e0f2fe/075985&text=Pilot's+Log" }
];
