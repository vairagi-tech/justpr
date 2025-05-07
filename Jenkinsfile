pipeline {
    agent any

    environment {
        IMAGE_NAME = 'vairagitech/reactpro'
        CONTAINER_NAME = 'react-con'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/vairagi-tech/justpr.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        docker push $IMAGE_NAME
                    '''
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                sh '''
                    docker rm -f $CONTAINER_NAME || true
                    docker run -d -p 5173:5173 --name $CONTAINER_NAME $IMAGE_NAME
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful! The JokeGenie container is up and running at port 3000.'
        }

        failure {
            echo '❌ Deployment failed! Check the console output for errors in build, push, or run steps.'
        }

        always {
            echo '📦 CI/CD Pipeline execution completed.'
        }
    }
}