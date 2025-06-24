import { FrameNet } from "nlptoolkit-framenet/dist/FrameNet.js";
const frameNet = new FrameNet();

export default defineEventHandler(() => {
  const payload = { payload: frameNet.getFrames("yemek") };
  console.log(payload);
  
  return payload;
});
