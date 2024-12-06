export const ServerConfig = {
  ApiVersion: '/api/v1',
  Host: '0.0.0.0',
  Port: 3000,
  DocumentationRoute: '/docs',
  RateLimitConfig: { windowMs: 60 * 1000, maxRequests: 500 } // 500 requests per minute
}
