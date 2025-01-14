/**
 * 单向链表是由多个节点构成的数据结构，每个节点包括
 * 1. 本身的属性值
 * 2. 指向下一个节点的引用地址
 * 3. 指向上一个节点的引用地址（双向链表）
 *
 * 链表包括：
 * 1. 头节点的引用地址
 * 2. 链表总长度
 *
 * (可选) 实例属性私有化
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
 * 1. 数据结构
 * LinkNode {
 * 		value: any,
 *		next: LinkNode
 * }
 * 2. 增加 -> 删除 -> 查询 -> 更新 -> 遍历 -> 特殊 -> 属性
 *
 */

/**
 * 节点
 */
class LinkNode {
	constructor(value) {
		this.value = value;
		this.next = null;
	}
}

const EMPTY = Symbol('');
/**
 * 链表
 */

class LinkList {
	constructor() {
		this.head = null;
		this.size = 0;
	}

	/**
	 * 在链表尾部添加新节点
	 */
	append(value) {
		// 创建一个新的节点
		// 当前头节点是否为空？ 空：头节点指向新节点 ;
		//                    非空： 找到最后一个节点，将该节点的 next 指向新节点
		// 链表长度加一

		const linkNode = new LinkNode(value);
		if (!this.head) {
			this.head = linkNode;
		} else {
			let current = this.head;
			while (current.next) {
				current = current.next;
			}
			current.next = linkNode;
		}
		this.size++;
	}

	/**
	 * 在链表头部添加节点
	 */
	prepend(value) {
		// 创建一个新的节点
		// 当前头节点是否为空？ 空：头节点指向新节点 ;
		//                    非空：将新节点的 next 指向当前的头部节点，头部节点赋值为新的节点
		// 链表长度加一

		const linkNode = new LinkNode(value);
		if (!this.head) {
			this.head = linkNode;
		} else {
			linkNode.next = this.head;
			this.head = linkNode;
		}
		this.size++;
	}

	/**
	 * 在链表的指定位置中插入节点
	 */
	insert(value, pos) {
		// 判断插入位置不能为负数，抛出异常
		// 创建一个新的节点
		// 判断插入位置大于等于链表长度
		//        true: 先在链表添加(pos - size) 个空节点，将新节点 append
		//        false: 找到 pos - 1 的节点，判断 (pos - 1) 的 next 是否为空属性
		//                      true:  pos 的值改为新值
		//                      false: 将 pos - 1 的next 改为新节点，新节点的 next 改为 pos
		//链表长度加一
		//
		if (pos < 0) {
			throw new Error('插入位置不能为负数');
		}
		const linkNode = new LinkNode(value);
		if (pos >= this.size) {
			for (let i = 0; i < pos - this.size; i++) {
				this.append(EMPTY);
			}
			this.append(value);
		} else {
			let posPrevNode = this.head;
			for (let i = 0; i < pos - 1; i++) {
				posPrevNode = posPrevNode.next;
			}
			const posNode = posPrevNode.next;
			if (posNode.value === EMPTY) {
				posNode.value = value;
			} else {
				posPrevNode.next = linkNode;
				linkNode.next = posNode;
			}
		}
		this.size++;
	}

	/**
	 * 拼接两个链表
	 */
	concat(...links) {
		// 记录当前链表尾部的节点-current
		// 循环遍历 links:
		//        判断当前 link 是否为链表：
		//            True:
		//                将 current 的 next 指向当前遍历到的 link 的头部节点
		//                current 赋值为 link 的尾部节点
		//            False:
		//                新建一个新节点，将 current 的 next 指向新节点，current 赋值为新节点

		let current = this.head;
		while (current.next) {
			current = current.next;
		}
		for (const link of links) {
			// concat 在链表里面，只处理链表类型，只有链表和非链表类型，非链表类型的处理方式就是节点
			if (link instanceof LinkList) {
				current.next = link.head;
				while (current.next) {
					current = current.next;
				}
				this.size += link.size;
			} else {
				const linkNode = new LinkNode(link);
				current.next = linkNode;
				current = linkNode;
				this.size++;
			}
		}
	}
	/**
	 * 根据条件查找符合要求的第一个节点的值
	 */
	find(callback) {
		/**
		 *
		 * 不断往下遍历节点的value值
		 *   传入callback查询是否符合条件
		 *     True: 返回当前值
		 *
		 */

		let currentNode = this.head;
		while (currentNode) {
			if (currentNode.value !== EMPTY && callback(currentNode.value))
				return currentNode.value;
			currentNode = currentNode.next;
		}
		return null;

		//    while(currentNode.value){

		//      if(!callback(currentNode.value)){
		//         currentNode=currentNode.next;
		//      }
		//    }
	}

	/**
	 * 根据条件查找符合要求的第一个节点的位置
	 */
	findIndex(callback) {
		/**
		 * 存储当前下标和头节点
		 * 从头节点开始，当当前节点不为空
		 * 将当前节点的值和下标传入 callback 进行判断
		 *   T: 返回当前下标
		 *   F: 继续向下遍历
		 * 如果一直没找到，返回 -1
		 */
		let currentPos = 0;
		let currentNode = this.head;
		while (currentNode) {
			if (currentNode.value !== EMPTY && callback(currentNode.value, currentPos)) {
				return this.currentPos;
			}
			currentNode = currentNode.next;
			currentPos++;
		}
		return -1;
	}

	/**
	 * 根据条件查找返回符合要求的最后一个节点
	 */
	findLast(callback) {
		/**
		 * 翻转链表
		 * 遍历节点的value值
		 *   传入callback查询是否符合条件
		 *     True: 将结果更新
		 * 翻转链表
		 * 返回结果
		 *
		 */

		this.reverse();
		let currentNode = this.head;
		while (currentNode) {
			if (currentNode.value !== EMPTY && callback(currentNode.value)) {
				this.reverse();
				return currentNode.value;
			}
			currentNode = currentNode.next;
		}
		this.reverse();
		return undefined;
	}

	/**
	 * 根据条件查找返回符合要求的最后一个节点的索引
	 */
	findLastIndex(callback) {
		this.reverse();
		let currentCount = 0;
		let currentNode = this.head;
		while (currentNode) {
			currentCount++;
			if (currentNode.value !== EMPTY && callback(currentNode.value)) {
				this.reverse();
				return this.size - currentCount;
			}
			currentNode = currentNode.next;
		}
		this.reverse();
		return -1;
	}

	/**
	 * 翻转链表并返回当前对象引用
	 */
	reverse() {
		/**
		 * 从头遍历链表，用数组存储当前节点的值
		 * 从头遍历链表，头节点的值从数组末尾获取
		 */

		let currentNode = this.head;
		let arr = [];
		while (currentNode) {
			arr.push(currentNode.value);
			currentNode = currentNode.next;
		}
		currentNode = this.head;
		while (currentNode) {
			currentNode.value = arr.pop();
			currentNode = currentNode.next;
		}
		return this;
	}
}
