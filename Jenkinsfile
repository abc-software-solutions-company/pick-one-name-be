pipeline {
    agent any
    tools {
        nodejs '21.X'
    }
    stages {
        stage('Lint') {
            steps {
                sh 'npm install && npm run lint'
            }
        }
    }
}