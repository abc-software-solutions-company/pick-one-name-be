pipeline {
    agent any
    stages {
        stage('Nvm 21') {
            steps {
                sh 'nvm install 21 && nvm use 21 && npm install'
            }
        }
    }
}