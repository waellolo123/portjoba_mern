// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node";



Sentry.init({
  dsn: "https://d5f5cae01d712572791fbc8f710e3c20@o4509246972559360.ingest.de.sentry.io/4509246977867856",
  integrations: [
    Sentry.mongooseIntegration()
  ],

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});


