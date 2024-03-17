pipeline {
    agent any
    stages {
        stage('Install NVM') {
            steps {
                sh 'apt install curl && curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash '
            }
        }
        stage('Nvm 21') {
            steps {
                sh 'nvm install 21 && nvm use 21 && npm install'
            }
        }
    }
}