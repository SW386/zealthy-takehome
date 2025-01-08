# Zealthy Take Home Assigment

The app has a React frontend bootstrapped with vite. The backend
is python based with a flask app and sqlite database.


We have a single dockerfile for running the app and for deployment
purposes. The docker image is responsible for serving the frontend,
hosting the backend, and persisting data to the database. This was
done to complete the project. The drawbacks are if the docker image is
recreated for any reason, all stored data is lost.For a better CI/CD 
experience, it would be better to separate each component of the app
with its own container.

## Building the Container

You can build the container with
```
docker build -t zealthy . --build-arg BACKEND_URL='<YOUR URL>'
```
The dockerfile has an optional url input argument to indicate where
the frontend should go to communicate with the backend. By default,
it will assume `localhost:5001`.

After the container is built, you can run it with 
```
docker run -d -p 5001:5001 zealthy
```

A live demo can be found here: `http://zealthy-1854096361.us-east-2.elb.amazonaws.com/`