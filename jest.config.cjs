/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  rootDir: './',
  moduleNameMapper: {
    '^@/(.*)$': '../src/$1',

  },
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      diagnostics: true,
      tsconfig: './tsconfig.json',
      // tsconfig: {
      //   module: 'nodenext',
      //   moduleResolution: 'bundler',
      //   target: 'es2020',
      // },
      useESM: true,
      compiler: 'typescript',
    }]
  }
}
