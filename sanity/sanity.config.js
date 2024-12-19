import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import schema from "./schemas/schema";

export default defineConfig({
  name: "olafyang-photography-site",
  title: "olafyang-photography-site",
  projectId: "c747b643",
  dataset: "production",
  plugins: [structureTool()],
  schema: {
    types: schema,
  },
});
