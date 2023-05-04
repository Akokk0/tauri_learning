// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::{Arc, Mutex};
use tauri::State;

#[derive(Default)]
struct Counter(Arc<Mutex<i32>>);

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// invoke hello world
#[tauri::command]
fn hello(msg: String) -> String {
    println!("called this function");
    format!("Hello {}, You are working with tauri", msg)
}

#[tauri::command]
fn add_two(num: i32, count: State<Counter>) -> String {
    // println!("called this function");

    let mut number = count.inner().0.lock().unwrap();
    *number += num;
    format!("{}", number)
}

fn main() {
    tauri::Builder::default()
        .manage(Counter::default())
        .invoke_handler(tauri::generate_handler![hello, add_two])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
