pipeline {
    agent any
    
    environment {
        // NODE_ENV is dev for testing first, will prune dev dependencies before deploy.
        NODE_ENV = 'development'
    }
    
    stages {

        stage('Preparation') { 
            steps {
                git branch: 'master', url: 'https://github.com/viseo-asia/demo-web-app.git'
                script {
                    // sh 'printenv'
                    sh 'git rev-parse HEAD > .git/commit-id'
                }
            }
        }
        
        stage('Test') {
            steps {
                withDockerContainer(image: 'node:8.9.3-alpine') {
                    sh 'yarn install'
                    // sh 'printenv'
                    script {
                        commit_id = readFile('.git/commit-id')
                    }
                    echo "COMMIT ID: ${commit_id}"
                    // TODO add unit tests
                    // sh 'npm test'
                }
            }
        }

        stage('Build') {
            steps {
                echo "Git commit ID: ${commit_id}"
                script {
                    // the ${commit_id} tag seems to chop off anything trailing, so we build and tag seperately
                    sh 'docker build -t viseo/demo-web-app .'
                    sh "docker tag viseo/demo-web-app local.dtr/viseo/demo-web-app:${commit_id}"
                    sh "docker tag viseo/demo-web-app local.dtr/viseo/demo-web-app:latest"
                }
            }
        }

        stage('Push') {
            steps {
                withDockerRegistry(url: 'https://local.dtr', credentialsId: 'dtr-credentials') {
                    // latest tag is not auto, so need to push twice - each layer is uploaded only once though (no double upload)
                    sh "docker push local.dtr/viseo/demo-web-app:${commit_id}"
                    sh "docker push local.dtr/viseo/demo-web-app:latest"
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // sh "docker service update demo_web --detach=true --image local.dtr/viseo/demo-web-app:${commit_id}"
                    sh "docker service update demo_web --detach=true --image local.dtr/viseo/demo-web-app:latest"
                }
            }
        }

    }
}
