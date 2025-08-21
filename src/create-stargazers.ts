import {
  readFileSync,
  existsSync,
  writeFileSync,
  appendFileSync,
} from 'fs';

const getProjectName = (): string => {
  try {
    const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));

    return packageJson.name || 'Project';
  } catch {
    return 'Project';
  }
};

const readmeExists = (): boolean => {
  return existsSync('README.md') || existsSync('readme.md');
};

const getReadmePath = (): string | null => {
  if (existsSync('README.md')) {
    return 'README.md';
  }

  if (existsSync('readme.md')) {
    return 'readme.md';
  }

  return null;
};

const createReadme = (projectName: string, stargazers: string) => {
  const content = `# ${projectName}

<!-- Stargazers generated automatically with npx @titenq/stargazers -->
${stargazers}
`;

  writeFileSync('README.md', content);
};

const appendToReadme = (stargazers: string) => {
  const content = `

<!-- Stargazers generated automatically with npx @titenq/stargazers -->
${stargazers}
`;

  const readmePath = getReadmePath();

  if (readmePath) {
    appendFileSync(readmePath, content);
  }
};

export {
  getProjectName,
  readmeExists,
  createReadme,
  appendToReadme,
};
