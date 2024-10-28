/**
 * 单向链表是由多个子节点构成的数据结构，每个子节点包括
 * 1. 本身的属性值
 * 2. 指向下一个节点的引用地址
 * 3. 指向上一个节点的引用地址（双向链表）
 */

/**
 * CRUD：	create、read、update、delete（英语单词）
 * 增加：append、prepend、insert、concat
 * 查询：find、findIndex、findLast、at、slice、has
 * 更新：reverse、
 * 删除：delete
 *
 *
 * 遍历：forEach、map、every、some、reduce、filter
 * 特殊：join、set、toString、values、valueOf
 * 属性：size
 *
 *
 * 1. 数据结构
 * LinkNode {
 * 		value: any,
 *		next: LinkNode
 * }
 * 2. 增加 -> 删除 -> 查询 -> 更新 -> 遍历 -> 特殊 -> 属性
 *
 */

class LinkNode {
	constructor(value) {
		this.value = value;
		this.next = null;
	}
}
