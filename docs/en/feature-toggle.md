# Feature toggle

The application has a mechanism to enable or disable certain features for users. Before starting the application, an API request is sent for the current features (in our case app don't send real request, just emulating request by using _@mswjs_).

## How to use

There are two available options:

- 1️⃣ Set values in [`src/entities/featureToggle/api/__mocks__/mockFeatureToggleDto.ts`](/src/entities/featureToggle/api/__mocks__/featureToggleHandlers.ts);
- 2️⃣ Or pass actual feature toggle value in request query like `/?{feature}=(true|false)`.

Examples:

- Turn off dark mode: https://nukeapp.netlify.app/?canTurnDarkMode=false
- Turn off sort products: https://nukeapp.netlify.app/?canSortProducts=false

## Available features

| Feature           | Description               | Default Value |
| ----------------- | ------------------------- | ------------- |
| `canTurnDarkMode` | dark mode                 | true          |
| `canSortProducts` | sort products in category | true          |
