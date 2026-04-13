import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const isPreviewOnly = mode === 'previewonly';

    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(process.cwd(), 'src'),
          react: path.resolve(process.cwd(), 'node_modules/react'),
          'react/jsx-runtime': path.resolve(process.cwd(), 'node_modules/react/jsx-runtime.js'),
          'react-dom': path.resolve(process.cwd(), 'node_modules/react-dom'),
          'lucide-react': path.resolve(process.cwd(), 'node_modules/lucide-react'),
        }
      },
      build: isPreviewOnly
        ? {
            outDir: 'previewonly',
            emptyOutDir: true,
            rollupOptions: {
              input: path.resolve(process.cwd(), 'preview.html')
            }
          }
        : {
            rollupOptions: {
              input: {
                main: path.resolve(process.cwd(), 'index.html'),
                preview: path.resolve(process.cwd(), 'preview.html')
              }
            }
          }
    };
});

