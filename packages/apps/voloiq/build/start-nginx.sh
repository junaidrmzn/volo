#!/usr/bin/env sh

ENV_VARIABLES_FOR_SUBSTITUTION="\$BACKEND_BASE_URL,\$ANALYTICS_APP_URL,\$VOLOCITY_ANALYTICS_APP_URL,\$WEATHER_APP_URL,\$WEATHER_LIVE_APP_URL,\$WEATHER_FORECAST_APP_URL,\$BATTERY_DASHBOARD_URL,\$FLAGSMITH_BASE_URL,\$FLAGSMITH_ENVIRONMENT_ID,\$MICROFRONTEND_BASE_URL,\$FEEDBACK_URL"

for file in $1;
do
  envsubst $ENV_VARIABLES_FOR_SUBSTITUTION < $file > tmp && mv tmp $file
done

# escape and inline JSON and remove surrounding quotes
AUTH_CONFIGURATION=$(echo $AUTH_CONFIGURATION | jq @json | sed -e 's/^"//' -e 's/"$//')
FALLBACK_FEATURE_FLAGS_CONFIGURATION=$(echo $FALLBACK_FEATURE_FLAGS_CONFIGURATION | jq @json | sed -e 's/^"//' -e 's/"$//')
for file in $1;
do
  envsubst "\$AUTH_CONFIGURATION,\$FALLBACK_FEATURE_FLAGS_CONFIGURATION" < $file > tmp && mv tmp $file
done

nginx -g 'daemon off;'
