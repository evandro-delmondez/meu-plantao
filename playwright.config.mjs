import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  timeout: 60_000,
  fullyParallel: true,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: { trace: "retain-on-failure" },
  projects: [
    { name: "computador", use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 900 } } },
    { name: "celular", use: { ...devices["Desktop Chrome"], viewport: { width: 390, height: 844 }, hasTouch: true }, testMatch: /(layout|feridas|medicacoes|site|navegacao|sala-vermelha|eletrolitos-qt|pcr|agora|conexoes|atendimento|porta|receita)\.spec\.mjs/ },
  ],
  webServer: { command: "node scripts/serve.mjs", url: "http://localhost:4173", reuseExistingServer: !process.env.CI },
});
