use tauri::{App, Manager};

/// setup
pub fn init(app: &mut App) -> std::result::Result<(), Box<dyn std::error::Error>> {
    let window = app.get_webview_window("main").unwrap();

    // 监听系统主题变化
    window.listen("tauri://theme-changed", move |event| {
        // 发送主题变化事件到前端
        window.emit("theme-changed", event.payload()).unwrap();
    });

    Ok(())
}