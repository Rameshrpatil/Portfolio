import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the data
import { profile, stats, experience, workProjects, personalProjects, education, skillProficiency, skills, endorsements } from './frontend/src/data/resume.js';

const resumeData = {
  profile, stats, experience, workProjects, personalProjects, education, skillProficiency, skills, endorsements
};

fs.writeFileSync('./frontend/src/data/resume.json', JSON.stringify(resumeData, null, 2));
console.log("Created resume.json");

const filesToUpdate = [
  'frontend/src/components/Footer.tsx',
  'frontend/src/components/Navbar.tsx',
  'frontend/src/pages/About.tsx',
  'frontend/src/pages/Contact.tsx',
  'frontend/src/pages/Experience.tsx',
  'frontend/src/pages/Home.tsx',
  'frontend/src/pages/Projects.tsx',
  'frontend/src/pages/Skills.tsx'
];

for (const file of filesToUpdate) {
  const filePath = path.join(__dirname, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace import { ... } from "../data/resume";
  // with import resumeData from "../data/resume.json"; const { ... } = resumeData;
  content = content.replace(/import\s+{([^}]+)}\s+from\s+"([^"]*data\/resume[^"]*)";/g, (match, vars, path) => {
    return `import resumeData from "../data/resume.json";\nconst { ${vars.trim()} } = resumeData;`;
  });
  
  fs.writeFileSync(filePath, content);
  console.log("Updated", file);
}
