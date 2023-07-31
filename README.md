# kmitl-planner-backend

# How to run
 - set or create .env file
   ```yaml
    PORT=
    CLIENT_ID=
    CLIENT_SECRET=
    CLIENT_URL=
    MONGO_ENDPOINT=
    DB_NAME=
   ```
 - local
   - install package
      ```sh
      npm install
      ```
   - run
     ```sh
     npm start
     ```
 - docker
   - build
   - run

# Routing path
- api (for frontend app to call)
- auth (for calling google auth)
- backend (for backend service app to call)

## Routing API path
- get /subject retrieve all subject data
- post /subject send {subject_name} and retrieve specific subject data
- get /subjectGened retrieve all subject of gened data
- post /subjectGened send {subject_name} and retrieve specific subject of gened data
- post /courseDetail send {curriculumn_id} and retrieve information of curriculumn
- get /type retreive all type of subject
