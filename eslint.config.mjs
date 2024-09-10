// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
)

  .prepend(
  // ...Prepend some flat configs in front
)
  // Override some rules in a specific config, based on their name
  .override('nuxt/typescript', {
    rules: {
      // disable ts rule
      '@typescript-eslint/ban-types': 'off',
      // Enforce single quotes
      'quotes': ['error', 'single'],
    }
  })
