import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { CustomWorld, HTTPMethods } from '../support/custom-world';

Given('the API is running', async function (this: CustomWorld) {
  if (!this.app) {
    throw new Error('App is not initialized. Did you forget BeforeAll hook?');
  }
});

When(
  'I send a {string} request to {string}',
  async function (this: CustomWorld, method: HTTPMethods, endpoint: string) {
    await this.sendRequest(method, endpoint);
  },
);

When(
  'I send a {string} request to {string} with body:',
  async function (
    this: CustomWorld,
    method: HTTPMethods,
    endpoint: string,
    docString: string,
  ) {
    let body: Record<string, string> | undefined = undefined;
    if (docString) {
      try {
        body = JSON.parse(docString);
      } catch {
        throw new Error(`❌ Invalid JSON body:\n${docString}`);
      }
    }

    await this.sendRequest(method, endpoint, body);
  },
);

When('I set headers:', function (this: CustomWorld, dataTable: DataTable) {
  const headers: Record<string, string> = {};

  dataTable.rows().forEach(([key, value]: string[]) => {
    headers[key] = value;
  });
  this.setHeaders(headers);
});

Then(
  'the response status code should be {int}',
  function (this: CustomWorld, statusCode: number) {
    this.assertStatus(statusCode);
  },
);

Then(
  'the response body should contain {string}',
  function (this: CustomWorld, key: string) {
    this.assertBodyContains(key);
  },
);

Then(
  'the response body status should be {string}',
  function (this: CustomWorld, expectedStatus: string) {
    if (!this.response) throw new Error('Response not set');
    const actualStatus = this.response.body.status;
    if (actualStatus !== expectedStatus) {
      throw new Error(
        `Expected response body status "${expectedStatus}", but got "${actualStatus}"`,
      );
    }
  },
);
