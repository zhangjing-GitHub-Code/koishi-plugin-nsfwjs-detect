import { Argv, Context, Logger, Schema, arrayBufferToBase64 } from 'koishi'

import * as tf from '@tensorflow/tfjs-node'

import * as nsfwjs from 'nsfwjs'
import { Session } from 'koishi'
import { type } from 'os'

export const name = 'nsfwjs-detect'

export interface Config {}

export const Config: Schema<Config> = Schema.object({})

let nmodel: nsfwjs.NSFWJS;
let main_log: Logger;
let apply_ctx:Context;

async function listen_pic(_: Session,next: Function) {
  _.elements.forEach(async (ele)=>{
    console.log(ele);
    console.log(ele.type);
    if(ele.type=='image'){
      let picdata:string=ele["attrs"]["url"];
      if(picdata.startsWith("https")){
        // QQ or others
        let img:ArrayBuffer=await apply_ctx.http.get(picdata,{ responseType: 'arraybuffer' });
        //console.log(img);
        //let arr=new Uint8ClampedArray(img);
        //let imgd=new ImageData(arr,0);
        //console.log(typeof(imgd));
        let tfimg=tf.
        //console.log(arrayBufferToBase64(img));
        //let clret=await nmodel.classify(imgd);
        //if()){
        //  main_log.info(clret+"");
        //}
      }
      //apply_ctx.http.get(ne.url);
      ///if(nmodel.classify(ele))
    }
  })
}

export async function apply(ctx: Context) {
  // write your plugin here
  apply_ctx=ctx;
  main_log=new Logger("nsfwjs-detect");
  main_log.info("Loading modules...");
  nmodel=await nsfwjs.load();
  main_log.debug("Registering Listen middleware...");
  ctx.middleware(listen_pic);
  main_log.info("Plugin register OK!");
}
