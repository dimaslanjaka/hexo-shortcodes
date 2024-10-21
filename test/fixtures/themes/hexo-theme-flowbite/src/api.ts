import * as cp from "cross-spawn";
import * as path from "upath";

const cwd = path.join(__dirname, "../");
export async function hexoThemeTailwindBuild() {
  await cp.spawnAsync("npm", ["run", "build"], { cwd, stdio: "inherit" });
}
