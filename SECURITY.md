# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in the Splitlier Backend:

1. Do **not** disclose it publicly.
2. Email the details to: `naskret.kamiL@gmail.com`
3. Include reproduction steps and potential impact.

## Response Time

- Acknowledgement: within 48 hours
- Remediation plan: within 7 days
- Patch release: typically within 30 days, depending on severity

## Scope

- API endpoints
- Authentication and authorization
- Data storage
- Server configuration

## API Rate Limiting

To protect against abuse, the API is rate-limited:

- **Production**: 15 requests per minute per IP address
- **Development**: relaxed limits for testing
- Excess requests return a `429 Too Many Requests` response

If you require higher limits (e.g., for trusted integrations), please contact `naskret.kamil@gmail.com`.
