## Luồng khởi chạy dự án (React + Phaser)

### 1) Cấp React (ứng dụng web)

- **`public/index.html`**: Khung HTML chứa thẻ `div#root` để React gắn ứng dụng vào.
- **`src/index.js`**: Điểm vào của React. File này render `App` vào `#root`.

```startLine:endLine:src/index.js
L7:ReactDOM.render(
L8:  <React.StrictMode>
L9:    <App />
L10:  </React.StrictMode>,
L11:  document.getElementById('root')
L12:);
```

- **`src/App.js`**: Khởi tạo game Phaser trong `useEffect` đầu tiên. Tại đây cấu hình kích thước, plugins, và danh sách các Scene.

```startLine:endLine:src/App.js
L135:  useEffect(() => {
L136:    const game = new Phaser.Game({
L150:      scene: [
L151:        BootScene,
L152:        MainMenuScene,
L153:        GameScene,
L154:        GameOverScene,
L155:      ],
L169:    });
L171:    window.phaserGame = game;
L172:  }, []);
```

Tóm lại: Trình duyệt tải `index.html` → React chạy `src/index.js` → render `App` → `App` khởi tạo `Phaser.Game` với các Scene.

---

### 2) Cấp Phaser (vòng đời Scene)

Thứ tự Scene được đăng ký trong `App` là: `BootScene` → `MainMenuScene` → `GameScene` → `GameOverScene`.

#### BootScene
- File: `src/game/scenes/BootScene.js`
- Nhiệm vụ: hiển thị thanh tải (loading), nạp toàn bộ tài nguyên (maps, atlas, images...). Khi hoàn tất chuyển sang MainMenu.

```startLine:endLine:src/game/scenes/BootScene.js
L168:    create() {
L169:        this.scene.start('MainMenuScene');
L170:    }
```

#### MainMenuScene
- File: `src/game/scenes/MainMenuScene.js`
- Nhiệm vụ: dựng nền/Logo, bắn sự kiện menu lên React để hiển thị lựa chọn. Khi người chơi chọn "start", chuyển sang GameScene với trạng thái khởi tạo ban đầu (vị trí hero, máu, đồ đạc, map xuất phát...).

```startLine:endLine:src/game/scenes/MainMenuScene.js
L35:                case 'start': {
L36:                    this.scene.start('GameScene', {
L37:                        heroStatus: {
L38:                            position: { x: 4, y: 3 },
L42:                            health: 60,
L47:                            haveSword: false,
L48:                        },
L49:                        mapKey: 'home_page_city_house_01',
L50:                    });
L51:                    break;
L52:                }
```

#### GameScene
- File: `src/game/scenes/GameScene.js`
- Nhiệm vụ: gameplay chính (điều khiển nhân vật, hoạt ảnh, va chạm, teleport, NPC, chiến đấu, nhặt vật phẩm...). Khi thỏa điều kiện thua cuộc hoặc hoàn tất logic tương ứng, Scene này sẽ điều phối sang `GameOverScene` (việc chuyển cảnh được thực hiện từ trong `GameScene`).

#### GameOverScene
- File: `src/game/scenes/GameOverScene.js`
- Nhiệm vụ: hiển thị màn hình Game Over và gửi menu lựa chọn lên React. Người chơi có thể chọn "retry" để quay lại `MainMenuScene` hoặc "exit" để tải lại trang.

```startLine:endLine:src/game/scenes/GameOverScene.js
L45:                case 'game.game_over.retry': {
L46:                    this.scene.start('MainMenuScene');
L47:                    break;
L48:                }
```

---

### 3) Tương tác giữa Phaser và React

- React hiển thị UI phụ trợ (hộp thoại, menu, HUD máu/coin) dựa trên các sự kiện `CustomEvent` do các Scene bắn lên `window`.
- `App.js` lắng nghe các sự kiện như: `new-dialog`, `menu-items`, `hero-health`, `hero-coin` và cập nhật React state để render UI tương ứng.
- Khi người chơi chọn mục menu trong UI React, React bắn lại sự kiện `menu-item-selected` để Scene hiện tại xử lý (ví dụ: bắt đầu game, thoát...).

---

### 4) Tóm tắt nhanh
- File chạy đầu tiên ở runtime: **`src/index.js`** (render `App`).
- `App` khởi tạo **`Phaser.Game`** với thứ tự Scene: `BootScene` → `MainMenuScene` → `GameScene` → `GameOverScene`.
- `BootScene` nạp tài nguyên rồi chuyển sang `MainMenuScene`.
- `MainMenuScene` hiển thị menu; chọn "start" → sang `GameScene` với dữ liệu khởi tạo ban đầu.
- `GameScene` điều khiển gameplay và sẽ gọi `GameOverScene` khi thua cuộc.
- Giao tiếp giữa Game và UI dùng `CustomEvent` trên `window`.


