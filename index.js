#!/usr/bin/env node

import chalk from 'chalk';
import { execa } from 'execa';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import ora from 'ora';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log(chalk.blue.bold('\n🚀 Welcome to Bibal Foods Desktop Setup!\n'));

  const { projectName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'What is your project name?',
      default: 'bibal-foods-desktop'
    }
  ]);

  const projectPath = path.join(process.cwd(), projectName);
  const spinner = ora();

  try {
    // Create project directory
    spinner.start('Creating project directory...');
    await fs.ensureDir(projectPath);
    spinner.succeed();

    // Initialize Electron project
    spinner.start('Initializing Electron project...');
    await execa('npx', ['create-electron-vite', projectName], { cwd: process.cwd() });
    spinner.succeed();

    // Install dependencies
    spinner.start('Installing dependencies...');
    await execa('npm', ['install'], { cwd: projectPath });
    
    const dependencies = [
      '@prisma/client',
      'sqlite3',
      'bcryptjs',
      'jsonwebtoken',
      'framer-motion',
      'lucide-react',
      'react-router-dom',
      'jspdf',
      'tailwindcss',
      'autoprefixer',
      'postcss'
    ];

    const devDependencies = [
      'prisma',
      'electron-builder',
      '@types/bcryptjs',
      '@types/jsonwebtoken'
    ];

    await execa('npm', ['install', ...dependencies], { cwd: projectPath });
    await execa('npm', ['install', '-D', ...devDependencies], { cwd: projectPath });
    spinner.succeed();

    // Copy template files
    spinner.start('Copying template files...');
    await fs.copy(path.join(__dirname, 'template'), projectPath);
    spinner.succeed();

    // Initialize database
    spinner.start('Initializing database...');
    await execa('npx', ['prisma', 'generate'], { cwd: projectPath });
    await execa('npx', ['prisma', 'migrate', 'dev'], { cwd: projectPath });
    spinner.succeed();

    console.log(chalk.green.bold('\n✨ Project created successfully!\n'));
    console.log(chalk.yellow('Next steps:'));
    console.log(chalk.white(`  1. cd ${projectName}`));
    console.log(chalk.white('  2. npm run dev'));
    console.log(chalk.white('\nTo build the installer:'));
    console.log(chalk.white('  npm run dist\n'));

  } catch (error) {
    spinner.fail('An error occurred');
    console.error(chalk.red(error));
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(chalk.red(error));
  process.exit(1);
});