import esbuild from "esbuild";
import sveltePlugin from "esbuild-svelte";

let ctx=await esbuild
.context({
    entryPoints: ["src/index.ts"],
    mainFields: ["svelte", "browser", "module", "main"],
    external:[],
    bundle: true,
    //minify :true,
    outfile: "dist/index.js",
    plugins: [sveltePlugin()],
    logLevel: "info",
  })
  .catch(() => process.exit(1));
//await ctx.watch();
//   esbuild server cannot random access audio
 await ctx.serve({
      servedir: 'dist',
      port:5090,
      host:"127.0.0.1"
 })