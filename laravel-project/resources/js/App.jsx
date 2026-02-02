import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../css/app.css';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: title => (title ? `${title} - ${appName}` : appName),
  resolve: name =>
    resolvePageComponent(
      [`./pages/${name}.tsx`, `./pages/${name}.jsx`],
      import.meta.glob('./pages/**/*.{tsx,jsx}')
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(
      <StrictMode>
        <App {...props} />
      </StrictMode>
    );
  },
  progress: { color: '#4B5563' },
});
