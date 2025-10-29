/**
 * Utility functions cho game Phaser.
 * Cung cấp các hàm tiện ích để tạo collider và tính toán kích thước game.
 */
import { GameObjects } from 'phaser';

/**
 * Tạo một collider tương tác (hình chữ nhật) cho game.
 * Dùng để tạo vùng va chạm cho dialog, teleport, item, v.v.
 * @param {Phaser.Scene} scene - Scene hiện tại
 * @param {number} x - Tọa độ X
 * @param {number} y - Tọa độ Y
 * @param {number} width - Chiều rộng
 * @param {number} height - Chiều cao
 * @param {string} name - Tên định danh cho collider
 * @param {boolean} isDebug - Hiển thị màu debug (hồng) nếu true
 * @param {{x:number,y:number}} origin - Điểm gốc (0,0 = góc trên trái, 0.5,0.5 = giữa)
 * @returns {Phaser.GameObjects.Rectangle} Collider đã tạo
 */
export const createInteractiveGameObject = (
    scene,
    x,
    y,
    width,
    height,
    name,
    isDebug = false,
    origin = { x: 0, y: 1 }
) => {
    const customCollider = new GameObjects.Rectangle(
        scene,
        x,
        y,
        width,
        height
    ).setOrigin(origin.x, origin.y);
    customCollider.name = name;
    customCollider.isCustomCollider = true;

    if (isDebug) {
        customCollider.setFillStyle(0x741B47);
    }

    scene.physics.add.existing(customCollider);
    customCollider.body.setAllowGravity(false);
    customCollider.body.setImmovable(true);

    return customCollider;
};

/**
 * Tính toán kích thước game phù hợp với màn hình.
 * Tự động scale theo tỷ lệ màn hình và làm tròn theo tile 16x16.
 * @returns {{width:number,height:number,multiplier:number}} Kích thước và hệ số phóng to
 */
export const calculateGameSize = () => {
    let width = 400;
    let height = 224; // 16 * 14 = 224
    const multiplier = Math.min(Math.floor(window.innerWidth / 400), Math.floor(window.innerHeight / 224)) || 1;

    if (multiplier > 1) {
        width += Math.floor((window.innerWidth - width * multiplier) / (16 * multiplier)) * 16;
        height += Math.floor((window.innerHeight - height * multiplier) / (16 * multiplier)) * 16;
    }

    return { width, height, multiplier };
};
