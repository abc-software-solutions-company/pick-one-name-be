pipeline {
    agent any
    tools {
        nodejs '21.X'
    }
    stages {
        stage('Install NVM') {
            steps {
                sh 'sudo apt install curl && curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash '
            }
        }
        stage('Nvm 21') {
            steps {
                sh 'nvm install 21 && nvm use 21 && npm install'
            }
        }
    }
}