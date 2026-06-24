function makeTree(node, graph) {
    const result = {};
  
    const children = graph.get(node) || [];
  
    for (const child of children) {
      Object.assign(result, makeTree(child, graph));
    }
  
    return {
      [node]: result
    };
  }
  
  module.exports = makeTree;