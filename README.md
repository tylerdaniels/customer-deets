# Customer Deets

## Lambda Backend

Located in the `backend` folder, this is a very simple Typescript project built with ESBuild.

Use the following commands to build the lambda locally:

```bash
npm run lint
npm run test
npm run build
```

Final output is stored in the `backend/dist` folder for distribution.

## React Frontend

Located in the `frontend` folder, this is an all-in-one Vite React project.

Use the following commands to build the React locally:

```bash
npm run lint
npm run test
npm run build
```

Statically compiled output is stored in the `frontend/dist` folder for distribution.

Local testing can use the `npm run dev` for simplicity.

## Deployment Pipeline

The AWS Deployment pipeline is in the `tf-deploy-pipeline` and uses Terraform and the AWS CLI
to automatically create the CodePipeline and CodeBuild projects.

Unfortunately due to enviromental issues I have been unable to test these in AWS (something about
not being able to validate my payment method and therefore not being allowed to run CodeBuild).

To get around this within the limited timeframe available I've created a very simple `express`
app in the `local` folder which can run the distributed files using `npm run dev` so I'm not blocked.

Due to these issues I cannot complete the Terraform CI/CD portion of the assignment.
