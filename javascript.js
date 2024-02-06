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
      if (value > currentNode.data) {
        currentNode = currentNode.right;
      } else {
        currentNode = currentNode.left;
      }
    }

    currentNode = newNode(value);

    return root;
  };

  const sortedArray = mergeSort(array);

  const root = buildTree(sortedArray);

  return {
    root,
    insert,
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
