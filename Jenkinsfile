pipeline {
  agent any

  tools {
    nodejs 'NodeJS 18' // Name must match Jenkins global tools config
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
  }

  post {
    always {
      // Jenkins Allure plugin will automatically pick up the results
      allure includeProperties: false, jdk: '', reportBuildPolicy: 'ALWAYS', results: [[path: 'allure-results']]
    }
  }
}
