pipeline {
    agent any
    stages {
        stage('Build') { 
            steps {
                sh 'nvm use 21 && yarn install && yarn build' 
            }
        }
    }
}