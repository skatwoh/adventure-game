/**
 * Các hằng số cấu hình cho game.
 * Chứa thời gian, chỉ số tile, loại AI và các giá trị cố định.
 */

// Thời gian hiệu ứng (ms)
export const SCENE_FADE_TIME = 300; // Thời gian fade in/out giữa các scene
export const ATTACK_DELAY_TIME = 50; // Độ trễ trước khi tấn công có hiệu lực

// Chỉ số tile trong tileset
export const BUSH_INDEX = 428; // Tile bụi cây có thể chặt
export const BOX_INDEX = 427; // Tile hộp có thể đẩy
export const COIN_INDEX = 192; // Tile coin
export const HEART_CONTAINER_INDEX = 233; // Tile container tăng máu tối đa

// Loại di chuyển của NPC
export const NPC_MOVEMENT_RANDOM = 'random'; // Di chuyển ngẫu nhiên
export const NPC_MOVEMENT_STILL = 'still'; // Đứng yên

// Loại AI của kẻ địch
export const ENEMY_AI_TYPE = 'follow'; // AI đuổi theo hero

// Key lưu trữ dữ liệu game
export const SAVE_DATA_KEY = 'pablogg_game_data'; // Key trong localStorage
