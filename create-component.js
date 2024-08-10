const fs = require('fs');
const path = require('path');

const componentName = process.argv[2];

if (!componentName) {
  console.error('Please provide a component name.');
  process.exit(1);
}

const srcDir = path.join(__dirname, 'src');
const componentDir = path.join(srcDir, componentName);

if (!fs.existsSync(srcDir)) {
  console.error('Directory "src" does not exist.');
  process.exit(1);
}

if (fs.existsSync(componentDir)) {
  console.error(`Directory ${componentName} already exists.`);
  process.exit(1);
}

fs.mkdirSync(componentDir);

// index.ts
fs.writeFileSync(
  path.join(componentDir, 'index.ts'),
  `export { default } from './${componentName}';\n`,
);

// ComponentName.tsx
fs.writeFileSync(
  path.join(componentDir, `${componentName}.tsx`),
  `import React from 'react';
import * as S from './${componentName}.style.tsx';

const ${componentName}: React.FC = () => {
  return <div>${componentName}</div>;
};

export default ${componentName};
`,
);

// ComponentName.style.tsx
fs.writeFileSync(
  path.join(componentDir, `${componentName}.style.tsx`),
  `// Styles for ${componentName}
import styled from 'styled-components';

export const Styled${componentName} = styled.div\`
  // Add your styles here
\`;
`,
);

// ComponentName.test.tsx
fs.writeFileSync(
  path.join(componentDir, `${componentName}.test.tsx`),
  `import React from 'react';
import { render } from '@testing-library/react';
import ${componentName} from './${componentName}';

test('renders ${componentName}', () => {
  render(<${componentName} />);
});
`,
);

console.log(
  `Component ${componentName} created successfully in src/${componentName}`,
);
