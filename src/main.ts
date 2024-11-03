/**
 * 名称： 俄罗斯方块游戏
 *
 * 功能：（游戏角度）
 *    移动方块
 *    旋转方块
 *    渲染方块
 *    创建方块
 *    消除行
 *    碰撞检测
 *
 * 流程：（用户交互角度）
 *    开始游戏
 *    监听用户的键盘方向键事件
 *        控制方块移动和旋转
 *        渲染方块
 *    创建计时器
 *        判断当前游戏状态
 *            生成中
 *              判断是否有完整行
 *                  True: 消除当前完整行
 *              生成不同形态的方块组合，将当前游戏状态改为【移动中】
 *            移动中
 *                方块下落
 *                当方块底部接触到东西
 *                    判断方块是否超出规定区域
 *                        True: 将当前游戏状态改为【结束】, 清除计时器
 *                        False: 将当前游戏状态改为【生成中】
 *        渲染方块
 *    卸载监听事件
 *    游戏结束、记录分数
 *
 * 形状：
 *  L  J
 *  S  Z
 *  I  O  T
 */

interface Block {
	x: number;
	y: number;
}

interface Shape {
	data: Block[];
	direction: number;
	status: 'move' | 'end';
}

interface GameInfo {
	data: (Block | null)[][];
	status: 'moving' | 'end' | 'create';
	score: number;
}

const gameInfo: GameInfo;

let currShape: Shape;

/** 创建形状 */
function createShape(): Shape;

/** 移动方块 */
function move(direction: 'left' | 'right' | 'down'): void;

/** 旋转方块 */
function rotate(): void;

/** 碰撞检测 */
function checkNoMove(type: 'down' | 'top' | 'left' | 'right' = 'down'): boolean;

/** 旋转检测 */
function checkNoRotate(): boolean;

/** 渲染 */
function render(): void;

/** 消除行 */
function removeRow(index: number): void;

/** 获取完整行 */
function getFullRows(): number[];

window.addEventListener('keypress', () => {
	// 移动
	if (!(checkNoMove(/** 方向 */))) move(/** 方向 */);
	// 旋转
	if (!checkNoRotate()) rotate();
	render();
});

let timer = setInterval(() => {
	if (gameInfo.status === 'create') {
		const rows = getFullRows();
		if (rows.length) {
			for (const row of rows) {
				removeRow(row);
			}
		}
		createShape();
		gameInfo.status = 'moving';
	} else {
		move('down');
		if (checkNoMove()) {
			if (checkNoMove('top')) {
				clearInterval(timer);
				gameInfo.status = 'end';
				// 记录分数等
			}
			gameInfo.status = 'create';
		}
	}
});

import { curry } from '@cmtlyt/base';

const temp = curry((a: number, b: string, c: boolean, d: number[]): boolean => {});

const a = temp()(1, '2')(true);

const b = a([1]);

const routes = [
	{
		path: '',
		component: () => import('@/index.html'),
		children: [],
	},
];

{
	flag ? (
		<a />
	) : ();
}

<show if={flag}>
	<a />
</show>;
