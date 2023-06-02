# AMPLIFY + AWS SAM APPLICATION

Hello! Welcome to the Amplify + AWS SAM Full Stack Application project.

This project is aimed at providing a comprehensive guide and structure to build a full-stack application using AWS Amplify and AWS Serverless Application Model (SAM). We leverage the powerful features of these services to create a scalable, secure, and easily maintainable web application.

## About the project

AWS Amplify enables developers to develop and deploy cloud-powered mobile and web applications. It includes a broad set of tools and services that can create scalable, full stack applications, with a focus on simplicity and ease of use.

AWS Serverless Application Model (SAM) is an open-source framework for building serverless applications. It extends AWS CloudFormation to provide a simplified way of defining the Amazon API Gateway APIs, AWS Lambda functions, and Amazon DynamoDB tables needed by your serverless application.

The combination of Amplify and AWS SAM allows developers to rapidly build and scale applications without worrying about managing servers. This project provides a ready-to-use template to bootstrap your next full stack application.

## Project structure

The project is divided into two main sections:

1. Frontend (Amplify): This is where we design our user interfaces, authenticate users, manage user state, and interact with our backend resources. The frontend part is handled by AWS Amplify. [https://github.com/Ethanlloyd21/amplify-sam-app]

2. Backend (AWS SAM): This includes serverless functions (Lambda), API endpoints (API Gateway), and data storage (DynamoDB). The backend is managed using AWS SAM. [https://github.com/Ethanlloyd21/amplify-sam-app-backend]

## Pre-requisite:
1. Install Node.js. Node version 18 was the latest when this project was created. [https://nodejs.org/en]
2. AWS account [https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-creating.html]
3. Install AWS CLI using your command prompt [https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html#getting-started-install-instructions]
4. Install AWS SAM using your command prompt [https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html]
5. Install Docker (optional)

## Front End code
This project is to show the viewers how to create a full stack application using Amplify and SAM. For simplicity I will be copying the front end of my old project serverless-no-iac [https://github.com/Ethanlloyd21/serverless-no-iac] using create-react-app. 

### Let's create the front end using create-react-app
1. Create a front end app using create-react-app with the template typescript
```bash
npx create-react-app frontend --template typescript
```

2. Lets install some dependencies. 
Ant Design and Ant Design icons: This will be our table and form design
```bash
npm install antd @ant-design/icons 
```

Axios: a JavaScript library that we will use to fetch from our API
```bash
npm install axios
```

3. From the src folder create 2 folders 'components' and 'api'
4. From the src/api folder create a file name 'apiEndPoint.ts' and paste the following code:
```bash
import axios from "axios";
import { Item } from "../components/Home";

const apiInventory = `${process.env.REACT_APP_ENDPOINT}inventory`; //link from the .env file

const apiHealthCheck = `${process.env.REACT_APP_ENDPOINT}check`; //link from the .env file

const apiCars = `${process.env.REACT_APP_ENDPOINT}car`; //link from the .env file

//function to generate random ID:
const id = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const getInventory = () => {
  axios
    .get(apiInventory)
    .then((response) => {
      return response.data.inventory;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const healthCheck = () => {
  axios
    .get(apiHealthCheck)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getCar = () => {
  axios
    .get(apiCars)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const postCar = (value: Item) => {
  axios
    .post(
      apiCars,
      {
        model: value.model,
        maker: value.maker,
        engineCyl: value.engineCyl,
        rating: value.rating,
        mpgHighway: value.mpgHighway,
        year: value.year,
        id: id(),
        mpgCity: value.mpgCity,
        mpgCombined: value.mpgCombined,
        engineSize: value.engineSize,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const putCar = (value: Item) => {
  axios
    .post(
      apiCars,
      {
        model: value.model,
        maker: value.maker,
        engineCyl: value.engineCyl,
        rating: value.rating,
        mpgHighway: value.mpgHighway,
        year: value.year,
        id: value.id,
        mpgCity: value.mpgCity,
        mpgCombined: value.mpgCombined,
        engineSize: value.engineSize,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteCar = async (id: string) => {
  const data = JSON.stringify({
    id: id,
  });

  const config = {
    method: "delete",
    url: apiCars,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};
```

