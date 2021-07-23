import glob from "glob";
import fs from "fs";
import proc from "child_process";

const csvFormat = /\r?\n(.*),(.*)\r?\n/g

const keys: RegExpMatchArray | null = csvFormat.exec(fs.readFileSync(glob.sync("**/*.csv")[0] || "No csv file!").toString());

if(!keys)
    throw Error("CSV format invalid.");

const awsKeyID: string = keys[1];
const awsKey: string = keys[2];
const child: proc.ChildProcess = proc.exec("npx serverless deploy -s dev", {

    env: {

        ...process.env,
        AWS_ACCESS_KEY_ID: awsKeyID,
        AWS_SECRET_ACCESS_KEY: awsKey

    }

}, (err: proc.ExecException | null, stdout: string | Buffer, stderr: string | Buffer) => {

    if(err)
        console.error(err);

    if(stdout)
        console.log(stdout.toString());

    if(stderr)
        console.error(stderr.toString());

});
