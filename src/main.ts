import { invoke } from "@tauri-apps/api/tauri";
import "./styles.css"

let helloButtonEl: HTMLInputElement | null;
let helloMsgEl: HTMLElement | null;

async function greet() {
  if (helloButtonEl && helloMsgEl) {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    helloMsgEl.textContent = (await invoke("hello")) as string;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  helloButtonEl = document.querySelector("#hello-button");
  // 第二种写法
  /*helloButtonEl = document.querySelector.bind(document)(
      "#hello-button"
  ) as HTMLInputElement*/
  helloMsgEl = document.querySelector("#hello-msg") as HTMLElement;
  helloButtonEl?.addEventListener("click", () => greet());

  /*helloMsgEl?.addEventListener("pointerup", async () => {
    // const result = (await invoke("hello")) as string;
  });*/

  let timer: number | null;

  const appContent = document.querySelector("#hello-msg") as HTMLElement;
  appContent.addEventListener("pointerup", async () => {
    if (timer != null) clearTimeout(timer)
    appContent.textContent = await invoke("hello") as string;
    timer = setTimeout(() => {
      appContent.textContent = "Again";
    }, 1000)
  })
});
