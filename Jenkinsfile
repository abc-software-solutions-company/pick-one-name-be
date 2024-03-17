pipeline {
    agent any
    tools {
        nodejs '21.X'
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install && npm run lint'
            }
        }
    }
}