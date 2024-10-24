import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'neoapp',
  webDir: 'www',
  bundledWebRuntime: false // evita usar el runtime web embebido
};

export default config;
