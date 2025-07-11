pipeline {
  agent any

  tools {
    nodejs 'NodeJS 18' // Must match the name in Jenkins > Global Tool Config
  }

  environment {
    PATH = "${env.PATH};C:\\allure-commandline\\bin"
  }

  stages {
    stage('📦 Install Dependencies') {
      steps {
        bat 'npm install'
        bat 'npx playwright install'
      }
    }

    stage('🧪 Run Playwright Tests') {
      steps {
        bat 'npx playwright test --reporter=line,allure-playwright'
      }
    }

    stage('📊 Generate Allure Report') {
      steps {
        bat 'npx allure generate allure-results --clean -o allure-report'
      }
    }
  }

  post {
    always {
      allure includeProperties: false, jdk: '', reportBuildPolicy: 'ALWAYS', results: [[path: 'allure-results']]
    }
  }
}
