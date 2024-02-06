const newNode = (data, left = null, right = null) => {
  return { data, left, right };
};

const tree = (array) => {
  const buildTree = (array) => {
    if (array.length === 1) {
      return array[0];
    }
    if (array.length === 2) {
      const node = newNode(array[0]);
      node.right = newNode(array[1]);
      return node;
    }

    const mid = Math.floor(array.length / 2);
    const node = newNode(array[mid]);
    node.left = buildTree(array.slice(0, mid));
    node.right = buildTree(array.slice(mid + 1, array.length));

    return node;
  };

  const insert = (value) => {
    let currentNode = root;

    while (currentNode) {
      if (value === currentNode.data) {
        return;
      }
      if (value > currentNode.data) {
        if (currentNode.right === null) {
          return (currentNode.right = newNode(value));
        }
        currentNode = currentNode.right;
      }
      if (value < currentNode.data) {
        if (currentNode.left === null) {
          return (currentNode.left = newNode(value));
        }
        currentNode = currentNode.left;
      }
    }
  };

  const remove = (value) => {
    let currentNode = root;
    let previousNode = null;

    while (currentNode) {
      if (value > currentNode.data) {
        if (currentNode.right === null) {
          return;
        }
        previousNode = currentNode;
        currentNode = currentNode.right;
      }
      if (value < currentNode.data) {
        if (currentNode.left === null) {
          return;
        }
        previousNode = currentNode;
        currentNode = currentNode.left;
      }
      if (value === currentNode.data) {
        if (!currentNode.left && !currentNode.right) {
          if (value > previousNode.data) {
            return (previousNode.right = null);
          }
          return (previousNode.left = null);
        }

        if (!currentNode.left) {
          if (value > previousNode.data) {
            return (previousNode.right = currentNode.right);
          }
          return (previousNode.left = currentNode.right);
        }

        if (!currentNode.right) {
          if (value > previousNode.data) {
            return (previousNode.right = currentNode.left);
          }
          return (previousNode.left = currentNode.left);
        }

        if (currentNode.left && currentNode.right) {
          // Child with higher value (right) will replace removed node
          const replacementNode = currentNode.right;
          // Left node will always connected to this node
          let leafNode = replacementNode.left;
          let leftNode = currentNode.left;

          if (!leafNode) {
            replacementNode.left = leftNode;
          }

          while (leafNode) {
            if (leftNode.data > leafNode.data) {
              if (leafNode.right === null) {
                leafNode.right = leftNode;
                break;
              }
              leafNode = leafNode.right;
            }

            if (leftNode.data < leafNode.data) {
              if (leafNode.left === null) {
                leafNode.left = leftNode;
                break;
              }
              leafNode = leafNode.left;
            }
          }

          if (value > previousNode.data) {
            return (previousNode.right = replacementNode);
          }
          return (previousNode.left = replacementNode);
        }
      }
    }
  };

  const find = (value) => {
    let currentNode = root;

    while (currentNode) {
      if (value === currentNode.data) {
        return currentNode;
      }
      if (value > currentNode.data) {
        if (currentNode.right === null) {
          return null;
        }
        currentNode = currentNode.right;
      }
      if (value < currentNode.data) {
        if (currentNode.left === null) {
          return null;
        }
        currentNode = currentNode.left;
      }
    }
  };

  const levelOrder = (callback) => {
    const queue = [];
    queue.push(root);

    while (queue.length > 0) {
      callback(queue[0]);
      if (queue[0].left !== null) queue.push(queue[0].left);
      if (queue[0].right !== null) queue.push(queue[0].right);
      queue.shift();
    }
  };

  const inOrder = (callback) => {
    let currentNode = root;
    if (currentNode.left !== null) {
    }
  };

  const preOrder = (callback) => {};

  const postOrder = (callback) => {};

  const height = (node) => {};

  const depth = (node) => {};

  const isBalanced = () => {};

  const rebalance = () => {};

  const sortedArray = mergeSort(array);

  const root = buildTree(sortedArray);

  return {
    root,
    insert,
    remove,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
};

const mergeSort = (array) => {
  if (array.length === 1) {
    return array;
  } else if (array.length === 0) {
    return;
  }

  const mid = array.length / 2;
  const left = mergeSort(array.slice(0, mid));
  const right = mergeSort(array.slice(mid, array.length));

  let sortedArray = [];

  while (left.length > 0 && right.length > 0) {
    if (left[0] === right[0]) {
      sortedArray.push(left[0]);
      left.shift();
      right.shift();
    } else if (left[0] < right[0]) {
      sortedArray.push(left[0]);
      left.shift();
      if (left.length === 0) {
        for (let i = 0; i < right.length; i += 1) {
          sortedArray.push(right[i]);
        }
      }
    } else {
      sortedArray.push(right[0]);
      right.shift();
      if (right.length === 0) {
        for (let i = 0; i < left.length; i += 1) {
          sortedArray.push(left[i]);
        }
      }
    }
  }

  return sortedArray;
};

//

//

//

const binaryTree = tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

binaryTree.insert(112);

binaryTree.remove(4);

console.log(binaryTree.find(67));

function consoleLog(node) {
  console.log(node.data);
}

binaryTree.levelOrder(consoleLog);

binaryTree.inOrder(consoleLog);

// binaryTree.preOrder()

// binaryTree.postOrder()

// binaryTree.height()

// binaryTree.depth()

// binaryTree.isBalanced()

// binaryTree.rebalance()

// prettyPrint visualizes the binary search tree

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

prettyPrint(binaryTree.root);
