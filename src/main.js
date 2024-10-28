/**
 * 单向链表是由多个节点构成的数据结构，每个节点包括
 * 1. 本身的属性值
 * 2. 指向下一个节点的引用地址
 * 3. 指向上一个节点的引用地址（双向链表）
 *
 * 链表包括：
 * 1. 头节点的引用地址
 * 2. 链表总长度
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
}