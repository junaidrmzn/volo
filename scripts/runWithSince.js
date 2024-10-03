const { spawn, execSync } = require("child_process");

const commandArgs = process.argv.slice(2);
const isCi = process.env.TF_BUILD === "True";
const targetBranch = process.env.TARGET_BRANCH;

if (isCi && targetBranch) {
    const gitRevision = execSync(`git merge-base ${targetBranch} HEAD`).toString().trim();
    commandArgs.push("--since", gitRevision.toString());
}

const [command, ...args] = commandArgs;

const ls = spawn(command, args);

ls.stdout.on("data", (data) => {
    process.stdout.write(data);
});

ls.stderr.on("data", (data) => {
    process.stderr.write(data);
});

ls.on("exit", (code) => {
    console.log(`child process exited with code ${code.toString()}`);
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(code);
});
