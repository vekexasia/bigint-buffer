/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  rootDir: './',
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      diagnostics: true,
      // tsconfig: './tsconfig.json',
      tsconfig: {
        module: 'nodenext',
        moduleResolution: 'node16',
        target: 'es2020',
      },
      compiler: 'typescript',
    }]
  }
}
