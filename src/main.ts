import { invoke } from "@tauri-apps/api/tauri";
import "./styles.css"
import {listen} from "@tauri-apps/api/event";

let helloButtonEl: HTMLInputElement | null;
let helloMsgEl: HTMLElement | null;
let clickButton: HTMLElement | null;
let clickDiv: HTMLElement | null;
let keepAlive: HTMLElement | null;

async function greet() {
  // console.log("called this function")
  if (helloButtonEl && helloMsgEl) {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    helloMsgEl.textContent = (await invoke("hello", {
      msg: "Akokko"
    })) as string;
  }

  setTimeout(() => {
    helloMsgEl!.textContent = "Again"
  }, 1000)

}

async function addTwo() {
  console.log("js called addTwo()")
  if (clickDiv) {
    clickDiv.textContent = await invoke("add_two", {
      num: 2
    }) as string
  }
}

window.addEventListener("DOMContentLoaded", () => {
  // Hello组件
  helloButtonEl = document.querySelector("#hello-button");
  // 第二种写法
  /*helloButtonEl = document.querySelector.bind(document)(
      "#hello-button"
  ) as HTMLInputElement*/
  helloMsgEl = document.querySelector("#hello-msg") as HTMLElement;

  helloButtonEl?.addEventListener("click", () => greet());

  /*helloMsgEl?.addEventListener("pointerup", async () => {
    const result = (await invoke("hello")) as string;
    if (helloMsgEl == null) return
    helloMsgEl.textContent = result;
  });*/

  // Click组件
  clickButton = document.querySelector("#click-button")
  clickDiv = document.querySelector("#click-div")

  clickButton?.addEventListener("click", () => addTwo())

  // KeepAlive 组件
  keepAlive = document.querySelector(".keep-alive")
  listen("keep-alive", () => {
    keepAlive?.classList.add("on")
    setTimeout(() => {
      keepAlive?.classList.remove("on")
    }, 2000)
  })

  /*let timer: number | null;

  const appContent = document.querySelector("#hello-msg") as HTMLElement;
  appContent.addEventListener("pointerup", async () => {
    if (timer != null) clearTimeout(timer)
    appContent.textContent = await invoke("hello") as string;
    timer = setTimeout(() => {
      appContent.textContent = "Again";
    }, 1000)
  })*/
});
