const fs = require('fs');
const path = require('path');

const files = [
  'AccommodationRedesign.tsx',
  'ConciergeRedesign.tsx',
  'TourRedesign.tsx',
  'BuyingRedesign.tsx',
  'RepairRedesign.tsx'
];

const dir = path.join(__dirname, 'src', 'app', '[id]');

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Add import if not exists
  if (!content.includes('FadeInSection')) {
    content = content.replace('import { iconMap, type ServiceType } from "@/lib/servicesData";', 'import { iconMap, type ServiceType } from "@/lib/servicesData";\nimport FadeInSection from "@/components/ui/FadeInSection";');
  }

  // We want to wrap the left column and right column with FadeInSection.
  // Instead of replacing the div and finding the closing div (which requires an AST or careful parsing),
  // we can just replace the opening tags and use the fact that these are the main children of the flex container.

  // Right column wrapper
  content = content.replace(
    /<div className="w-full lg:w-\[480px\] shrink-0 order-1 lg:order-2 lg:sticky lg:top-24">/g,
    '<FadeInSection delay={200} className="w-full lg:w-[480px] shrink-0 order-1 lg:order-2 lg:sticky lg:top-24">'
  );

  // Left column wrapper
  content = content.replace(
    /<div className="flex-1 order-2 lg:order-1 space-y-12 lg:space-y-16">/g,
    '<FadeInSection delay={100} className="flex-1 order-2 lg:order-1 space-y-12 lg:space-y-16">'
  );

  // But we need to replace their closing tags.
  // The structure is:
  // <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
  //   {/* right */}
  //   <div className="w-full ...">...</div>
  //   {/* left */}
  //   <div className="flex-1 ...">...</div>
  // </div>
  // This is too hard to regex. Let's do a simple component-level wrap instead!
  
  // We can wrap the whole `<main>` or the `flex-row` div!
  content = content.replace(
    /<div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">/,
    '<FadeInSection delay={100}><div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">'
  );
  
  content = content.replace(
    /<\/main>/,
    '</div></FadeInSection></main>'
  );

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${file}`);
});
