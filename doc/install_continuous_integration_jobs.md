## Setup Continous Integration - Jobs

## Job: Demo Web App

1. Create a new job: *Jenkins* > *New Item* >
    - Name: demo-web-app
    - Select 'Pipeline' for type
    - Click 'OK'
4. Scroll down to **Pipeline** and select *Pipeline script from SCM* for the Definition
    - Select *Git* for the **SCM**
    - Repository URL = *https://github.com/viseo-asia/demo-web-app.git*
    - Click **Save**
5. Click **Build Now**
