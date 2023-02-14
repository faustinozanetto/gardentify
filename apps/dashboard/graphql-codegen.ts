import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
  documents: 'src/modules/graphql/**/*.graphql',
  config: {
    scalars: [
      {
        scalar: 'DateTime',
        type: 'Date',
      },
    ],
  },
  generates: {
    'src/modules/graphql/@generated/graphql.tsx': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    },
  },
};

export default config;
