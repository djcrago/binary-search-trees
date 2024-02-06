const newNode = (data, left = null, right = null) => {
  return { data, left, right };
};

const tree = (array) => {
  const buildTree = (array) => {
    if (array.length === 1) {
      return newNode(array[0]);
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
    if (!value) return;

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

  const inOrder = (callback, currentNode = root) => {
    if (callback) {
      if (currentNode === null) return;
      inOrder(callback, currentNode.left);
      callback(currentNode);
      inOrder(callback, currentNode.right);
    } else {
      const arrayInOrder = [];

      if (currentNode === null) return;

      const left = inOrder(null, currentNode.left);
      if (left) arrayInOrder.push(...left);

      arrayInOrder.push(currentNode.data);

      const right = inOrder(null, currentNode.right);
      if (right) arrayInOrder.push(...right);

      return arrayInOrder;
    }
  };

  const preOrder = (callback, currentNode = root) => {
    if (callback) {
      if (currentNode === null) return;
      callback(currentNode);
      preOrder(callback, currentNode.left);
      preOrder(callback, currentNode.right);
    } else {
      const arrayPreOrder = [];

      if (currentNode === null) return;

      arrayPreOrder.push(currentNode.data);

      const left = preOrder(null, currentNode.left);
      if (left) arrayPreOrder.push(...left);

      const right = preOrder(null, currentNode.right);
      if (right) arrayPreOrder.push(...right);

      return arrayPreOrder;
    }
  };

  const postOrder = (callback, currentNode = root) => {
    if (callback) {
      if (currentNode === null) return;

      postOrder(callback, currentNode.left);
      postOrder(callback, currentNode.right);
      callback(currentNode);
    } else {
      const arrayPostOrder = [];

      if (currentNode === null) return;

      const left = postOrder(null, currentNode.left);
      if (left) arrayPostOrder.push(...left);

      const right = postOrder(null, currentNode.right);
      if (right) arrayPostOrder.push(...right);

      arrayPostOrder.push(currentNode.data);

      return arrayPostOrder;
    }
  };

  const height = (node, distance = 0) => {
    if (!node) return;

    if (!node.left && !node.right) return distance;

    distance += 1;

    if (!node.left) return height(node.right, distance);

    if (!node.right) return height(node.left, distance);

    if (node.left && node.right) {
      let leftDistance = height(node.left, distance);
      let rightDistance = height(node.right, distance);

      if (leftDistance === rightDistance) return leftDistance;
      if (leftDistance > rightDistance) return rightDistance;
      if (leftDistance < rightDistance) return leftDistance;
    }

    return distance;
  };

  const depth = (node, distance = 0) => {
    if (!node) return;

    let currentNode = root;

    while (currentNode) {
      if (node === currentNode) return distance;

      distance += 1;
      if (node.data > currentNode.data) {
        currentNode = currentNode.right;
      } else {
        currentNode = currentNode.left;
      }
    }

    return distance;
  };

  const isBalanced = (currentNode = root) => {
    if (!currentNode.left && !currentNode.right) return true;

    if (!currentNode.left) {
      if (height(currentNode.right) > 0) {
        return false;
      }
      return true;
    }

    if (!currentNode.right) {
      if (height(currentNode.left) > 0) {
        return false;
      }
      return true;
    }

    if (currentNode.left && currentNode.right) {
      let leftHeight = height(currentNode.left);
      let rightHeight = height(currentNode.right);

      let difference = leftHeight - rightHeight;
      if (difference > 1 || difference < -1) {
        return false;
      } else {
        let balanced = true;
        balanced = isBalanced(currentNode.left);
        if (balanced) {
          balanced = isBalanced(currentNode.right);
        }
        return balanced;
      }
    }
  };

  const rebalance = () => {
    const array = inOrder();
    return buildTree(array);
  };

  const sortedArray = mergeSort(array);

  let root = buildTree(sortedArray);

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

const testDrive = () => {
  const randomArray = [];

  for (let i = 0; i < 100; i += 1) {
    let number = Math.floor(Math.random() * 100);
    randomArray.push(number);
  }

  const binaryTree = tree(randomArray);

  // // confirm tree is balanced
  // console.log(binaryTree.isBalanced());

  // // print level, pre, post, and in order
  // function consoleLog(data) {
  //   console.log(data);
  // }

  // console.log(binaryTree.levelOrder(consoleLog));
  // console.log(binaryTree.preOrder());
  // console.log(binaryTree.postOrder());
  // console.log(binaryTree.inOrder());

  // // unbalance the tree by adding several numbers > 100;

  // binaryTree.insert(110);
  // binaryTree.insert(120);
  // binaryTree.insert(130);
  // binaryTree.insert(140);
  // binaryTree.insert(150);

  // // confirm tree is unbalanced
  // console.log(binaryTree.isBalanced(binaryTree.root));

  // // balance the tree
  // binaryTree.root = binaryTree.rebalance();

  // // confirm tree is balanced
  // console.log(binaryTree.isBalanced(binaryTree.root));

  // // print level, pre, post, and in order
  // console.log(binaryTree.levelOrder(consoleLog));
  // console.log(binaryTree.preOrder());
  // console.log(binaryTree.postOrder());
  // console.log(binaryTree.inOrder());

  return binaryTree;
};

const binaryTree = testDrive();

//

//

//

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
