# ManchesterMarketsAutomation
Automation project for Manchester licensing

# Project Setup guide

Follow these steps to set up and run tests after cloning the repository:

1. Clone the repository :
   git clone <your-repo-url>
   cd <repo-folder>

2. Make sure Node.js is installed (v16+) :
   node -v
   npm -v

3. Install project dependencies : 
   npm install

4. Install Playwright browsers : 
   npx playwright install
   (Optional: to install only Chromium: npx playwright install chromium)

5. Verify TypeScript is installed :
   npx tsc --version

6. Install typescript definition file:
   npm install --save-dev @types/node

7. Install node.js library dotenv:
   npm install dotenv

8. Run all tests :
   npx playwright test

9. Run a specific test file :
   npx playwright test tests/example.spec.ts

10. Open HTML test report :
   npx playwright show-report

11. Debug tests (step-through mode) :
   npx playwright test --debug

Notes:
- Keep the project outside OneDrive to avoid browser download issues.
- node_modules folder is excluded from the repository; npm install will recreate it.

