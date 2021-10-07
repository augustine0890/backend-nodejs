### Serverless Deployment
- Deploy the services
  - `sls deploy --verbose`
- Deploy the function
  - `serverless deploy function -f <func-name>`
- Serverless logs
  - `sls logs -f processAuctions -t`
  - `sls logs -f processAuctions --startTime 1m`
  - `sls invoke -f processAuctions -l`