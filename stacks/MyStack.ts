import path = require("path");
import { StackContext, Function } from "sst/constructs";
import { build } from "tsup";

export function API({ stack }: StackContext) {
  const lambda = new Function(stack, "Lambda", {
    runtime: "container",
    handler: "packages/functions/src",
    hooks: {
      async beforeBuild(props, out){
        await build({
          entry: [props.handler! + "/*.ts"],
          outDir: path.join(out, "dist"),
          // 👇 this also doesn't work the first time, needed to run build twice  
          // outDir: path.join(props.handler!, "dist"),
          format: "esm",
          target: "node18",
          clean: true
        });
      }
    }
  });
}
