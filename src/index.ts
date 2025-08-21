#!/usr/bin/env node
import inquirer from 'inquirer';

import {
  getProjectName,
  readmeExists,
  createReadme,
  appendToReadme,
} from './create-stargazers';

const main = async (): Promise<void> => {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'user',
        message: 'Enter GitHub username:',
        validate: input => input.trim() !== '' || 'Username is required',
      },
      {
        type: 'input',
        name: 'repo',
        message: 'Enter repository name:',
        validate: input => input.trim() !== '' || 'Repository name is required',
      }
    ]);

    const { user, repo } = answers;
    const url = `https://stargazers-generator.vercel.app/api/stargazers?user=${user}&repo=${repo}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`❌ Failed to fetch stargazers: ${response.statusText}`);
    }

    const stargazersSvg = await response.text();
    const projectName = getProjectName();

    if (!readmeExists()) {
      createReadme(projectName, stargazersSvg);

      console.log('✅ Created README.md with stargazers');
    } else {
      appendToReadme(stargazersSvg);

      console.log('✅ Updated README.md with stargazers');
    }
  } catch (error) {
    console.error('❌ Stargazers failed:', (error as Error).message);

    process.exit(1);
  }
};

main();
