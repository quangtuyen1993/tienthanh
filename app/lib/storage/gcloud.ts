import { Storage } from "@google-cloud/storage";
const storage = new Storage({
    keyFilename: "tienthanh-400217-f3896595041b.json",
});
export default storage;