# ts-repl-pokedex

npm init -y to create a new Node.js project. \
Used npm install -D typescript @types/node to install TypeScript along with types for node.\
Created a tsconfig.json file and used a provided template.\

rootDir is where your TypeScript files are located\
outDir is where your compiled JavaScript files will go (you won't modify these - they're generated from your TypeScript files)\
include specifies the files to include in the compilation\
exclude specifies the files to exclude from the compilation\
strict enables all strict type checking options\
esModuleInterop allows you to use ES module syntax\
moduleResolution specifies how modules are resolved\
skipLibCheck skips type checking all declaration files\
baseUrl allows you to use paths relative to the project root\
npx command allows us to run the tsc command without installing TypeScript globally.

Performed npm install -D vitest for unit testing. Added "test": "vitest --run" to package.json within scripts.\
You can use npm run dev | tee repl.log to run the repl and log the output to a file. This uses the stdout to log the output.