import * as path from "path";
import moduleAlias, { addAliases } from "module-alias";

const files = path.resolve(__dirname, "../..");

moduleAlias.apply(
  addAliases({
    "@src": path.join(files, "src"),
    "@test": path.join(files, "test"),
  }),
);
