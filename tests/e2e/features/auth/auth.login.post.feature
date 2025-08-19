Feature: User Authentication

  Scenario: Successful login
    Given the API is running
    When I send a "POST" request to "/auth/login" with body:
      """
      {
        "email": "alice.doe@example.com",
        "password": "MySecretPass123!"
      }
      """
    Then the response status code should be 201
    And the response body should contain "access_token" 