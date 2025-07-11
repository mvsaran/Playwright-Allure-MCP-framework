🧪 Playwright MCP Automation with Allure Reports

This repository showcases an innovative approach to Playwright test automation, powered by AI (GPT-4.1) in Visual Studio Code. It uses the Page Object Model (POM) for scalability and integrates with Allure Reports for rich, interactive test reporting. The project also supports Jenkins CI/CD for automated execution and reporting.

🌟 Project Highlights
🤖 AI-Powered Test Generation
Uses GPT-4.1 to create end-to-end tests from scenarios and structured test context.

🔁 Iterative Development Workflow
Tests are generated, executed, and refined automatically until successful.

🧱 Page Object Model (POM)
Modular and maintainable design pattern for test reusability.

📊 Allure Reports Integration
Creates interactive test reports with detailed steps and visualizations.

🔧 Jenkins CI/CD Ready

Supports automated test runs and Allure report generation through Jenkins pipelines.

🚀 Getting Started
🛠️ Prerequisites

Ensure the following tools are installed:

📦 Node.js (LTS recommended)

🧶 npm or Yarn

💻 Visual Studio Code

🎭 Playwright Browsers (npx playwright install)

🧠 GitHub Copilot + Chat Extensions (optional but powerful)

⚙️ Installation
1. 📥 Clone the Repository
git clone 
2. 📦 Install Dependencies
npm install
# or
yarn install
3. 🎭 Install Playwright Browsers
npx playwright install
4. 📦 Install Allure Dependencies
npm install -D allure-playwright allure-commandline
🔧 Configure Allure in playwright.config.ts
import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: false,
    }],
  ],
  use: {
    trace: 'on-first-retry',
  },
});
🧪 Running Tests & Viewing Reports
▶️ Run Tests
npx playwright test
➡️ This creates an allure-results/ folder with raw data.
📊 Generate Allure Report
npx allure generate allure-results --clean -o allure-report
🌐 Open the Report
npx allure open allure-report
🤖 AI-Powered Test Generation Workflow
🧠 AI Context Instructions
Receive scenario input + test context
Run MCP tools to inspect and interact
Generate Playwright tests using POM
Save under /tests/, execute, refine until passing

Example Prompt

Navigate to http://www.automationpractice.pl/index.php  
Search for "T-shirts"  
Verify "Faded short sleeve T-shirts" is in the results
🔄 Automated Execution Cycle
MCP loads test context

GPT-4.1 emits test steps one-by-one

Test saved and executed

Iterates until it passes ✅

💡 Using GitHub Copilot in Agent Mode
Use GitHub Copilot Chat in VSCode to:
Understand test goals
Suggest code + commands
Help fix errors
Iterate on failing tests

Agent Mode Steps:

📦 Install GitHub Copilot and Copilot Chat

🧠 Use prompts like:

Generate a Playwright test for login using POM.
Help debug why the test is failing.
Copilot will analyze and take action based on the context.

🌐 Jenkins CI/CD + Allure Integration
You can run your tests automatically via Jenkins and view Allure reports in each build.

🔧 Jenkins Prerequisites
🖥️ Jenkins server running

🟢 Node.js & npm/yarn installed on build agents

🧪 Playwright + Allure set up in project

📦 Allure CLI installed globally or locally

📦 Install Jenkins Plugins
Go to Manage Jenkins → Plugins → Available tab:

✅ Allure Jenkins Plugin

✅ NodeJS Plugin

Restart Jenkins if prompted.

🧰 Configure Global Tools
NodeJS

Go to Manage Jenkins → Global Tool Configuration

Under NodeJS, add a version (e.g., NodeJS 18) and check "Install automatically"

Allure CLI

Download and unzip Allure CLI

Add the bin/ folder path to the PATH environment variable of Jenkins agent

🏗️ Create Jenkins Freestyle Job
Click New Item → Freestyle project

Name: Playwright-E2E-Tests

Under Source Code Management → Git:

Repo: https://github.com/your-username/your-repo-name.git

Under Build Environment:

✔️ Provide Node & npm bin folder to PATH

Select previously configured NodeJS

Build Steps:

Add a new Execute Shell step (Linux/macOS) or Batch Command (Windows)
npm install
npx playwright install
npx playwright test --reporter=line,allure-playwright
📈 Add Post-Build Action: Allure Report
Click Add post-build action → Allure Report

Set "Path to results" as:allure-results
✅ Run the Job
Click Build Now and after completion, click the Allure Report link in build history to view your test execution results directly inside Jenkins.

✅ Implemented Scenario Example
🔍 Scenario:
Search for a product on automationpractice.pl

🧭 Steps:
Navigate to homepage
Search for "T-shirts"
Validate "Faded short sleeve T-shirts" appears
✅ Built using Page Object Model with AI-generated logic

Jenkins File
pipeline {
  agent any

  tools {
    nodejs 'NodeJS 18' // Set this in Jenkins > Global Tool Configuration
  }

  environment {
    // Add path to Allure if installed manually on the agent (optional)
    PATH = "${env.PATH};C:\\allure-commandline\\bin"
  }

  stages {
    stage('📦 Install Dependencies') {
      steps {
        echo 'Installing dependencies...'
        bat 'npm install'
        bat 'npx playwright install'
      }
    }

    stage('🧪 Run Playwright Tests') {
      steps {
        echo 'Running Playwright tests with Allure reporter...'
        bat 'npx playwright test --reporter=line,allure-playwright'
      }
    }

    stage('📊 Generate Allure Report (CLI)') {
      steps {
        echo 'Generating Allure HTML Report...'
        bat 'npx allure generate allure-results --clean -o allure-report'
      }
    }
  }

  post {
    always {
      echo 'Publishing Allure Report...'
      allure includeProperties: false, jdk: '', reportBuildPolicy: 'ALWAYS', results: [[path: 'allure-results']]
    }
  }
}
📝 Notes:
🔧 NodeJS 18 should match the label in Jenkins → Manage Jenkins → Global Tool Configuration

🛠️ If allure is installed manually (not via npm), update the PATH in the environment block.

✅ This script supports Windows agents (bat); change to sh for Linux/macOS agents.

✅ How to Use This
In Jenkins, create a new Pipeline project

In the job config:

Choose "Pipeline script from SCM"

Set SCM to Git

Provide your GitHub repo URL

Set script path to Jenkinsfile (case-sensitive)

Save and click Build Now
